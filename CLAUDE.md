# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm dev              # Start development server on port 3000
pnpm build            # Build for production
pnpm build:worker     # Build for Cloudflare Workers
pnpm deploy           # Deploy to Cloudflare
pnpm lint             # Run Biome linter (use --write to auto-fix)
pnpm format           # Format code with Biome
pnpm preview          # Preview Cloudflare Workers build
pnpm cf-typegen       # Generate Cloudflare types
```

**Common workflows:**
```bash
# Quick development
pnpm dev

# Before committing
pnpm lint --write && pnpm format && pnpm build

# Check specific files
npx biome check components/focus-mode.tsx
npx biome check app/posts/page.tsx
```

## Architecture

**Stack**: Next.js 16 (App Router) + React 19 + TypeScript

**Deployment**: Cloudflare Workers via @opennextjs/cloudflare
- R2 bucket for incremental cache
- D1 database for tag cache
- Durable Objects for queue handling

**Styling**: Tailwind CSS v4 + shadcn/ui (New York style)
- Theme uses CSS variables with oklch colors
- Dark mode default via next-themes
- Use `cn()` from `lib/utils.ts` for class merging

**Linting**: Biome (not ESLint) - configured in `biome.json`

## Project Structure

```
exam-timekeeper/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage with exam countdown
│   ├── layout.tsx           # Root layout with SEO
│   ├── globals.css          # Global styles
│   ├── api/                 # API routes
│   │   ├── draft/           # Draft mode API
│   │   └── exams/           # Exam data fetching
│   ├── posts/               # Blog pages (SSG)
│   │   ├── [slug]/          # Dynamic blog post pages
│   │   ├── layout.tsx       # Blog layout
│   │   └── page.tsx         # Blog index page
│   ├── about/page.tsx       # About page
│   ├── contact/page.tsx     # Contact page
│   ├── cookies/page.tsx     # Cookie policy
│   ├── help/                # Help & FAQ
│   │   ├── page.tsx         # Help page (server)
│   │   └── help-client.tsx  # Help page (client)
│   ├── privacy/page.tsx     # Privacy policy
│   ├── terms/page.tsx       # Terms of service
│   └── sitemap.ts           # SEO sitemap
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui primitives
│   │   ├── button.tsx       # Button component
│   │   ├── card.tsx         # Card component
│   │   ├── input.tsx        # Input component
│   │   ├── select.tsx       # NEW: Dropdown selection
│   │   ├── calendar.tsx     # Calendar component
│   │   ├── dialog.tsx       # Dialog component
│   │   ├── label.tsx        # Label component
│   │   └── popover.tsx      # Popover component
│   ├── focus-mode.tsx       # NEW: Pomodoro timer feature
│   ├── breadcrumb.tsx       # Navigation breadcrumbs
│   ├── add-exam-dialog.tsx  # Add exam dialog
│   ├── theme-provider.tsx   # Theme provider
│   └── blog/                # Blog-specific components
│       ├── blog-theme-toggle.tsx
│       ├── markdown-with-ids.tsx
│       ├── post-cta.tsx
│       ├── recent-posts.tsx
│       ├── site-nav.tsx
│       ├── table-of-contents.tsx
│       └── theme-provider.tsx
├── lib/                     # Utilities and clients
│   ├── directus.ts          # Directus CMS client
│   └── utils.ts             # cn() helper and utilities
├── content/                 # Blog content
│   └── posts/               # Markdown blog posts
│       ├── act-complete-guide.md
│       ├── gre-preparation-guide.md
│       └── sat-preparation-guide.md
├── public/                  # Static assets
│   ├── sounds/              # Audio files
│   │   └── bell.mp3         # Focus Mode notification sound
│   ├── favicon.ico
│   ├── robots.txt
│   └── *.jpg                # App icons
├── biome.json               # Biome linting config
├── next.config.ts           # Next.js config
├── open-next.config.ts      # OpenNext Cloudflare config
├── wrangler.jsonc           # Cloudflare Workers config
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

