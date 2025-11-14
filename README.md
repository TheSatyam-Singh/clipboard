# Shared Clipboard

A simple shared pasteboard application. Users type or paste text into a single webpage, and it auto-saves to a server. Anyone opening the same link on any device sees the same text instantly.

## Features

- 🔄 Auto-save: Text automatically saves 500ms after you stop typing
- 🌐 Instant sync: Changes appear for all users viewing the page
- 📱 Cross-device: Access from any device with a web browser
- 🎨 Clean UI: Minimal, distraction-free interface
- 🚀 Fast: Built with Next.js and Vercel KV

## Tech Stack

- **Frontend**: Next.js 14 with React, TypeScript
- **Backend**: Next.js API Routes
- **Storage**: Vercel KV (Redis)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account with KV storage set up

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TheSatyam-Singh/clipboard.git
cd clipboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Vercel KV credentials:
```
KV_URL="your-kv-url"
KV_REST_API_URL="your-kv-rest-api-url"
KV_REST_API_TOKEN="your-kv-rest-api-token"
KV_REST_API_READ_ONLY_TOKEN="your-kv-read-only-token"
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TheSatyam-Singh/clipboard)

Make sure to:
1. Set up a Vercel KV database in your Vercel project
2. The environment variables will be automatically configured

## Usage

Simply open the app and start typing. Your text will:
- Auto-save after 500ms of inactivity
- Be accessible from any device using the same URL
- Persist across browser sessions

## API Routes

- `GET /api/clipboard` - Retrieve the current clipboard content
- `POST /api/clipboard` - Save new clipboard content

## License

MIT