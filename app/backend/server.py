 "from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / \".env\")

import os
import logging
import secrets
from datetime import datetime, timezone, timedelta
from typing import Optional, List, Annotated

import bcrypt
import jwt
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import StreamingResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field

from content import LANGUAGES, list_languages, get_language

# -------- Config --------
JWT_SECRET = os.environ[\"JWT_SECRET\"]
JWT_ALGORITHM = \"HS256\"
ACCESS_TTL_MINUTES = 60 * 24  # 1 day for convenience
FRONTEND_URL = os.environ.get(\"FRONTEND_URL\", \"http://localhost:3000\")

mongo_url = os.environ[\"MONGO_URL\"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ[\"DB_NAME\"]]

app = FastAPI(title=\"Bhashify API\")
api_router = APIRouter(prefix=\"/api\")

logging.basicConfig(level=logging.INFO, format=\"%(asctime)s - %(name)s - %(levelname)s - %(message)s\")
logger = logging.getLogger(__name__)


# -------- Helpers --------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        \"sub\": user_id,
        \"email\": email,
        \"exp\": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TTL_MINUTES),
        \"type\": \"access\",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def sanitize_user(u: dict) -> dict:
    return {
        \"id\": str(u[\"_id\"]),
        \"email\": u[\"email\"],
        \"name\": u.get(\"name\", \"\"),
        \"xp\": u.get(\"xp\", 0),
        \"streak\": u.get(\"streak\", 0),
        \"created_at\": u.get(\"created_at\").isoformat() if isinstance(u.get(\"created_at\"), datetime) else u.get(\"created_at\"),
    }


async def get_current_user(request: Request) -> dict:
    token = None
    auth_header = request.headers.get(\"Authorization\", \"\")
    if auth_header.startswith(\"Bearer \"):
        token = auth_header[7:]
    if not token:
        token = request.cookies.get(\"access_token\")
    if not token:
        raise HTTPException(status_code=401, detail=\"Not authenticated\")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get(\"type\") != \"access\":
            raise HTTPException(status_code=401, detail=\"Invalid token type\")
        user = await db.users.find_one({\"_id\": ObjectId(payload[\"sub\"])})
        if not user:
            raise HTTPException(status_code=401, detail=\"User not found\")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail=\"Token expired\")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail=\"Invalid token\")


# -------- Models --------
class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str = Field(min_length=1, max_length=60)


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class ProgressIn(BaseModel):
    language: str
    lesson_type: str  # alphabets | words | phrases
    xp_gained: int = 10


class QuizSubmitIn(BaseModel):
    language: str
    score: int
    total: int


class ChatIn(BaseModel):
    language: str
    message: str
    session_id: Optional[str] = None


# -------- Auth Routes --------
@api_router.post(\"/auth/register\")
async def register(payload: RegisterIn, response: Response):
    email = payload.email.lower()
    existing = await db.users.find_one({\"email\": email})
    if existing:
        raise HTTPException(status_code=400, detail=\"Email already registered\")
    doc = {
        \"email\": email,
        \"password_hash\": hash_password(payload.password),
        \"name\": payload.name,
        \"xp\": 0,
        \"streak\": 0,
        \"last_active\": datetime.now(timezone.utc),
        \"created_at\": datetime.now(timezone.utc),
    }
    result = await db.users.insert_one(doc)
    doc[\"_id\"] = result.inserted_id
    token = create_access_token(str(result.inserted_id), email)
    response.set_cookie(
        \"access_token\", token, httponly=True, secure=True, samesite=\"none\",
        max_age=60 * 60 * 24, path=\"/\",
    )
    return {\"user\": sanitize_user(doc), \"token\": token}


@api_router.post(\"/auth/login\")
async def login(payload: LoginIn, response: Response):
    email = payload.email.lower()
    user = await db.users.find_one({\"email\": email})
    if not user or not verify_password(payload.password, user[\"password_hash\"]):
        raise HTTPException(status_code=401, detail=\"Invalid email or password\")
    token = create_access_token(str(user[\"_id\"]), email)
    response.set_cookie(
        \"access_token\", token, httponly=True, secure=True, samesite=\"none\",
        max_age=60 * 60 * 24, path=\"/\",
    )
    return {\"user\": sanitize_user(user), \"token\": token}


@api_router.post(\"/auth/logout\")
async def logout(response: Response):
    response.delete_cookie(\"access_token\", path=\"/\")
    return {\"ok\": True}


@api_router.get(\"/auth/me\")
async def me(user: Annotated[dict, Depends(get_current_user)]):
    return sanitize_user(user)


# -------- Content Routes --------
@api_router.get(\"/languages\")
async def get_languages():
    return list_languages()


@api_router.get(\"/languages/{lang_id}\")
async def get_language_detail(lang_id: str):
    lang = get_language(lang_id)
    if not lang:
        raise HTTPException(status_code=404, detail=\"Language not found\")
    return lang


@api_router.get(\"/languages/{lang_id}/quiz\")
async def get_quiz(lang_id: str):
    lang = get_language(lang_id)
    if not lang:
        raise HTTPException(status_code=404, detail=\"Language not found\")
    # Return without answer_index for security-ish (though it's not sensitive here)
    return {\"language\": lang[\"meta\"], \"questions\": lang[\"quiz\"]}


# -------- Progress Routes --------
@api_router.post(\"/progress/complete\")
async def complete_lesson(
    payload: ProgressIn,
    user: Annotated[dict, Depends(get_current_user)],
):
    now = datetime.now(timezone.utc)
    # Insert progress record
    await db.progress.insert_one({
        \"user_id\": user[\"_id\"],
        \"language\": payload.language,
        \"lesson_type\": payload.lesson_type,
        \"xp_gained\": payload.xp_gained,
        \"created_at\": now,
    })
    # Update user XP & streak
    last_active = user.get(\"last_active\")
    streak = user.get(\"streak\", 0)
    if isinstance(last_active, datetime):
        days_diff = (now.date() - last_active.date()).days
        if days_diff == 0:
            pass
        elif days_diff == 1:
            streak += 1
        else:
            streak = 1
    else:
        streak = 1
    new_xp = user.get(\"xp\", 0) + payload.xp_gained
    await db.users.update_one(
        {\"_id\": user[\"_id\"]},
        {\"$set\": {\"xp\": new_xp, \"streak\": streak, \"last_active\": now}},
    )
    return {\"xp\": new_xp, \"streak\": streak}


@api_router.post(\"/progress/quiz\")
async def submit_quiz(
    payload: QuizSubmitIn,
    user: Annotated[dict, Depends(get_current_user)],
):
    xp_gained = payload.score * 5
    now = datetime.now(timezone.utc)
    await db.quiz_results.insert_one({
        \"user_id\": user[\"_id\"],
        \"language\": payload.language,
        \"score\": payload.score,
        \"total\": payload.total,
        \"xp_gained\": xp_gained,
        \"created_at\": now,
    })
    new_xp = user.get(\"xp\", 0) + xp_gained
    await db.users.update_one(
        {\"_id\": user[\"_id\"]},
        {\"$set\": {\"xp\": new_xp, \"last_active\": now}},
    )
    return {\"xp\": new_xp, \"xp_gained\": xp_gained}


@api_router.get(\"/progress/me\")
async def get_my_progress(user: Annotated[dict, Depends(get_current_user)]):
    # Aggregate lesson completions per language
    pipeline = [
        {\"$match\": {\"user_id\": user[\"_id\"]}},
        {\"$group\": {\"_id\": {\"language\": \"$language\", \"lesson_type\": \"$lesson_type\"}, \"count\": {\"$sum\": 1}}},
    ]
    by_lang: dict = {}
    async for row in db.progress.aggregate(pipeline):
        lang = row[\"_id\"][\"language\"]
        by_lang.setdefault(lang, {\"alphabets\": 0, \"words\": 0, \"phrases\": 0})
        by_lang[lang][row[\"_id\"][\"lesson_type\"]] = row[\"count\"]

    # Latest quiz per language
    quiz_by_lang: dict = {}
    async for q in db.quiz_results.find({\"user_id\": user[\"_id\"]}).sort(\"created_at\", -1):
        lang = q[\"language\"]
        if lang not in quiz_by_lang:
            quiz_by_lang[lang] = {\"score\": q[\"score\"], \"total\": q[\"total\"]}

    return {
        \"xp\": user.get(\"xp\", 0),
        \"streak\": user.get(\"streak\", 0),
        \"by_language\": by_lang,
        \"quiz_by_language\": quiz_by_lang,
    }


# -------- Chat Tutor (Gemini 3 Flash streaming) --------
def build_system_prompt(lang_id: str) -> str:
    lang = get_language(lang_id)
    if not lang:
        return \"You are a helpful language tutor.\"
    meta = lang[\"meta\"]
    return (
        f\"You are Guru, a friendly and patient real-time {meta['name']} language tutor. \"
        f\"The learner is a beginner learning {meta['name']} ({meta['native_name']}, {meta['script']} script). \"
        f\"Always respond in a warm, encouraging tone. When teaching, ALWAYS provide: \"
        f\"1) the {meta['name']} phrase in the {meta['script']} script, \"
        f\"2) a romanized transliteration in parentheses, \"
        f\"3) a concise English meaning. \"
        f\"Ask short follow-up questions to keep the conversation going. Keep replies under 120 words. \"
        f\"Correct mistakes gently. Use simple sentences appropriate for A1-A2 learners.\"
    )


@api_router.post(\"/chat/stream\")
async def chat_stream(
    payload: ChatIn,
    user: Annotated[dict, Depends(get_current_user)],
):
    from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

    session_id = payload.session_id or f\"{user['_id']}-{payload.language}\"
    api_key = os.environ[\"EMERGENT_LLM_KEY\"]

    # Save user message
    await db.chat_messages.insert_one({
        \"user_id\": user[\"_id\"],
        \"session_id\": session_id,
        \"language\": payload.language,
        \"role\": \"user\",
        \"content\": payload.message,
        \"created_at\": datetime.now(timezone.utc),
    })

    chat = LlmChat(
        api_key=api_key,
        session_id=session_id,
        system_message=build_system_prompt(payload.language),
    ).with_model(\"gemini\", \"gemini-3-flash-preview\")

    async def event_generator():
        full_response = \"\"
        try:
            async for event in chat.stream_message(UserMessage(text=payload.message)):
                if isinstance(event, TextDelta):
                    full_response += event.content
                    # SSE-formatted chunk
                    yield f\"data: {event.content}\n\n\".replace(\"\n\n\ndata:\", \"\n\ndata:\")
                elif isinstance(event, StreamDone):
                    break
        except Exception as exc:
            logger.exception(\"Chat stream failed: %s\", exc)
            yield f\"data: [error] {str(exc)}\n\n\"
        finally:
            if full_response:
                await db.chat_messages.insert_one({
                    \"user_id\": user[\"_id\"],
                    \"session_id\": session_id,
                    \"language\": payload.language,
                    \"role\": \"assistant\",
                    \"content\": full_response,
                    \"created_at\": datetime.now(timezone.utc),
                })
            yield \"data: [DONE]\n\n\"

    return StreamingResponse(
        event_generator(),
        media_type=\"text/event-stream\",
        headers={\"Cache-Control\": \"no-cache\", \"X-Accel-Buffering\": \"no\", \"Connection\": \"keep-alive\"},
    )


@api_router.get(\"/chat/history\")
async def chat_history(
    user: Annotated[dict, Depends(get_current_user)],
    language: str,
    limit: int = 50,
):
    session_id = f\"{user['_id']}-{language}\"
    msgs = []
    async for m in db.chat_messages.find({\"user_id\": user[\"_id\"], \"session_id\": session_id}).sort(\"created_at\", 1).limit(limit):
        msgs.append({
            \"role\": m[\"role\"],
            \"content\": m[\"content\"],
            \"created_at\": m[\"created_at\"].isoformat() if isinstance(m[\"created_at\"], datetime) else m[\"created_at\"],
        })
    return {\"session_id\": session_id, \"messages\": msgs}


@api_router.get(\"/\")
async def root():
    return {\"message\": \"Bhashify API is running\"}


# -------- Startup --------
@app.on_event(\"startup\")
async def on_startup():
    await db.users.create_index(\"email\", unique=True)
    await db.progress.create_index([(\"user_id\", 1), (\"language\", 1)])
    await db.chat_messages.create_index([(\"user_id\", 1), (\"session_id\", 1)])
    # Seed admin
    admin_email = os.environ.get(\"ADMIN_EMAIL\", \"admin@bhashify.io\").lower()
    admin_password = os.environ.get(\"ADMIN_PASSWORD\", \"Admin@12345\")
    existing = await db.users.find_one({\"email\": admin_email})
    if not existing:
        await db.users.insert_one({
            \"email\": admin_email,
            \"password_hash\": hash_password(admin_password),
            \"name\": \"Admin\",
            \"xp\": 0,
            \"streak\": 0,
            \"last_active\": datetime.now(timezone.utc),
            \"created_at\": datetime.now(timezone.utc),
        })
        logger.info(\"Seeded admin user: %s\", admin_email)
    elif not verify_password(admin_password, existing[\"password_hash\"]):
        await db.users.update_one(
            {\"email\": admin_email},
            {\"$set\": {\"password_hash\": hash_password(admin_password)}},
        )


@app.on_event(\"shutdown\")
async def on_shutdown():
    client.close()


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[FRONTEND_URL, \"http://localhost:3000\"],
    allow_methods=[\"*\"],
    allow_headers=[\"*\"],
)
"
