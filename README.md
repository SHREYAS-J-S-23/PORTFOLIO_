# Shreyas J S — Personal Portfolio

An editorial, modern personal portfolio website built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Three.js (@react-three/fiber).

## ✦ Live Features & Highlights

- **Aesthetics & Typography**: Bold Grotesk display headers (`Space Grotesk`) paired with technical mono micro-labels (`Space Mono`), tight tracking, and alternating high-contrast section backgrounds (`#0A0B0F` near-black, `#EFEFEA` off-white, and `#47F5FA` bright cyan).
- **Interactive 3D Neural Core**: Hero visual powered by Three.js / React Three Fiber with glowing core sphere, tilted orbital rings, orbiting particle stream, cursor tracking tilt physics, and auto-rotation. Fallback to 2D Canvas in non-WebGL environments.
- **Sticky Dynamic Nav**: IntersectionObserver-powered active section tracking with outlined pill indicator, smooth-scroll offsets, and a mobile full-screen animated menu overlay.
- **Interactive Capabilities**: Multi-category skills matrix with animated tag chip transitions and category iconography.
- **Project Showcase**: 2×2 pastel card grid with wireframe perspective floor illustrations, rotating elliptical orbits on hover, and external project links.
- **Single Source of Truth**: All content, project details, skills, timeline events, and achievements are organized in `src/content.ts` for instant updates.
- **Accessible & High-Performance**: Semantic HTML5 tags, full keyboard navigation, WCAG AA color contrast, `prefers-reduced-motion` compliance, and lazy-loaded 3D chunking for optimal Lighthouse score.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS tokens
- **Motion & Transitions**: Framer Motion
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Fonts**: Space Grotesk & Space Mono (Google Fonts)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone <repository-url>
cd Portfolio_
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your contact form submission endpoint:
```env
VITE_FORM_ENDPOINT=https://formspree.io/f/your_form_id
```
*(Supports Formspree, Formkeep, EmailJS, or any custom REST API/serverless function).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized bundle in the `dist/` directory with code-split 3D assets.

---

## 📝 Customizing Content

All site copy, personal bio, skills, projects, and links are centralized in:
`src/content.ts`

- **Personal Info & Links**: Edit `siteConfig` (Name, wordmark, email, github, linkedin).
- **Projects**: Edit `projects` array (Add titles, tags, colors, descriptions, repository/live links).
- **Capabilities**: Edit `skillCategories` (Frontend, Backend, AI, Data/Tools).
- **Experience & Timeline**: Edit `experienceItems` and `journeySteps`.
- **Achievements**: Edit `achievements`.

---

## 🌐 Deployment

### Deploying to Render (Recommended)

This repository includes a `render.yaml` Blueprint file for automatic configuration.

#### Option A: 1-Click Blueprint (Fastest)
1. Push your repository to **GitHub** or **GitLab**.
2. Sign in to your [Render Dashboard](https://dashboard.render.com).
3. Click **"New +"** in the top navigation and select **"Blueprint"**.
4. Connect your repository.
5. Render will automatically detect `render.yaml`, configure the build command (`npm install && npm run build`), publish directory (`./dist`), and SPA rewrites (`/* -> /index.html`).
6. Enter your `VITE_FORM_ENDPOINT` value under Environment Variables and click **"Apply"**.

#### Option B: Manual Static Site Setup
1. On [Render](https://dashboard.render.com), click **"New +"** > **"Static Site"**.
2. Connect your Git repository.
3. Configure the following settings:
   - **Name**: `shreyas-portfolio`
   - **Branch**: `main`
   - **Root Directory**: *(leave blank)*
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Advanced** > **Redirects/Rewrites**, add a rewrite rule:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
5. Under **Environment Variables**, add:
   - `VITE_FORM_ENDPOINT`: `https://formspree.io/f/your_form_id`
6. Click **"Create Static Site"**.

---

### Deploying to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Set Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add `VITE_FORM_ENDPOINT`.
6. Click **Deploy**.

### Deploying to Netlify
1. Sign in to [Netlify](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Select your repository.
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Under **Site configuration > Environment variables**, add `VITE_FORM_ENDPOINT`.
5. Click **Deploy site**.

---

## 📄 License
MIT © 2025 Shreyas J S
