# Suggested Commands for Exam Timekeeper

## Development Server
```bash
pnpm dev          # Start development server (http://localhost:3000)
```

## Building and Deployment
```bash
pnpm build              # Build for production
pnpm build:worker       # Build with Cloudflare Worker support
pnpm start              # Start production server
pnpm preview            # Build and preview production build
pnpm deploy             # Deploy to Cloudflare Pages
pnpm upload             # Build and upload to Cloudflare
```

## Code Quality
```bash
pnpm lint               # Run Biome linter
pnpm format             # Format code with Biome
pnpm cf-typegen         # Generate Cloudflare Types
```

## Package Management
```bash
pnpm install           # Install dependencies
pnpm add <package>     # Add new package
pnpm remove <package>  # Remove package
pnpm update            # Update all dependencies
```

## Project-Specific Commands
```bash
# Start development with Cloudflare support
pnpm dev

# Build and test Cloudflare deployment
pnpm build:worker && pnpm preview

# Full development workflow
pnpm lint && pnpm format && pnpm build
```

## Environment Setup
- Copy `.env.example` to `.env.local` and configure:
  - `NEXT_PUBLIC_DIRECTUS_URL`
  - `DIRECTUS_ACCESS_TOKEN`

## Quick Start
```bash
# 1. Install dependencies
pnpm install

# 2. Start development
pnpm dev

# 3. Open browser
open http://localhost:3000
```

## Important Notes
- Use **pnpm** as the package manager (not npm or yarn)
- The project uses Biome for both linting and formatting
- Cloudflare deployment requires `build:worker` command
- Environment variables are required for blog functionality