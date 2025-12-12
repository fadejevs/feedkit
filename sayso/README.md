# Sayso

> Turn audio into actionable text — transcripts, highlights, captions, and exports.

A modern SaaS platform for transcribing audio and video content with AI-powered highlights, speaker diarization, and multiple export formats.

## Features

- 🎤 **Instant Upload** — Drag & drop videos, audio files, or paste social links
- 🗣️ **Speaker Diarization** — Automatically detect and label different speakers
- ⚡ **Smart Highlights** — AI-generated chapters, quotable moments, and action items
- 📤 **Export Anywhere** — Download as SRT, VTT, Markdown, JSON
- 🛡️ **Brand Safety** — Flag risky claims, profanity, and music copyright hints
- 🔒 **EU-First Privacy** — GDPR-ready data residency and retention controls

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Transcription:** OpenAI Whisper API (pluggable provider)
- **Deployment:** Vercel / AWS / Self-hosted
- **Payments:** Stripe (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for transcription)

### Installation

```bash
cd sayso
npm install
```

### Environment Variables

Create a `.env.local` file:

```bash
# Required for real transcription (otherwise mock data is used)
OPENAI_API_KEY=sk-...

# Optional: Stripe (coming soon)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
sayso/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Dashboard
│   │   │   └── transcribe/
│   │   │       └── page.tsx      # Transcription UI
│   │   ├── pricing/
│   │   │   └── page.tsx          # Pricing page
│   │   ├── api/
│   │   │   └── transcribe/
│   │   │       └── route.ts      # Transcription API endpoint
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── components/               # Shared components (coming soon)
├── public/
├── package.json
└── README.md
```

## Usage

### 1. Upload a file

- Go to `/dashboard/transcribe`
- Drag & drop an audio or video file (MP3, MP4, WAV, M4A)
- Or click to browse

### 2. Transcribe

- Click "Start Transcription"
- Wait for processing (uses OpenAI Whisper API)

### 3. View & Export

- View transcript with timestamps
- Read AI-generated summary
- Download SRT for captions
- Copy Markdown to clipboard

## Roadmap

- [x] Landing page with hero, features, pricing
- [x] Dashboard with projects overview
- [x] Transcription upload & processing
- [x] SRT & Markdown exports
- [ ] Speaker diarization
- [ ] Advanced highlights (chapters, quotes, action items)
- [ ] URL ingestion (YouTube, TikTok, Instagram)
- [ ] Stripe integration & usage tracking
- [ ] User authentication (NextAuth.js)
- [ ] Database (Postgres via Supabase/Neon)
- [ ] API access for developers

## Contributing

This is a private project. Contributions are currently not accepted.

## License

Proprietary. All rights reserved.

## Support

For questions or support, contact: [support@sayso.ai](mailto:support@sayso.ai)

---

Built with ❤️ by the Sayso team


