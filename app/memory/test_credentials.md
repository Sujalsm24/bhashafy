Good, `@` alias to src is configured. Now let me restart backend, create memory files, and run lint:
Action: file_editor create /app/memory/test_credentials.md --file-text "# Test Credentials for Bhashify

## Admin (seeded automatically on backend startup)
- Email: `admin@bhashify.io`
- Password: `Admin@12345`
- Role: admin

## Test User (create via /api/auth/register or use admin)
- Email: `learner@bhashify.io`
- Password: `Test@12345`

## Auth Endpoints
- POST `/api/auth/register` — { email, password, name }
- POST `/api/auth/login` — { email, password }
- POST `/api/auth/logout`
- GET  `/api/auth/me`

Tokens are returned in the JSON body (`token`) and set as an httpOnly `access_token` cookie.
Include `Authorization: Bearer <token>` header OR `credentials: 'include'` for cookies.
"
Observation: Failed to create file: File already exists at: /app/memory/test_credentials.md. Use overwrite=True to replace
