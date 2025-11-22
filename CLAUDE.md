# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm build:worker     # Build for Cloudflare Workers
pnpm deploy           # Deploy to Cloudflare
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome
pnpm cf-typegen       # Generate Cloudflare types
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

**Linting**: Biome (not ESLint)

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
- Examples: `app/page.tsx`, `app/help/help-client.tsx`

**Server Components**:
- Data fetching from Directus
- Export metadata for SEO
- Examples: `app/posts/page.tsx`, `app/help/page.tsx`

**UI Components**: `/components/ui/` contains shadcn/ui primitives with CVA variants

## Key Conventions

- Path alias: `@/*` maps to project root
- File naming: kebab-case for files, PascalCase for components
- Props interfaces defined with TypeScript
- No external state management (React hooks only)
