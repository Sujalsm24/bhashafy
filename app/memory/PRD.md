
Action: file_editor create /app/memory/PRD.md --file-text "# Bhashify — PRD (MVP)

## Original problem statement
build indian multi language learning website. referance websites such as https://bhashafy.com/ build this type of website which interact real time and able to learn about languages in real time.

## Personas
- Diaspora learners wanting to reconnect with a mother tongue
- Domestic multi-lingual India learners (e.g. Tamil speaker learning Bengali)
- Travellers preparing to visit a new Indian state

## Stack
- Backend: FastAPI + MongoDB (Motor) + JWT auth + emergentintegrations (Gemini 3 Flash)
- Frontend: React 19 + React Router 7 + Tailwind + shadcn/ui + framer-motion + sonner
- Design: \"Modern Heritage\" — Instrument Serif + Manrope, Terracotta #D35400 + Indigo #1A237E on Cotton #FAF9F6

## Implemented (Feb 2026 — v1)
- JWT email/password auth (register, login, logout, me, admin seed)
- 5 languages served from `content.py`: Hindi, Tamil, Telugu, Bengali, Marathi
- Lesson viewer for alphabets, words, phrases with text-to-speech, transliteration toggle, native scripts
- Quiz engine with instant feedback + result screen + XP reward
- Real-time streaming AI chat tutor (Gemini 3 Flash via SSE)
- Progress dashboard: streak, XP, per-language breakdown, best quiz score
- Landing page with hero, features, language preview, CTA
- data-testid attributes throughout

## Prioritized backlog
- P1: Voice input in chat (mic → whisper)
- P1: Per-lesson audio playback with pre-recorded native pronunciations (better than TTS)
- P1: Achievements/badges for streaks & language milestones
- P2: Leaderboard + social sharing
- P2: Expanded content — grammar module, sentence-building game
- P2: Password reset flow (forgot-password / reset-password endpoints)
- P2: Mobile PWA install / offline lessons

## Next tasks
- Voice input in chat via OpenAI Whisper
- Achievements badges
- Expand alphabet/word content per language
"
Observation: Create successful: /app/memory/PRD.md
