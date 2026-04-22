# System Architecture & Design System

## Presentation Framework
The presentation is a custom-built SPA state machine. 
- **Slide State**: Managed by `currentSlideIndex` in `script.js`.
- **Transitions**: CSS transitions handle the scaling and opacity shifts between `.slide` classes.
- **Micro-Animations**: The `.animate-in` class triggers sub-element animations (entry points, cards) whenever a slide becomes active.

## Design System Tokens
- **Background**: `#0a0a0c` (with custom image overlay).
- **Glassmorphism**: 
  - Background: `rgba(255, 255, 255, 0.05)`
  - Backdrop Blur: `20px`
  - Border: `1px solid rgba(255, 255, 255, 0.1)`
- **Accents**:
  - Blue: `#3b82f6` (System/Architecture)
  - Purple: `#8b5cf6` (Developer/Innovation)
  - Green: `#10b981` (Admin/Approval)

## Responsive Handling
- **Media Queries**: Custom breakpoints at 1024px and 768px.
- **Mosaic Overaly**: Dynamically adjusts grid columns (5 to 3) based on screen width.

## External Dependencies
- `lucide-icons`: For vector-based semantic iconography.
- `google-fonts`: 'Outfit' for premium typography.
