# Task Completion Guidelines

## Before Submitting/Completing Work

### Code Quality Checks
```bash
# Run Biome linter to check for issues
pnpm lint

# Format code according to project standards
pnpm format

# Verify TypeScript compilation
pnpm build
```

### Testing Requirements
- Test functionality in both light and dark themes
- Verify responsive design on mobile devices
- Check browser console for any errors or warnings
- Test API endpoints if modified
- Ensure no TypeScript errors in build process

### Environment Verification
- Test in development mode (`pnpm dev`)
- Verify build process works (`pnpm build`)
- Check Cloudflare deployment compatibility (`pnpm build:worker`)

## Development Best Practices

### Before Making Changes
1. Run `pnpm lint` and `pnpm format` on existing code
2. Understand the current component structure and patterns
3. Check existing similar components for reference
4. Verify environment variable requirements

### After Making Changes
1. **Immediate Testing**:
   ```bash
   pnpm dev  # Test in development
   ```
   
2. **Quality Assurance**:
   ```bash
   pnpm lint && pnpm format && pnpm build
   ```

3. **Cross-browser Testing**:
   - Test in Chrome, Firefox, Safari
   - Verify mobile responsiveness
   - Check dark/light theme switching

### Common Issue Resolution
- **TypeScript Errors**: Check import paths and type definitions
- **Biome Linting**: Follow existing code patterns and conventions
- **Build Failures**: Verify all dependencies are properly imported
- **UI Issues**: Check Tailwind classes and responsive breakpoints

### Project-Specific Checks
- **Exam Countdown**: Verify timer accuracy and real-time updates
- **Theme Switching**: Ensure all components support both themes
- **API Endpoints**: Test `/api/exams/fetch-live` functionality
- **Responsive Design**: Test breakpoints at mobile, tablet, desktop
- **Accessibility**: Verify keyboard navigation and screen reader compatibility

## Deployment Readiness

### Pre-deployment Checklist
- [ ] All tests pass (`pnpm lint && pnpm format && pnpm build`)
- [ ] Environment variables are documented
- [ ] Build process completes successfully
- [ ] Cloudflare deployment tested (`pnpm build:worker`)
- [ ] No console errors in production build
- [ ] Images optimized and properly sized
- [ ] SEO meta tags updated if needed

### Cloudflare Deployment
```bash
# Test Cloudflare build locally
pnpm build:worker

# Preview Cloudflare deployment
pnpm preview

# Deploy to production
pnpm deploy
```

## Documentation Updates
- Update component PropTypes/interfaces if changed
- Update API documentation if endpoints modified
- Add JSDoc comments for complex functions
- Update README.md if commands or setup changed

## Performance Considerations
- Check bundle size after adding dependencies
- Optimize images before adding new ones
- Verify lazy loading for non-critical components
- Monitor real-time timer performance

## Security Notes
- Environment variables never exposed to client
- API routes properly validate inputs
- No sensitive data in console logs
- HTTPS only for external API calls

## Final Verification
Before considering work complete:
1. Code passes all linting and formatting
2. TypeScript compilation successful
3. Development server runs without errors
4. All features work as expected
5. Responsive design verified
6. Both light and dark themes tested
7. Build and deployment tested
8. No console errors or warnings