# Vedunya Presentation Builder - Quick Start

## 🚀 5-Minute Setup

### Prerequisites Check

```bash
# Check Python version (need 3.11+)
python --version

# Check Node version (need 18+)
node --version

# Check uv (fast Python package manager)
uv --version
# If not installed: curl -LsSf https://astral.sh/uv/install.sh | sh
```

If any are missing, install them first.

---

## Step 1: Backend Setup (1 minute with uv)

```bash
# Navigate to backend
cd backend

# Create virtual environment
uv venv

# Install dependencies
uv sync

# Install Playwright browser
uv run playwright install chromium
```

**✅ Backend dependencies installed!**

---

## Step 2: Frontend Setup (1 minute)

Open a **NEW terminal** (keep backend terminal open):

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install
```

**✅ Frontend dependencies installed!**

---

## Step 3: Start Both Servers (1 minute)

### Terminal 1: Backend

```bash
cd backend
uv run python main.py
```

You should see:
```
Starting Vedunya Presentation Builder API...
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**✅ Backend running!**

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.0.8  ready in xxx ms
➜  Local:   http://localhost:5173/
```

**✅ Frontend running!**

---

## Step 4: Open Application (30 seconds)

Open your browser and go to:

**http://localhost:5173**

You should see:
- ✅ 4 presentation cards
- ✅ Welcome presentation
- ✅ Business Strategy
- ✅ Tech Conference
- ✅ Product Launch

**Click any presentation to view it!**

---

## Step 5: Test Export (1 minute)

1. Open a presentation (e.g., "Welcome to Vedunya")
2. Click the **Export** button (download icon)
3. Wait for progress bar to complete
4. PDF will download automatically

**Check**: Open the PDF - should be 1920×1080 with all slides.

**✅ Export working!**

---

## 🎉 You're Done!

Your presentation builder is now running.

## What's Next?

### Create Your First Presentation

```bash
cd frontend/src/presentations
touch my-first-presentation.tsx
```

Copy this template:

```typescript
import { Deck, Slide, Heading, Text, FlexBox } from 'spectacle';

export const metadata = {
  id: 'my-first-presentation',
  title: 'My First Presentation',
  description: 'Created with Vedunya',
  createdAt: '2025-12-10',
  updatedAt: '2025-12-10',
};

const theme = {
  colors: {
    primary: '#6366f1',
    background: '#1e293b',
    text: '#f1f5f9',
  },
};

function MyFirstPresentation() {
  return (
    <Deck theme={theme}>
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading fontSize="72px" color="primary">
            Hello World!
          </Heading>
          <Text fontSize="28px" color="text" margin="40px 0px 0px">
            My first presentation with Vedunya
          </Text>
        </FlexBox>
      </Slide>
    </Deck>
  );
}

export default MyFirstPresentation;
```

**Restart frontend** and see your presentation!

---

## Keyboard Shortcuts

While viewing a presentation:

- **Arrow Keys**: Navigate slides
- **Space**: Next slide
- **F**: Toggle fullscreen
- **Escape**: Exit fullscreen

---

## Troubleshooting

### Backend won't start

**Problem**: `ModuleNotFoundError`

**Solution**:
```bash
cd backend
uv sync
```

### Frontend won't start

**Problem**: `Cannot find module`

**Solution**:
```bash
cd frontend
rm -rf node_modules
npm install
```

### Export fails

**Problem**: Export timeout or error

**Checklist**:
- ✅ Backend running on http://localhost:8000?
- ✅ Frontend running on http://localhost:5173?
- ✅ Playwright installed? Run: `playwright install chromium`

### Presentation not showing

**Problem**: Created new presentation but don't see it

**Solution**: Restart frontend dev server
```bash
# In frontend terminal
Ctrl+C
npm run dev
```

---

## API Documentation

While backend is running, visit:

**http://localhost:8000/api/docs**

Interactive Swagger documentation with:
- All API endpoints
- Request/response schemas
- Try it out feature
- Example responses

---

## File Locations

- **Presentations**: `frontend/src/presentations/*.tsx`
- **Generated PDFs**: `backend/exports/*.pdf`
- **Backend Logs**: Terminal 1 output
- **Frontend Logs**: Terminal 2 output + Browser console

---

## Common Tasks

### View API Health

```bash
curl http://localhost:8000/api/health
```

### List Presentations via API

```bash
curl http://localhost:8000/api/presentations
```

### Run E2E Tests

```bash
cd frontend
npm run test:e2e
```

### Build for Production

```bash
cd frontend
npm run build
```

Output in `frontend/dist/`

---

## Getting Help

1. **Check SETUP.md** - Complete setup guide
2. **Review example presentations** - See how they're built
3. **Check API docs** - http://localhost:8000/api/docs
4. **Read error messages** - Usually tell you what's wrong
5. **Check browser console** - For frontend issues
6. **Check terminal logs** - For backend issues

---

## Quick Reference

| Component | URL | Port |
|-----------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend | http://localhost:8000 | 8000 |
| API Docs | http://localhost:8000/api/docs | 8000 |

| Command | Purpose |
|---------|---------|
| `uv run python main.py` | Start backend |
| `npm run dev` | Start frontend |
| `npm run build` | Build production |
| `npm run test:e2e` | Run E2E tests |

---

**That's it! You're ready to create presentations! 🎉**

For detailed information, see **SETUP.md**.
