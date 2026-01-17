# Kaleb Bishop - Professional Stunt Performer Website

A modern, high-performance single-page and multi-page website for a professional stunt performer built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎬 **Cinematic Design**: Dark-mode first with electric blue/neon red accents
- 📱 **Mobile-First**: Fully responsive and optimized for mobile devices
- ⚡ **Performance**: Optimized images, lazy loading, fast page loads
- 🎨 **Smooth Animations**: Subtle parallax effects, hover animations, and transitions
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and structured data
- ♿ **Accessible**: WCAG compliant with keyboard navigation support

## Pages & Sections

1. **Home / Landing**: Hero section with video background, stats, and CTAs
2. **Stunt Reel**: Embedded video player with featured stunts breakdown
3. **Credits / Filmography**: Filterable table/grid of all credits
4. **Gallery**: Masonry layout photo gallery with lightbox
5. **Skills & Training**: Comprehensive skills showcase and certifications
6. **Contact**: Professional contact form and agent information

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites

**You must have Node.js installed first!** This is a Next.js application, not a static HTML site.

#### Installing Node.js (if not already installed):

1. **Download Node.js**: Visit [https://nodejs.org/](https://nodejs.org/) and download the LTS (Long Term Support) version for macOS
2. **Install**: Run the installer and follow the instructions
3. **Verify installation**: Open Terminal and run:
   ```bash
   node --version
   npm --version
   ```
   Both commands should show version numbers if installed correctly.

### Installation

Once Node.js is installed:

1. **Navigate to the project folder** in Terminal:
   ```bash
   cd "/Users/kalebbishop/Desktop/Stunt Performer Site"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser** and go to: [http://localhost:3000](http://localhost:3000)

   You should see the website running! The dev server will automatically reload when you make changes.

### Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

### Building for Production

```bash
npm run build
npm start
```

## Customization

### Replacing Placeholder Content

All placeholder data is located in the `/data` directory:

- **`data/profile.ts`**: Profile information, stats, contact details, reel URL
- **`data/credits.ts`**: Filmography and credits
- **`data/gallery.ts`**: Gallery images

### Adding Your Reel

1. Upload your stunt reel to Vimeo or YouTube
2. Update the `reel.url` in `data/profile.ts`:
   ```typescript
   reel: {
     url: 'https://vimeo.com/YOUR_VIDEO_ID', // or YouTube URL
     type: 'vimeo', // or 'youtube'
   }
   ```

### Adding Images

1. Place your images in `/public/images/gallery/`
2. Update `data/gallery.ts` with your image paths:
   ```typescript
   src: '/images/gallery/image-name.jpg'
   ```

### Updating Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  accent: {
    blue: '#00f0ff', // Your primary accent color
    red: '#ff1744',  // Your secondary accent color
  },
}
```

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── reel/              # Stunt reel page
│   ├── credits/           # Credits page
│   ├── gallery/           # Gallery page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ReelEmbed.tsx
│   ├── CreditsTable.tsx
│   └── SkillsSection.tsx
├── data/                  # Data files
│   ├── profile.ts
│   ├── credits.ts
│   └── gallery.ts
└── public/                # Static assets
    └── images/           # Place images here
```

## Performance Optimization

- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading for images and components
- ✅ Code splitting with Next.js App Router
- ✅ Optimized fonts (Google Fonts)
- ✅ Minimal JavaScript bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for professional use. Customize as needed for your portfolio.

## Support

For questions or issues, please contact the developer or refer to the [Next.js documentation](https://nextjs.org/docs).

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
npm install -g @sanity/cli
