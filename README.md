 HEAD
# Adarsh M S - 3D Cosmic Galaxy Portfolio

An interactive 3D WebGL developer portfolio featuring a live particle galaxy, floating wireframe tech polyhedrons, glassmorphic UI, ambient cosmic sound synthesizer, and an easy configuration file.

![Portfolio Preview](./preview.png)

---

## 🚀 Quick Start

### 1. Run Locally
The dev server is already running! If you restart it in the future, simply run:
```bash
npm run dev
```
Then open your browser at:
```
http://localhost:5173/
```

### 2. Build for Production
To generate an optimized production bundle ready to deploy on GitHub Pages, Vercel, or Netlify:
```bash
npm run build
```
The output will be in the `dist/` directory.

---

## ✏️ How to Easily Edit Your Portfolio

All your portfolio data is centralized in a single file:
👉 **[`src/config.js`](./src/config.js)**

Open this file in your editor to change:
1. **Your Name, Greeting & Roles**:
   - `personal.greeting`: Change `"HI, I'M"`
   - `personal.name`: Change `"ADARSH M S"`
   - `personal.roles`: Add or edit the typewriter titles (e.g. `["Full Stack Developer", "Python Engineer", ...]`)
2. **Social Links**:
   - `socials.github`, `socials.linkedin`, `socials.email`
3. **Floating 3D Tech Polyhedrons**:
   - Under `skills`: Add or modify any skill (e.g. `Python`, `Django`, `JavaScript`, `MongoDB`, `Git`, `Flask`, `MySQL`).
   - Each skill automatically renders as a rotating 3D wireframe polyhedron in space!
4. **Projects**:
   - Add your own projects with title, description, tags, GitHub link, and demo URL.
5. **About Me**:
   - Update your bio paragraphs, experience timeline, education, and stats.
6. **Contact**:
   - Update your email, location, and hire status.

---

## 🎨 Interactive Features

- **3D Galaxy & Floating Tech Nodes**: Real-time Three.js particle system with mouse parallax, smooth rotation, and interactive wireframe polyhedrons.
- **Clickable Tech Nodes**: Click any floating polyhedron in space to view its proficiency, experience, and related projects.
- **Glassmorphic Modals**:
  - `View Projects`: Filterable project cards with demo and code links.
  - `About`: Full biography, experience timeline, stats, and tech arsenal.
  - `Contact`: Interactive message form, instant 1-click email copy, and social links.
  - `Resume`: Curriculum vitae preview and download.
- **Live In-Browser Customizer**:
  - Click the **`● Ahz CTRL`** pill in the bottom right corner to open the live editor drawer.
  - Change your name, roles, and contacts directly on screen and copy the updated code with 1 click!
- **Cosmic Audio Synthesizer**:
  - Click the speaker button or `Ahz CTRL` pill to toggle an ambient space drone synthesized natively with the Web Audio API (zero audio files needed).
=======
# ahz-portfolio-
Personal portfolio
 aa4a7215c86def17475f234c0308a95d70712c90
