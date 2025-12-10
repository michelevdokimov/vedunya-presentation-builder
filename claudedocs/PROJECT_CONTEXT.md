# Vedunya Presentation Builder - Project Context

**Version**: 1.0.0
**Last Updated**: 2025-12-10
**Status**: Initial Setup

---

## Project Overview

**Name**: Vedunya Presentation Builder
**Purpose**: Web interface for viewing and exporting React-based presentations in 16:9 format
**Path**: `/Users/mike/Vedunya Presentation Builder`

### Core Functionality
- View React/Spectacle presentations in browser
- Export presentations to PDF format
- No editing capabilities (view-only interface)
- Presentations stored as JS/JSX files in project

---

## Technical Decisions (Finalized)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Storage | JS files in `presentations/` | No database needed, version control friendly |
| PDF Export | Playwright | High-quality rendering, reliable for React |
| Documentation | Comprehensive | Full component/style/animation docs |
| Aspect Ratio | 16:9 (1920x1080px) | Standard presentation format |
| Backend | Python + FastAPI | Async support, Playwright integration |
| Frontend | React + Spectacle + Vite + TypeScript | Modern stack, Spectacle specializes in presentations |

---

## Architecture

```
vedunya-presentation-builder/
├── backend/                          # Python FastAPI Server
│   ├── main.py                       # API entry point
│   ├── services/
│   │   └── export_service.py         # Playwright PDF export logic
│   ├── routes/
│   │   ├── presentations.py          # Presentation endpoints
│   │   └── exports.py                # Export endpoints
│   └── requirements.txt
│
├── frontend/                         # React + Spectacle Application
│   ├── src/
│   │   ├── presentations/            # User presentations (.jsx/.tsx)
│   │   ├── components/               # Reusable slide components
│   │   ├── viewer/                   # Presentation viewer
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
│
├── docs/                             # User Documentation
│   ├── PRESENTATION_FORMAT.md
│   ├── COMPONENTS.md
│   ├── STYLES.md
│   └── ANIMATIONS.md
│
├── claudedocs/                       # Agent Context
│   ├── PROJECT_CONTEXT.md
│   ├── AGENT_INSTRUCTIONS.md
│   └── TASK_LIST.md
│
└── README.md
```

---

## API Specification

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/presentations` | List all presentations |
| GET | `/api/presentations/{id}` | Get presentation metadata |
| POST | `/api/presentations/{id}/export` | Start PDF export |
| GET | `/api/exports/{job_id}/status` | Check export status |
| GET | `/api/exports/{job_id}/download` | Download PDF file |

### Data Models

```typescript
interface Presentation {
  id: string;
  title: string;
  description?: string;
  slideCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ExportJob {
  jobId: string;
  presentationId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  downloadUrl?: string;
  error?: string;
}
```

---

## Presentation Format (16:9)

### Dimensions
- **Resolution**: 1920 x 1080 pixels
- **Aspect Ratio**: 16:9
- **Safe Area**: 1800 x 960 pixels (60px margins)

### File Structure
```jsx
// frontend/src/presentations/my-presentation.jsx
import { Deck, Slide, Heading, Text } from 'spectacle';

export const metadata = {
  title: 'My Presentation',
  description: 'Optional description',
};

export default function MyPresentation() {
  return (
    <Deck>
      <Slide><Heading>Title</Heading></Slide>
    </Deck>
  );
}
```

---

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Presentation list (gallery) |
| `/view/:id` | Presentation viewer |

---

## PDF Export Flow

1. User clicks "Export PDF" button
2. POST `/api/presentations/{id}/export`
3. Backend launches Playwright headless Chromium
4. Navigates to frontend viewer with `?print=true`
5. Captures each slide at 1920x1080
6. Combines into PDF with 16:9 page size
7. Returns download URL
8. User downloads PDF file

---

## Constraints

**Does**:
- View presentations in browser
- Navigate slides (keyboard, mouse)
- Fullscreen mode
- Export to PDF (16:9)

**Does NOT**:
- Edit presentations in UI
- Cloud storage
- User authentication
- Real-time collaboration
- Import/export other formats (PPTX, etc.)
