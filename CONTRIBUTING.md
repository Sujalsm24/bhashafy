# Contributing to Bhashafy

Thank you for your interest in contributing to Bhashafy! We're excited to have you help improve language learning for everyone.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guide](#style-guide)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/bhashafy.git`
3. Add upstream remote: `git remote add upstream https://github.com/Sujalsm24/bhashafy.git`
4. Create a feature branch: `git checkout -b feat/your-feature`

## 💻 Development Setup

### Backend Setup
```bash
cd app/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
python -m uvicorn server:app --reload
```

### Frontend Setup
```bash
cd app/frontend
npm install
npm run dev
```

## 🔄 Making Changes

1. Keep commits atomic and descriptive
2. Follow the branch naming convention:
   - `feat/feature-name` - New features
   - `fix/bug-name` - Bug fixes
   - `docs/description` - Documentation
   - `refactor/description` - Code refactoring
   - `test/description` - Tests

3. Write clear commit messages:
   ```
   [TYPE] Short description (50 chars max)
   
   More detailed explanation if needed (72 chars max per line).
   Reference issues: Fixes #123
   ```

## 📤 Submitting Changes

1. Push your branch: `git push origin feat/your-feature`
2. Create a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/videos if UI changes
   - Test results
3. Ensure all CI checks pass
4. Request review from maintainers
5. Address review feedback

## 📝 Style Guide

### Python (Backend)
- Follow PEP 8
- Use type hints
- Document functions with docstrings
- Max line length: 100 characters

### JavaScript/React (Frontend)
- Use functional components with hooks
- Use meaningful component names
- Add `data-testid` attributes for testing
- Use Tailwind for styling

## 🧪 Testing

Before submitting a PR:
1. Test your changes locally
2. Run linting
3. Add tests for new features
4. Ensure all CI checks pass

## 📚 Documentation

- Update README.md if adding/removing features
- Add docstrings to new functions
- Update API docs for backend changes
- Add comments for complex logic

---

**Happy contributing! 🌍🗣️**