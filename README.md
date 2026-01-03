<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SOLID Pups: The Interactive Guide

An interactive web application that teaches SOLID principles through the lens of Paw Patrol characters. Each principle is explained with analogies, interactive games, and code examples.

## 🚀 Features

- **Interactive Learning**: Hands-on games for each SOLID principle
- **Visual Explanations**: Easy-to-understand analogies using Paw Patrol characters
- **Code Examples**: Side-by-side comparisons of good vs. bad code practices
- **Mastery Tracking**: Earn badges as you learn each principle
- **Mobile Responsive**: Works great on all devices

## 📚 SOLID Principles Covered

- **SRP** - Single Responsibility Principle
- **OCP** - Open-Closed Principle
- **LSP** - Liskov Substitution Principle
- **ISP** - Interface Segregation Principle
- **DIP** - Dependency Inversion Principle

## 🏃 Run Locally

**Prerequisites:** Node.js (v18 or higher recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/voku/SOLID_Paw.git
   cd SOLID_Paw
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

This application is configured for GitHub Pages deployment. The site is automatically deployed when changes are pushed to the main branch.

**Live Demo:** https://voku.github.io/SOLID_Paw/

## 🛠️ Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via utility classes)
- **Lucide React** - Icon library

## 📝 Key Files Detector

To help AI assistants understand the codebase structure, here's a guide to the key files:

### Core Application Files
- **`App.tsx`** - Main application component, navigation, and layout
- **`constants.tsx`** - SOLID principles content data and definitions
- **`types.ts`** - TypeScript type definitions
- **`index.tsx`** - Application entry point
- **`index.html`** - HTML template

### Interactive Components
- **`components/interactive/SRPGame.tsx`** - Single Responsibility game
- **`components/interactive/OCPDemo.tsx`** - Open-Closed demo
- **`components/interactive/LSPGame.tsx`** - Liskov Substitution game
- **`components/interactive/ISPGame.tsx`** - Interface Segregation game
- **`components/interactive/DIPGame.tsx`** - Dependency Inversion game

### UI Components
- **`components/ui/CodeBlock.tsx`** - Code example display component

### Configuration
- **`vite.config.ts`** - Vite build configuration
- **`tsconfig.json`** - TypeScript configuration
- **`package.json`** - Dependencies and scripts
- **`.github/workflows/deploy.yml`** - GitHub Actions deployment workflow

### Content Guidelines
- All SOLID principle explanations and examples are in `constants.tsx`
- Interactive game logic is in individual component files under `components/interactive/`
- The app is self-contained and doesn't require external APIs or backend services

## 📖 Credits

Mission inspired by [Lars Moelleken's article](https://dev.to/suckup_de/solid-principles-from-paw-patrol-to-the-neighborhood-1008) on SOLID principles explained through Paw Patrol.

## 📄 License

This project is open source and available for educational purposes.
