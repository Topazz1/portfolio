#  Rhodes OS // Terminal UI Portfolio

> An interactive, mission-driven engineering portfolio built with **React**, **TypeScript**, and **Vite**, featuring a tactical interface design inspired by the *Arknights* PRTS operating system.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](#)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-black?style=flat-square&logo=framer&logoColor=white)](#)

---

## 🧭 Concept & Architecture

This application bridges high-performance software engineering with socio-technical analysis through an immersive tactical HUD interface. Instead of a traditional linear CV, projects and academic dissertations are structured as **operational missions**, **declassified archives**, and an **interactive topological deployment map**.

```text
                               [ PRTS Boot Loader ]
                                        │
                                        ▼
                               [ Dynamic Island HUD ]
                   ┌────────────────────┼────────────────────┐
                   ▼                    ▼                    ▼
          [ SYS.TERM_01 ]      [ SYS.TERM_02 ]      [ SYS.TERM_03 ]
          Technoclinique          Académique           Labo Perso
       (Socio-Technical)     (Engineering Missions)  (Tactical 3D Map)

```

---

## ⚡ Key Engineering Features

### 1. Tactical Topological Operations Map

A massive interactive canvas ($4784 \times 3584\text{ px}$) driven by viewport constraints and trigonometric projections:

* **3D Surface Distortion:** Tilts the topological backdrop along the X-axis (`rotateX(35deg)`) while dynamically recalculating un-skewed 2D screen positions for floating labels:

$$y_{2D} = (y - \frac{H}{2}) \cdot \cos(35^\circ) + \frac{H}{2}$$


* **Automated Laser Grid Propagation:** Directed acyclic graph traversal rendered with SVG vector paths; energizes connections sequentially using Framer Motion `pathLength` callbacks.
* **Cinematic Targeting Protocol:** Multi-stage asynchronous camera sequence:
`IDLE` $\rightarrow$ `TRAVELING` $\rightarrow$ `SEARCHING` (scrambling crosshair) $\rightarrow$ `LOCKED` (target confirmed) $\rightarrow$ `SHIFTING` (viewport refactor) $\rightarrow$ `OPEN` (slide-out archive drawer).

### 2. Declassified Academic & Socio-Technical Archives

* **`SYS.TERM_01` // Technoclinique:** 3-pillar breakdown matrix (*Pourquoi ?*, *Comment ?*, *Résultats & Acquis*) categorizing dissertations on urban planning, sociology of work, and systemic inertia.
* **`SYS.TERM_02` // Académique:** Mission-oriented display of core computer science achievements (OOP game engines, Lisp inference systems, SQL schema normalization).

### 3. Tactical HUD Design System

* **Micro-Interactions:** Custom scanlines, corner reticles, audio-visual feedback cues, monospaced metadata identifiers (`[UTC.CS.06]`, `[SYS.TERM_01]`).
* **Dynamic Island:** Floating glassmorphic navigation bar with blurred backdrop filtering (`backdrop-blur-xl`) and adaptive section transitions.
* **Telemetry Boot Loader:** Procedural boot sequencer with staged progress simulation.

---

## 🛠️ Tech Stack

* **Core Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom CSS Grid background patterns & CSS variables
* **Motion & Physics:** [Framer Motion](https://www.framer.com/motion/) (spring animations, drag physics, layout transitions)
* **Iconography:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
src/
├── assets/                  # Topographic textures, logos, and vector assets
├── components/
│   ├── layout/
│   │   └── BackgroundGrid.tsx  # Dynamic scanline & isometric grid overlay
│   └── ui/
│       ├── ContactWidget.tsx   # Floating tactical communication beacon
│       └── Loader.tsx          # Terminal boot sequence emulator
├── pages/
│   ├── Home.tsx             # Central command hub (3 gateway terminals)
│   ├── TechnoClinique.tsx   # Socio-technical research & papers archive
│   ├── Academique.tsx       # Engineering project logs & course evaluations
│   └── ProjetsPerso.tsx     # 3D interactive deployment topo map
├── App.tsx                  # State machine & Dynamic Island navigation
├── index.css                # Tailwind configuration & global CSS rules
└── main.tsx                 # Root entrypoint

```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** `>= 18.0.0`
* **npm** or **pnpm**

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/Topazz1/portfolio](https://github.com/Topazz1/portfolio)
cd portfolio

```


2. Install dependencies:
```bash
npm install

```


3. Launch the development terminal:
```bash
npm run dev

```


4. Build for production:
```bash
npm run build

```



---

## 🎨 Color Palette Reference

| Token | Hex / Value | Role |
| --- | --- | --- |
| `--arknights-bg` | `#0a0a0c` | Primary deep terminal background |
| `--arknights-surface` | `#111318` | Panel / Container background |
| `--arknights-border` | `rgba(255,255,255,0.1)` | Structural grid lines and dividers |
| `--arknights-accent` | `#a0bf2e` | Tactical lime yellow (Target confirmed, active state) |
| `--arknights-textMuted` | `#8a909a` | Monospaced telemetry labels |

---

## 👤 Author

**Tom Padovani**

Computer Science & Human-Technology (Hutech) Engineering Student — **UTC Compiègne**

* LinkedIn: [@tom-padovani](https://linkedin.com/in/tom-padovani](https://www.linkedin.com/in/tom-padovani-2b0b87382/)
* GitHub: [@tomPadovani](https://github.com/Topazz1)

