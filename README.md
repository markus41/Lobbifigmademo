# The Lobbi - Premium Member Management Platform

The Lobbi is a premium white-label membership management platform designed for luxury clubs, private communities, and exclusive organizations. This demo showcases the beautiful design and powerful functionality of The Lobbi platform.

## Features

- **Admin Dashboard** - Comprehensive management interface with real-time analytics
- **Member Portal** - Mobile-first member experience for on-the-go access
- **Multi-tenant Architecture** - Switch between different organizations seamlessly
- **White-label Branding** - Each organization has its own custom theme and branding
- **Interactive Wizards** - Email templates, event planning, class scheduling, and reports
- **AI Assistant (Bellhop)** - Intelligent help system for members and administrators

## Running the Demo

### Prerequisites
- Node.js 20 or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

The development server will start at `http://localhost:5173/Lobbifigmademo/`

## Project Structure

- `src/app` - Main application components and routing
- `src/components` - Reusable UI components
- `src/theme` - Theme system and customization
- `src/styles` - Global styles and Tailwind configuration

## Demo Organizations

The demo includes several pre-configured organizations showcasing different themes:
- The Hamptons Country Club
- Manhattan Members Club
- Royal Oak Society
- And more...

## Deployment

This project is configured to deploy to GitHub Pages automatically via GitHub Actions when changes are pushed to the main branch.

## Technology Stack

- React 18.3
- TypeScript
- Vite 6.3
- **Chakra UI v3** - Primary UI component library
- Tailwind CSS 4.1 - Layout utilities
- Motion (Framer Motion) - Animations
- GSAP - Complex animations
- Lucide React - Icons
- Recharts - Data visualization
  