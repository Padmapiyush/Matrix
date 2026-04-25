# Data Engineer CLI Portfolio (React + Vite)

A modern, interactive terminal-style portfolio website for a Data Engineer. The interface behaves like a real command line with typed commands, animated output, command history, auto-completion, and realistic error handling.

## Core Experience

- Full-screen terminal UI with professional dark hacker-style aesthetic
- Keyboard-first interaction (no traditional navigation)
- Smooth typing animation for command responses
- Blinking cursor and prompt-based command execution
- Command auto-suggestions + tab auto-complete
- Invalid command handling (`command not found` style)
- Arrow key history navigation (`↑` / `↓`)
- Mobile-adaptive layout with desktop-first UX

## Included Commands

- `help`
- `about`
- `skills`
- `projects`
- `open <project_name>`
- `experience`
- `contact`
- `resume`
- `clear`
- `whoami`
- `theme` (dark/light toggle)
- `coffee` (fun)
- `joke` (fun)
- `github [username]` (GitHub API)
- `run pipeline demo`

## Project Case Study Coverage

Each project returned by `open <project_name>` includes:

- Problem statement
- Architecture overview
- Tech stack (Databricks, Airflow, SQL, Python, etc.)
- Business impact/results

## UI Structure & Component Breakdown

```text
src/
├── main.jsx            # React bootstrapping
├── App.jsx             # Terminal UI, command parser, response engine, GitHub integration
└── styles.css          # Terminal theming, animations, responsive behavior
```

### `App.jsx` responsibilities

- Stores portfolio data (profile, skills, projects, experience)
- Renders a full terminal window and prompt input
- Parses and executes commands
- Manages animated response queue
- Supports history navigation and tab auto-completion
- Handles theme toggling and optional demo/fun commands
- Integrates GitHub API lookup for live repositories

### `styles.css` responsibilities

- JetBrains Mono typography
- Dark/light theme variables
- Terminal panel, glow, and accent styling
- Blinking cursor animation
- Readable line states (`system`, `input`, `error`)
- Responsive layout adjustments for smaller screens

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```
