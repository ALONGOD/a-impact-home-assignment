# A-Impact Frontend

Frontend application for restaurant licensing requirements checker in Israel.

## Features

- Modern React application with Vite
- Hebrew language support with RTL layout
- Interactive form for business details
- AI-powered report generation
- Responsive design
- Real-time validation

## Tech Stack

- React 19
- Vite
- React Markdown
- CSS3 with modern features

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## API Integration

The app connects to the backend API for:
- Requirements data (`/api/requirements`)
- AI report generation (`/api/report`)

### Environment Variables

- `VITE_API_URL`: Backend API URL (default: `https://a-impact-backend.vercel.app`)
  - In development: Uses Vite proxy to `/api`
  - In production: Uses full URL from environment variable

## Hebrew Support

- RTL (Right-to-Left) text direction
- Hebrew fonts and typography
- Cultural-appropriate UI elements