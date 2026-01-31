# FIT4FORCE Assets

This folder contains all the assets needed for the FIT4FORCE landing page.

## Folder Structure

```
assets/
├── images/          # All image files
│   ├── screenshots/ # App screenshots for phone mockups
│   ├── testimonials/ # User testimonial photos
│   └── backgrounds/ # Background images (if needed)
├── icons/           # SVG icons and logos
│   ├── logo.svg     # FIT4FORCE shield logo
│   └── agencies/    # Agency-specific icons
└── README.md        # This file
```

## Required Assets Checklist

### Images
- [ ] App screenshots (6-8 key screens)
  - Dashboard screen
  - Quiz/Exam Prep screen
  - Fitness Plans screen
  - AI Coach chat screen
  - Community feed screen
  - Elite Training screen
  - Recruitment Info/News screen

- [ ] User testimonial photos (5-6 photos)
  - Circular avatar format (recommended: 200x200px)
  - Professional/casual photos of successful candidates

- [ ] Google Play Store badge (official badge)
  - Download from: https://play.google.com/intl/en_us/badges/

### Icons
- [ ] FIT4FORCE Shield Logo (SVG format)
- [ ] Agency icons (optional - currently using emojis)
- [ ] Feature icons (optional - using Lucide icons via CDN)

### Recommended Image Specifications

| Asset Type | Dimensions | Format | Notes |
|------------|------------|--------|-------|
| App Screenshots | 750x1334px | PNG/WebP | iPhone 8 size works well |
| Testimonial Avatars | 200x200px | JPG/PNG | Circular crop |
| Play Store Badge | 200x60px | PNG/SVG | Official Google badge |
| Background Images | 1920x1080px | JPG/WebP | Optimized for web |

### Image Optimization Tips
1. Use WebP format for better compression
2. Provide fallback JPG/PNG for older browsers
3. Compress images using tools like TinyPNG or Squoosh
4. Use responsive images with srcset when possible

## CDN Resources Used

The landing page uses the following CDN resources:
- **Google Fonts**: Poppins, Inter
- **Lucide Icons**: https://unpkg.com/lucide@latest
- **Google Play Badge**: Wikipedia Commons (can be replaced with official)

## Notes

- The phone mockups are created with CSS (no images needed)
- App screen content is simulated with HTML/CSS
- Replace placeholder content with real app screenshots when available
