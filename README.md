# Vedunya Presentation Builder

Web interface for viewing and exporting React-based presentations in 16:9 format.

## Features

- View React/Spectacle presentations in browser
- Export presentations to PDF format (1920×1080)
- Keyboard navigation and fullscreen mode
- No editing capabilities (view-only)

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Spectacle (presentation library)
- Vite (build tool)
- React Router

**Backend:**
- Python 3.11+
- FastAPI
- Playwright (PDF export)

## Project Structure

```
vedunya-presentation-builder/
├── backend/              # Python FastAPI server
│   ├── main.py          # API entry point
│   ├── services/        # Business logic
│   ├── routes/          # API endpoints
│   └── requirements.txt
├── frontend/            # React application
│   ├── src/
│   │   ├── presentations/  # User presentations (.tsx)
│   │   ├── components/     # Reusable components
│   │   ├── viewer/         # Presentation viewer
│   │   ├── pages/          # Route pages
│   │   └── App.tsx
│   └── package.json
├── docs/                # User documentation
└── claudedocs/          # Agent context
```

## Setup (Development)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium
python main.py
```

Backend runs on: http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/presentations` | List all presentations |
| GET | `/api/presentations/{id}` | Get presentation metadata |
| POST | `/api/presentations/{id}/export` | Start PDF export |
| GET | `/api/exports/{job_id}/status` | Check export status |
| GET | `/api/exports/{job_id}/download` | Download PDF |

## Creating Presentations

Presentations are stored as `.tsx` files in `frontend/src/presentations/`.

Example:

```tsx
import { Deck, Slide, Heading, Text } from 'spectacle';

export const metadata = {
  id: 'my-presentation',
  title: 'My Presentation',
  description: 'Optional description',
};

export default function MyPresentation() {
  return (
    <Deck>
      <Slide>
        <Heading>Hello World</Heading>
        <Text>This is my first slide</Text>
      </Slide>
    </Deck>
  );
}
```

## 16:9 Format

- **Resolution:** 1920 × 1080 pixels
- **Aspect Ratio:** 16:9
- **Safe Area:** 1800 × 960 pixels (60px margins)

## Documentation

See `docs/` directory for detailed documentation:
- `PRESENTATION_FORMAT.md` - Format specification
- `COMPONENTS.md` - Available components
- `STYLES.md` - Theming and styling
- `ANIMATIONS.md` - Transitions and effects

## Example Presentations

The project includes 4 example presentations showcasing different styles:

1. **welcome.tsx** - Simple introduction with basic components
2. **business-strategy.tsx** - Professional business presentation with data visualization
3. **tech-conference.tsx** - Technical presentation with code samples
4. **product-launch.tsx** - Marketing presentation with vibrant design

## Testing

### E2E Tests

```bash
cd frontend

# Run all tests
npm run test:e2e

# Interactive UI
npm run test:e2e:ui

# Headed mode (see browser)
npm run test:e2e:headed
```

### Backend Export Test

```bash
cd backend
source venv/bin/activate
python ../tests/test_export.py
```

## Performance

- **Lazy Loading**: Presentations loaded on-demand
- **Code Splitting**: Vendor libraries cached separately
- **Build Optimization**: Minified with esbuild
- **Fast HMR**: Vite hot module replacement

## Documentation

- **SETUP.md** - Complete setup and usage guide
- **docs/** - Detailed technical documentation
- **claudedocs/** - Development context and reports
- **tests/e2e/setup.md** - E2E testing guide

## Status

**Version:** 1.0.0

**Development Status:** ✅ **COMPLETE**

**Phases:**
- ✅ Phase 1: Project Structure (Complete)
- ✅ Phase 2: Backend API (Complete)
- ✅ Phase 3: Frontend React App (Complete)
- ✅ Phase 4: Integration & Testing (Complete)

**Production Ready:** Yes (with optional enhancements recommended)

See `claudedocs/phase4-completion-report.md` for detailed completion report.

## License

MIT
