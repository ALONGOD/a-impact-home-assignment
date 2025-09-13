# A-Impact Backend

Backend API for restaurant licensing requirements checker in Israel.

## Features

- RESTful API for restaurant licensing requirements
- AI-powered report generation using OpenAI
- Hebrew language support
- CORS enabled for frontend integration

## API Endpoints

- `GET /health` - Health check
- `GET /api/requirements` - Get all licensing requirements
- `POST /api/report` - Generate AI-powered licensing report

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env
# Edit .env and add your OpenAI API key
```

3. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:4000`

## Environment Variables

- `OPENAI_API_KEY` - Required for AI report generation
- `PORT` - Server port (default: 4000)
