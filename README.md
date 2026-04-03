# Image Slider

A responsive image slider built with **Next.js** and **React**, featuring all the quality-of-life extras you'd expect.

## Features

| Feature | Details |
|---|---|
| 📱 **Desktop & mobile** | Fully responsive via Tailwind CSS |
| 🖼 **Any image size** | `object-fit: contain` keeps every image fully visible |
| ⚡ **Read-ahead / read-behind** | 2 images ahead and behind the current one are preloaded silently |
| ◀▶ **Chevron buttons** | Visible left/right arrow buttons on the sides |
| ⌨️ **Keyboard navigation** | `←` / `→` arrow keys navigate the slider |
| 🖱 **Click-zone navigation** | Click the left half to go back, right half to go forward |
| 🔍 **Full-screen lightbox** | Expand button (⤢) opens the image at full viewport size |
| 🔖 **Bookmark-friendly URLs** | Current image ID is persisted in `?id=<n>` query param |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Navigate directly to a specific image: `http://localhost:3000/?id=5`

## Project Structure

```
src/app/
├── data/images.ts          # Image catalogue (id, src, alt, dimensions)
├── components/
│   ├── ImageSlider.tsx     # Main slider component
│   └── Lightbox.tsx        # Full-screen lightbox modal
├── page.tsx                # Root page
├── layout.tsx              # Root layout
└── globals.css             # Global styles
public/images/              # Local placeholder SVG images
```

## Building

```bash
npm run build   # Production build
npm run lint    # ESLint
```

