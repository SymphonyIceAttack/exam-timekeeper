# Code Style and Conventions

## Language and Framework
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **Next.js**: App Router with TypeScript
- **React**: Functional components with hooks
- **Target**: ES2017

## Naming Conventions
- **Files**: kebab-case for directories, PascalCase for components, camelCase for utilities
- **Components**: PascalCase (e.g., `AddExamDialog`, `FocusMode`)
- **Variables/Functions**: camelCase (e.g., `fetchLiveExams`, `calculateCountdown`)
- **Constants**: UPPER_SNAKE_CASE for environment variables
- **Interfaces/Types**: PascalCase with descriptive names (e.g., `ExamApiResponse`)

## TypeScript Patterns
- Explicit typing for props, state, and function parameters
- Interface definitions for API responses and data structures
- Union types for states (e.g., `status: "published" | "draft" | "archived"`)
- Optional properties marked with `?`
- Use `type` for object shapes, `interface` for component props

## Component Structure
```typescript
// 1. "use client" directive for client components
"use client";

// 2. Imports (grouped by: external, internal, relative)
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// 3. Types/Interfaces
interface ComponentProps {
  // props definition
}

// 4. Main component function
export default function ComponentName() {
  // Hooks first
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {}, []);
  
  // Helper functions
  const helperFunction = () => {};
  
  // Render
  return (
    // JSX
  );
}
```

## Styling Approach
- **Tailwind CSS**: Primary styling framework
- **shadcn/ui**: Component library with CVA (class-variance-authority)
- **CSS Variables**: For theming and dark mode support
- **cn() utility**: Combine classes with conflict resolution
```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-styles",
  condition && "conditional-styles",
  variant === "default" && "default-variant"
)} />
```

## Code Organization
- **Components**: Separate UI components from feature components
- **Utilities**: Pure functions in `lib/` directory
- **API Routes**: Grouped in `app/api/` with descriptive names
- **Assets**: Organized in `public/images/` with subdirectories

## Import Patterns
- Use `@/` alias for absolute imports from project root
- Group imports: external libraries → internal modules → relative imports
- Sort imports alphabetically within groups
- Use named imports where possible

## Error Handling
- Try-catch blocks for async operations
- Console error logging with context
- Graceful degradation for failed API calls
- Type-safe error responses

## State Management
- Local state with `useState` for component-level data
- `useEffect` for side effects and data fetching
- Controlled components for forms
- State objects for complex data structures

## Performance Considerations
- Lazy loading for non-critical components
- Memoization for expensive calculations
- Proper dependency arrays in `useEffect`
- Image optimization with Next.js Image component

## Accessibility
- Semantic HTML elements
- ARIA labels and roles where needed
- Keyboard navigation support
- Focus management for dialogs and modals
- Color contrast for dark/light themes

## API Design
- RESTful endpoint structure (`/api/exams/fetch-live`)
- Consistent response formats
- Error responses with appropriate status codes
- Type definitions for API contracts

## Development Workflow
1. Use Biome for formatting and linting
2. TypeScript strict mode catches type errors
3. Follow established patterns from existing code
4. Test in both light and dark themes
5. Ensure responsive design works on mobile