## Data Architecture

**Exam Data**: Static data in `/app/api/exams/fetch-live/route.ts`
- Returns exam dates from College Board, ACT.org, ETS, mba.com
- 30-minute cache interval

**Blog Posts**: Directus CMS
- Client in `/lib/directus.ts`
- Server components fetch via `directus.request(readItems(...))`
- Environment: `NEXT_PUBLIC_DIRECTUS_URL`, `DIRECTUS_ACCESS_TOKEN`

## Component Patterns

**Client Components** (`"use client"`):
- Interactive UI with hooks (useState, useEffect)
- Examples: `app/page.tsx`, `app/help/help-client.tsx`, `components/focus-mode.tsx`

**Server Components**:
- Data fetching from Directus
- Export metadata for SEO
- Examples: `app/posts/page.tsx`, `app/help/page.tsx`

**UI Components**: `/components/ui/` contains shadcn/ui primitives with CVA variants

## Focus Mode Feature (NEW)

**Location**: `components/focus-mode.tsx` - Full-screen Pomodoro timer

**Features**:
- Pomodoro timer (25min focus, 5min short break, 15min long break)
- Manual time selection with presets (15, 25, 45, 50, 90 min) + custom input
- Circular progress visualization with SVG
- Session tracking and statistics dashboard
- Milestone achievement system (4 predefined milestones)
- AI-generated notification sound (`public/sounds/bell.mp3`)
- Sound toggle with localStorage persistence

**Usage**:
- Triggered from homepage via Brain icon button
- Full-screen distraction-free interface
- Stats toggle shows metrics and achievements
- Exit returns to homepage

**State Management**:
- Uses React hooks (no external state management)
- Session data stored in component state (resets on close)
- Sound preference persists via localStorage

**Dependencies**:
- `@radix-ui/react-select` for time preset selection
- `lucide-react` for icons
- Local audio file for notifications

## Key Conventions

- Path alias: `@/*` maps to project root
- File naming: kebab-case for files, PascalCase for components
- Props interfaces defined with TypeScript
- No external state management (React hooks only)
- Use React 19 features (use(), startTransition, etc.)
- Client components must have `"use client"` directive
- Server components export `generateMetadata()` for SEO

## Common Issues & Solutions

**Build Errors**:
- Missing UI components: Check `components/ui/` for available primitives
- Import path errors: Verify `@/*` alias in `tsconfig.json`
- Type errors: Check React 19 types in `@types/react`

**Directus Errors**:
- Permission denied: Token needs read access to posts collection
- Field not found: Database uses `imageurl` (not `image_url`)

**Focus Mode**:
- Audio not playing: Browser requires user interaction before audio playback
- Time not changing: Timer pauses automatically when changing duration

**Biome Linting**:
- Use `npx biome check --write` to auto-fix import sorting and formatting
- `parseInt()` requires radix parameter (e.g., `parseInt(value, 10)`)

## Development Tips

- Development server runs on http://localhost:3000
- Use browser dev tools to test Focus Mode functionality
- Changes to Focus Mode require page refresh (no HMR for client components)
- Test audio on localhost (browser security restrictions on production)
- Hot reload works for server components, full refresh needed for client components

## Recent Additions

- **Focus Mode**: Complete Pomodoro timer with session tracking
- **Select Component**: Radix UI select for time preset selection
- **Audio Notifications**: AI-generated bell sound for session completion
- **Legal Pages**: Privacy, Terms, Cookies, About, Contact, Help
- **Blog Integration**: Directus CMS for dynamic blog content
- **Breadcrumb Navigation**: Consistent navigation across all pages

## Environment Variables

Required for full functionality:
```
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-instance.com
DIRECTUS_ACCESS_TOKEN=your_read_token
```

Optional:
- Caching and queue configurations for production deployment