# ERNReal Theme System Documentation

## Overview

ERNReal now features a production-quality Amazon-inspired design system with full light and dark theme support. The theme system is built using Tailwind CSS v4 with CSS variables and `next-themes` for seamless theme switching.

## Color Palette

### Light Theme

- **Background**: `#f5f5f5` (Light gray)
- **Card Background**: `#ffffff` (White)
- **Primary/Header**: `#131921` (Dark navy/blue - Amazon's signature color)
- **Accent/CTA**: `#FF9900` (Amazon orange)
- **Text**: `#1a1f2b` (Dark navy)
- **Muted**: `#f0f0f0` (Very light gray)
- **Border**: `#e0e0e0` (Light gray)

### Dark Theme

- **Background**: `#0f1419` (Very dark blue)
- **Card Background**: `#1a1f2b` (Dark gray-blue)
- **Primary/Header**: `#ededed` (Off-white)
- **Accent/CTA**: `#FFb347` (Slightly lighter orange for dark mode)
- **Text**: `#ededed` (Off-white)
- **Muted**: `#404854` (Dark gray)
- **Border**: `#2a3038` (Dark gray)

## Architecture

### CSS Variables System

All color tokens are defined using CSS custom properties in `app/globals.css`:

```css
:root {
  /* Light theme variables */
  --background: hsl(0 0% 98%);
  --accent: hsl(35 100% 50%); /* Amazon Orange */
  /* ... */
}

.dark {
  /* Dark theme variables */
  --background: hsl(220 13% 8%);
  --accent: hsl(35 100% 55%); /* Slightly lighter in dark mode */
  /* ... */
}
```

### Tailwind Integration

The variables are integrated into Tailwind's `@theme` configuration:

```css
@theme inline {
  --color-background: var(--background);
  --color-accent: var(--accent);
  /* ... */
}
```

This allows using Tailwind utilities like `bg-background`, `text-accent`, etc.

## Theme Provider Setup

The theme provider is already configured in `app/StoreProvider.tsx`:

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

### Theme Toggle

Users can toggle the theme using the button in the Navbar (`components/layout/Navbar.tsx`):

- Light mode: Moon icon
- Dark mode: Sun icon
- The theme preference is persisted in localStorage automatically

## Component Updates

### Updated Components

1. **Button** (`components/ui/button.tsx`)
   - New default variant: Amazon-style orange CTA
   - Enhanced hover effects with shadows
   - Active state with scale animation

2. **Card** (`components/ui/card.tsx`)
   - Subtle shadow that increases on hover
   - Smooth transitions between themes
   - Better rounded corners

3. **Badge** (`components/ui/badge.tsx`)
   - Enhanced default variant (orange)
   - New muted variant
   - Better contrast in dark mode

4. **Navbar** (`components/layout/Navbar.tsx`)
   - Dark header background (Amazon-style)
   - Prominent search bar
   - Theme toggle button with smooth transitions
   - Mobile-responsive design

5. **PropertyCard** (`components/property/PropertyCard.tsx`)
   - Accent color for featured badges
   - Improved hover effects
   - Better visual hierarchy
   - Dark theme contrast improvements

6. **FilterSidebar** (`components/property/FilterSidebar.tsx`)
   - Active filter count badge
   - Accent-colored selected amenities
   - Improved visual feedback

7. **PropertyDetailsPage** (`app/properties/[id]/page.tsx`)
   - Enhanced price display with accent color
   - Better amenity showcase
   - Improved CTA buttons

### Pages Updated

- **Home** (`app/page.tsx`): Enhanced hero, CTA sections, value proposition
- **Properties** (`app/properties/page.tsx`): Better layout and information hierarchy

## Usage Guidelines

### Using Theme Colors

#### In Components

```tsx
// Using Tailwind classes
<div className="bg-background text-foreground">
  <button className="bg-accent text-accent-foreground hover:bg-accent/90">
    Call to Action
  </button>
</div>

// With variants
<Button variant="default">Primary CTA (Orange)</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Tertiary Action</Button>
<Button variant="ghost">Minimal Action</Button>
```

#### In CSS

```css
.custom-element {
  background-color: var(--background);
  color: var(--foreground);
  border-color: var(--border);
}
```

### Semantic Token Names

- `bg-background` / `text-background`: Page backgrounds
- `bg-card` / `text-card-foreground`: Card containers
- `bg-accent` / `text-accent-foreground`: Call-to-action elements
- `bg-muted` / `text-muted-foreground`: Muted or disabled elements
- `text-destructive`: Error or dangerous actions

## Accessibility

### WCAG Compliance

- Color contrast ratios meet WCAG AA standards in both themes
- Focus states are clearly visible with accent color rings
- Smooth transitions don't cause motion sickness
- All interactive elements have proper focus indicators

### Focus Management

```css
button:focus-visible,
a:focus-visible,
input:focus-visible {
  @apply outline-2 outline-offset-2 outline-accent;
}
```

## Responsive Design

All components are fully responsive:

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly button sizes
- Adaptive typography

## Performance

### Optimizations

1. **CSS Variables**: Minimal reflows on theme change
2. **No Flash**: `suppressHydrationWarning` prevents hydration mismatch
3. **System Preference Detection**: Respects OS dark mode preference
4. **LocalStorage Caching**: Theme preference persists across sessions

## Browser Support

- Modern browsers with CSS Variables support
- Chrome/Edge 49+
- Firefox 31+
- Safari 9.1+
- Chrome for Android

## Future Enhancements

Potential additions to the theme system:

1. Additional theme variants (e.g., high contrast mode)
2. Customizable accent color
3. Font size scaling options
4. Reduced motion preferences
5. Custom theme builder UI

## Customization

To modify the theme colors, edit the CSS variables in `app/globals.css`:

```css
:root {
  --accent: hsl(35 100% 50%); /* Change accent color */
  --primary: hsl(220 13% 12%); /* Change primary color */
  /* ... */
}

.dark {
  /* Dark theme customizations */
}
```

Then rebuild with:

```bash
npm run build
```

## Testing the Theme

1. **Manual Testing**:
   - Click the theme toggle button in the navbar
   - Refresh the page - theme preference should persist
   - Test on mobile devices
   - Test on different browsers

2. **Visual Regression Testing**:
   ```bash
   npm run dev
   # Open http://localhost:3000 and test both themes
   ```

## Troubleshooting

### Theme Not Persisting

- Ensure localStorage is enabled in browser
- Check `StoreProvider.tsx` has `<ThemeProvider>` wrapping children

### Flash on Page Load

- Add `suppressHydrationWarning` to `<html>` tag (already done)
- Clear browser cache

### Color Mismatch

- Ensure CSS variables are properly defined in `app/globals.css`
- Check Tailwind config includes theme colors
- Rebuild the project: `npm run build`

## Related Files

- `app/globals.css` - Theme variables and global styles
- `app/StoreProvider.tsx` - Theme provider configuration
- `components/layout/Navbar.tsx` - Theme toggle button
- `components/ui/*` - Updated component styles
- `tailwindcss` - Tailwind CSS configuration (uses inline theme)

---

**Version**: 1.0  
**Last Updated**: 2026-04-16  
**Maintained by**: Frontend Team
