# Vedunya Presentation Builder - Setup Guide

## Quick Start

### Prerequisites

- **Python 3.11+** for backend
- **Node.js 18+** for frontend
- **uv** - fast Python package manager ([install](https://docs.astral.sh/uv/getting-started/installation/))
- **Playwright** for PDF export

### Installation

#### 1. Backend Setup (using uv)

```bash
cd backend

# Create virtual environment
uv venv

# Install dependencies
uv sync

# Install Playwright browsers
uv run playwright install chromium
```

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Optional: Install Playwright for E2E tests
npm install -D @playwright/test
npx playwright install
```

## Running the Application

### Development Mode

You need **two terminals** running simultaneously:

#### Terminal 1: Backend Server

```bash
cd backend
uv run python main.py
```

Backend will start on: **http://localhost:8000**

API Documentation: **http://localhost:8000/api/docs**

#### Terminal 2: Frontend Dev Server

```bash
cd frontend
npm run dev
```

Frontend will start on: **http://localhost:5173**

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:8000/api/docs

## Creating Presentations

### 1. Create Presentation File

Create a new `.tsx` file in `frontend/src/presentations/`:

```bash
cd frontend/src/presentations
touch my-presentation.tsx
```

### 2. Presentation Template

```typescript
import { Deck, Slide, Heading, Text, FlexBox } from 'spectacle';

// Presentation metadata
export const metadata = {
  id: 'my-presentation',
  title: 'My Awesome Presentation',
  description: 'A description of my presentation',
  createdAt: '2025-12-10',
  updatedAt: '2025-12-10',
};

// Theme configuration
const theme = {
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    background: '#1e293b',
    text: '#f1f5f9',
  },
};

function MyPresentation() {
  return (
    <Deck theme={theme}>
      <Slide backgroundColor="background">
        <FlexBox height="100%" flexDirection="column" justifyContent="center">
          <Heading fontSize="72px" color="primary">
            My First Slide
          </Heading>
          <Text fontSize="28px" color="text" margin="40px 0px 0px">
            Welcome to my presentation!
          </Text>
        </FlexBox>
      </Slide>

      {/* Add more slides here */}
    </Deck>
  );
}

export default MyPresentation;
```

### 3. View Your Presentation

1. Restart the frontend dev server (if running)
2. Navigate to http://localhost:5173
3. Find your presentation in the list
4. Click to view in 16:9 format

## Features

### Viewing Presentations

- **Keyboard Navigation**:
  - Arrow keys: Previous/Next slide
  - Space: Next slide
  - F: Toggle fullscreen
  - Escape: Exit fullscreen

- **Mouse Controls**:
  - Click fullscreen button
  - Click export button

### Exporting to PDF

1. Open a presentation
2. Click the **Export** button (download icon)
3. Wait for export to complete (progress bar shows status)
4. PDF will automatically download

**PDF Specifications**:
- Resolution: 1920×1080 (16:9)
- High DPI rendering (2x scale factor)
- Includes all slides
- Print-ready format

## Testing

### Run E2E Tests

```bash
cd frontend

# Run all tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed
```

### Run Backend Export Test

```bash
cd backend
uv run python ../tests/test_export.py
```

## Project Structure

```
vedunya-presentation-builder/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── routes/              # API endpoints
│   ├── services/            # Business logic
│   ├── models/              # Pydantic schemas
│   ├── exports/             # Generated PDF files
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── presentations/   # Your presentation files
│   │   ├── viewer/          # Presentation viewer component
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # App pages
│   │   ├── api/             # API client
│   │   └── styles/          # CSS files
│   ├── package.json         # Node dependencies
│   └── vite.config.ts       # Vite configuration
│
└── tests/
    ├── e2e/                 # E2E tests with Playwright
    └── test_export.py       # Backend export tests
```

## Example Presentations

The project includes example presentations:

1. **welcome.tsx** - Introduction with basic components
2. **business-strategy.tsx** - Business presentation with data viz
3. **tech-conference.tsx** - Technical talk with code samples
4. **product-launch.tsx** - Marketing presentation with CTAs

Use these as templates for your own presentations!

## Troubleshooting

### Backend won't start

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**: Install dependencies with uv
```bash
cd backend
uv sync
```

### Frontend won't start

**Error**: `Cannot find module 'vite'`

**Solution**: Install npm dependencies
```bash
cd frontend
npm install
```

### PDF export fails

**Error**: `Export failed` or timeout

**Checklist**:
1. Is backend running on http://localhost:8000?
2. Is frontend running on http://localhost:5173?
3. Is Playwright installed? Run: `playwright install chromium`
4. Check backend logs for detailed error messages

### Presentation not showing up

**Checklist**:
1. File is in `frontend/src/presentations/`
2. File has `.tsx` extension
3. File exports `metadata` object
4. File has default export of component
5. Frontend dev server restarted after adding file

### CORS errors

**Error**: `Access to fetch at ... has been blocked by CORS policy`

**Solution**:
- Ensure backend CORS allows `http://localhost:5173`
- Check `backend/main.py` CORS configuration
- Restart backend server

## Performance Tips

### Build Optimization

For production builds:

```bash
cd frontend
npm run build
```

Optimized build includes:
- Code splitting (React vendor, Spectacle separate chunks)
- Minification with esbuild
- Tree shaking
- Lazy loading of presentations

### Development Performance

- Presentations are lazy-loaded on demand
- Vite HMR provides instant updates
- Backend uses async operations
- Browser instance reused for exports

## API Documentation

Visit **http://localhost:8000/api/docs** (when backend is running) for:
- Interactive API documentation
- Request/response schemas
- Try out API endpoints
- See example responses

## Contributing

To add new features or presentations:

1. Create a feature branch
2. Add your presentation or code
3. Test locally
4. Run E2E tests: `npm run test:e2e`
5. Submit for review

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions:
- Check the troubleshooting section
- Review example presentations for patterns
- Check API docs at /api/docs
- Review backend logs for detailed errors
