# Agent Guidelines for Exam Timekeeper

This document provides comprehensive guidance for AI agents working in the Exam Timekeeper codebase. It contains essential commands, patterns, conventions, and gotchas that agents need to know to work effectively in this repository.

## Project Overview

Exam Timekeeper is a Next.js application that provides real-time countdown timers for standardized exams (SAT, ACT, GRE, TOEFL, GMAT). It fetches exam dates from official sources and displays them in an organized, user-friendly interface with features like favorites, custom exams, and focus modes.

**Key Technologies**: Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Biome, Cloudflare Pages, Directus CMS

## Essential Commands

### Development
```bash
pnpm dev              # Start development server (http://localhost:3000)
pnpm build            # Build for production
pnpm build:worker     # Build with Cloudflare Worker support
pnpm start            # Start production server
pnpm preview          # Build and preview production build
pnpm deploy           # Deploy to Cloudflare Pages
pnpm upload           # Build and upload to Cloudflare
pnpm cf-typegen       # Generate Cloudflare Types
```

### Code Quality
```bash
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome
```

### Package Management
```bash
pnpm install          # Install dependencies
pnpm add <package>    # Add new package
pnpm remove <package> # Remove package
pnpm update           # Update all dependencies
```

**Important**: Always use `pnpm` as the package manager (not npm or yarn).

## Code Organization and Structure

```
exam-timekeeper/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── exams/
│   │   │   └── fetch-live/route.ts
│   │   ├── actions/
│   │   └── draft/
│   ├── (pages)/           # Static pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── help/
│   │   ├── privacy/
│   │   └── terms/
│   ├── posts/            # Blog functionality
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [slug]/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── blog/            # Blog-specific components
│   ├── add-exam-dialog.tsx
│   ├── focus-mode.tsx
│   ├── breadcrumb.tsx
│   └── theme-provider.tsx
├── lib/                 # Utility libraries
│   ├── directus.ts      # Directus CMS client
│   └── utils.ts         # General utilities
├── public/              # Static assets
│   ├── images/
│   │   ├── illustrations/
│   │   ├── decorative/
│   │   └── exams/
│   └── sounds/
└── biome.json           # Biome configuration
```

## Naming Conventions and Style Patterns

### File and Component Naming
- **Directories**: kebab-case (e.g., `fetch-live/`, `about/`)
- **Components**: PascalCase (e.g., `AddExamDialog`, `FocusMode`)
- **Utilities**: camelCase (e.g., `calculateCountdown`, `fetchLiveExams`)
- **Constants**: UPPER_SNAKE_CASE (environment variables)

### TypeScript Patterns
- **Interfaces**: PascalCase for types and interfaces (e.g., `ExamApiResponse`, `ComponentProps`)
- **Props**: Explicit typing with interfaces
- **State**: Use `useState<T>` for typed state
- **Optional properties**: Mark with `?`
- **Union types**: For finite state values (e.g., `status: "published" | "draft" | "archived"`)

### Component Structure Pattern
```typescript
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ComponentProps {
  // props definition
  required: string;
  optional?: boolean;
}

export default function ComponentName({ required, optional }: ComponentProps) {
  // Hooks first
  const [state, setState] = useState(initialState);
  
  // Effects
  useEffect(() => {
    // effect logic
  }, [dependencies]);
  
  // Helper functions
  const helperFunction = () => {
    return result;
  };
  
  // Event handlers
  const handleClick = () => {
    setState(newState);
  };
  
  // Render
  return (
    <div className="component-styles">
      {/* JSX content */}
    </div>
  );
}
```

## Import Patterns and Path Aliases

### Path Aliases
- Use `@/` for absolute imports from project root
- `@/components` for components directory
- `@/lib` for library utilities
- `@/hooks` for custom hooks (if added)

### Import Organization
```typescript
// 1. React and built-in libraries
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 2. External libraries
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

// 3. Internal modules
import { cn } from "@/lib/utils";
import { directus } from "@/lib/directus";

// 4. Relative imports (rare, use @/ instead)
```

## Styling and UI Patterns

### Tailwind CSS
- Primary styling framework with responsive design
- Use `@apply` in globals.css for shared styles
- Mobile-first approach with responsive prefixes

### shadcn/ui Components
- Built on Radix UI primitives with CVA variants
- Consistent prop patterns across components
- Use `Button`, `Card`, `Dialog`, etc. from `@/components/ui/`

### Theme Support
- `next-themes` for dark/light mode
- CSS custom properties for theme variables
- Test all components in both themes

### Utility Classes Pattern
```typescript
import { cn } from "@/lib/utils";

// Merge classes with conflict resolution
<div className={cn(
  "base-styles",
  "conditional-styles",
  variant === "primary" && "primary-variant",
  className
)} />
```

## Data Management Patterns

### API Integration
- Fetch exam data from `/api/exams/fetch-live`
- Directus CMS for blog content
- Environment variables for API configuration:
  - `NEXT_PUBLIC_DIRECTUS_URL`
  - `DIRECTUS_ACCESS_TOKEN`

### State Management
- Local state with `useState` for component-level data
- `useEffect` for side effects and data fetching
- Controlled components for forms
- Real-time updates with intervals

