# PureTool - Technical Architecture

## 1. Technology Stack
- **Frontend Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Shadcn/UI (using Radix Primitives)
- **State Management:** Zustand (lightweight, for global settings if needed)
- **Routing:** React Router DOM
- **Icons:** Lucide React

## 2. Core Libraries (Client-Side Processing)
- **Image Compression:** `browser-image-compression` or HTML5 Canvas API.
- **Zip Generation:** `jszip` (for downloading multiple files).
- **File Handling:** `react-dropzone`.

## 3. Project Structure
```
src/
├── components/
│   ├── common/       # Header, Footer, Button, Card (UI primitives)
│   ├── layout/       # Main layouts
│   └── tools/        # Specific tool components (e.g., ImageUploader)
├── pages/
│   ├── Home.tsx
│   ├── tools/
│   │   └── ImageCompressor.tsx
│   └── NotFound.tsx
├── hooks/            # Custom hooks (useImageWorker, etc.)
├── utils/            # Helper functions (file size formatting, canvas logic)
└── assets/
```

## 4. Key Implementation Details
### 4.1. Privacy & Security
- **No Backend:** The app is a static site.
- **CSP (Content Security Policy):** Strict policy to prevent unauthorized external connections.
- **Analytics:** Privacy-focused (e.g., Plausible) or none for MVP.

### 4.2. Performance
- **Code Splitting:** Each tool is a lazy-loaded route.
- **Web Workers:** Heavy processing (like image compression) should ideally be offloaded to Web Workers to keep the UI responsive.

### 4.3. Deployment
- **Platform:** Vercel / Netlify / GitHub Pages.
- **CI/CD:** Automated build on push.

## 5. Development Workflow
1.  Initialize Vite + React + TS project.
2.  Setup Tailwind CSS.
3.  Implement Layout (Header/Footer).
4.  Develop "Image Compressor" core logic.
5.  Polish UI/UX.
