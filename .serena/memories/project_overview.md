# Exam Timekeeper Project Overview

## Project Purpose
Exam Timekeeper is a Next.js application that provides real-time countdown timers for standardized exams (SAT, ACT, GRE, TOEFL, GMAT). It fetches exam dates from official sources and displays them in an organized, user-friendly interface with features like favorites, custom exams, and focus modes.

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **CMS**: Directus (for blog content)
- **Deployment**: Cloudflare Pages with OpenNext
- **Linting/Formatting**: Biome
- **Theme**: next-themes for dark/light mode

## Key Features
- Real-time countdown timers for exam dates
- Auto-refresh from official sources every 30 minutes
- Custom exam creation and management
- Favorites system with filtering
- Clock-only view for distraction-free display
- Focus mode for studying
- Responsive design with mobile support
- Blog integration with Directus CMS
- Theme switching (dark/light mode)

## Code Structure
```
app/                 # Next.js App Router
├── api/            # API routes
├── (pages)/        # Static pages (about, contact, help, etc.)
├── posts/          # Blog functionality
├── layout.tsx      # Root layout
├── page.tsx        # Homepage
└── globals.css     # Global styles

components/         # React components
├── ui/            # shadcn/ui components
├── blog/          # Blog-specific components
└── *.tsx          # Feature components

lib/               # Utility libraries
├── directus.ts    # Directus CMS client
└── utils.ts       # General utilities

public/            # Static assets
├── images/        # Images and logos
└── sounds/        # Audio files
```

## Data Sources
- College Board (satsuite.collegeboard.org) for SAT
- ACT.org for ACT
- ETS.org for GRE and TOEFL
- mba.com for GMAT

The application automatically fetches and filters upcoming exam dates, removing expired ones to keep the display current.