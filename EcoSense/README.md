# 🌱 EcoSense 

Calculate. Learn. Act. — Your personal carbon coach and climate tutor, anytime, anywhere.

## Overview

EcoSense is a Progressive Web App (PWA) that combines a household carbon footprint calculator with an AI-powered climate educator. It helps users understand, track, and reduce their carbon footprint while learning about climate change through an interactive AI tutor.

## Features

### Carbon Calculator
- Input household data (energy, transport, diet, waste)
- Real-time CO₂ footprint calculation
- Interactive charts and breakdowns
- "What-if" scenario simulation
- Historical tracking

### AI Climate Mentor
- Interactive chat interface
- Personalized climate education
- Adaptive quizzes
- Voice input/output support
- Offline lesson access

### User Progress
- Profile management
- Progress tracking
- Achievement badges
- Social sharing

### PWA Capabilities
- Installable on home screen
- Offline functionality
- Push notifications
- Background sync

## Tech Stack

- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Charts:** Chart.js
- **AI:** Mistral AI API
- **Database:** Supabase
- **Authentication:** Firebase Auth
- **Storage:** IndexedDB (offline) + Supabase (online)
- **Hosting:** Vercel

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecosense.git
cd ecosense
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your API keys and configuration.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure
```
ecosense/
├── app/                 # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions
├── public/            # Static assets
├── styles/            # Global styles
└── types/             # TypeScript definitions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Climate data sources
- Open source community
- Contributors and maintainers 