### Error Handling
```typescript
try {
  const data = await fetch('/api/endpoint');
  const result = await data.json();
  // Handle success
} catch (error) {
  console.error('[component-name] Operation failed:', error);
  // Handle error gracefully
}
```

## Key Features and Interactions

### Exam Management
- **Live Data**: Auto-refresh from `/api/exams/fetch-live` every 30 minutes
- **Custom Exams**: User-added exams with persistence until refresh
- **Favorites**: Star-based favoriting system with filtering
- **Countdown Timer**: Real-time countdown with multiple view modes

### User Interface
- **Responsive Design**: Mobile-first with breakpoints
- **Theme Toggle**: Dark/light mode with `next-themes`
- **Focus Mode**: Distraction-free study interface
- **Clock View**: Minimal countdown display

### API Endpoints
- `GET /api/exams/fetch-live` - Fetch and aggregate exam dates
- Dynamic routes in `app/api/` directory
- Type-safe responses with proper error handling

## Testing Approach and Patterns

### Manual Testing Checklist
- [ ] Test in development: `pnpm dev`
- [ ] Verify TypeScript: `pnpm build`
- [ ] Check linting: `pnpm lint`
- [ ] Format code: `pnpm format`
- [ ] Test both light and dark themes
- [ ] Verify mobile responsiveness
- [ ] Test real-time countdown accuracy
- [ ] Check API endpoint functionality
- [ ] Verify browser console for errors

### Cross-browser Testing
- Chrome, Firefox, Safari compatibility
- Mobile device testing
- Various screen sizes and resolutions

## Important Gotchas and Non-obvious Patterns

### 1. Package Manager
**Always use `pnpm`**, never npm or yarn. This project is configured specifically for pnpm.

### 2. Cloudflare Deployment
- Use `pnpm build:worker` for Cloudflare-compatible builds
- `pnpm preview` to test Cloudflare deployment locally
- Environment variables need Cloudflare-compatible configuration

### 3. Real-time Updates
- Countdown timers update every second with `setInterval`
- Auto-refresh exam data every 30 minutes
- Expired exams automatically filtered out

### 4. Theme System
- Uses CSS custom properties for theming
- All components must support both light and dark modes
- Test theme switching thoroughly

### 5. API Response Structure
```typescript
interface ExamApiResponse {
  exams: Array<{
    name: string;
    date: string;
    source: string;
    category: string;
  }>;
  lastUpdated: string;
  sources: string[];
}
```

### 6. Image Optimization
- Next.js Image component with remote patterns
- Optimized for Cloudflare deployment
- Specific image sizes for different contexts

### 7. Type Safety
- Strict TypeScript configuration
- All props and state properly typed
- API responses have defined interfaces

### 8. Performance Considerations
- Real-time timers can impact performance
- Use `useRef` for timer references
- Proper cleanup of intervals in `useEffect`

## Development Workflow

### Before Making Changes
1. Run `pnpm lint && pnpm format` on existing code
2. Understand component patterns from existing code
3. Check API endpoint requirements
4. Verify environment variable setup

### After Making Changes
1. **Immediate**: Test with `pnpm dev`
2. **Quality**: Run `pnpm lint && pnpm format && pnpm build`
3. **Cross-platform**: Test responsive design and themes
4. **Deployment**: Verify Cloudflare build with `pnpm build:worker`

### Common Issue Resolution
- **Biome Errors**: Follow existing code patterns and conventions
- **TypeScript**: Check import paths and type definitions
- **Build Failures**: Verify all dependencies properly imported
- **Theme Issues**: Check CSS custom properties and variables
- **Performance**: Monitor timer updates and interval cleanup

## Environment and Configuration

### Required Environment Variables
```bash
NEXT_PUBLIC_DIRECTUS_URL=your_directus_url
DIRECTUS_ACCESS_TOKEN=your_access_token
```

### Key Configuration Files
- `biome.json` - Linting and formatting rules
- `next.config.ts` - Next.js configuration with Cloudflare support
- `tailwind.config.js` - Tailwind CSS configuration
- `components.json` - shadcn/ui configuration
- `wrangler.jsonc` - Cloudflare configuration

### Build and Deployment
```bash
# Development
pnpm dev

# Production build
pnpm build

# Cloudflare deployment
pnpm build:worker && pnpm preview && pnpm deploy
```

## Project-Specific Context

### Exam Data Sources
- College Board (SAT): satsuite.collegeboard.org
- ACT: ACT.org
- GRE/TOEFL: ETS.org
- GMAT: mba.com

### Application Purpose
Students tracking standardized exam dates with:
- Real-time countdowns
- Official exam schedules
- Custom date management
- Focus and study tools

### Author Attribution
Built by symphoneiceattack (referenced in footer)

---

## Quick Reference Commands

```bash
# Quick start
pnpm install && pnpm dev

# Quality check
pnpm lint && pnpm format && pnpm build

# Cloudflare deployment
pnpm build:worker && pnpm preview && pnpm deploy

# Help commands
pnpm --help           # pnpm help
pnpm run --help       # List available scripts
```

Remember: Always test changes in both light and dark themes, verify mobile responsiveness, and ensure real-time countdown accuracy before considering work complete.
