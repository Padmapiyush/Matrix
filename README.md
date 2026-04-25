# Data Engineering Analyst CLI Portfolio (React + Vite)

A modern, interactive terminal-style portfolio website tailored to **Padmapiyush Pathak** (Data Engineer / Data Engineering Analyst). The interface behaves like a real command line with typed commands, animated output, command history, auto-completion, and realistic error handling.

## Core Experience

- Full-screen terminal UI with dark hacker-style aesthetics
- Keyboard-first interaction (no traditional page navigation)
- Smooth typing animation for command output
- Blinking cursor and shell-like prompt experience
- Command auto-suggestions + tab auto-complete
- Command history navigation (`↑` / `↓`)
- Invalid command handling (`command not found`)
- Mobile-adaptive responsive layout

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
- `theme`
- `coffee`
- `joke`
- `github [username]`
- `run pipeline demo`

## Featured Portfolio Projects

- `secure_azure_data_platform` (Data Engineering)
- `million_record_etl_fabric` (Data Engineering)
- `operations_kpi_command_center` (Data Analytics)
- `vendor_experiment_analytics` (Data Analytics)

## Project Case Study Coverage

Each project rendered with `open <project_name>` includes:

- Problem statement
- Architecture overview
- Tech stack
- Business impact/results

## UI Structure

```text
src/
├── main.jsx    # React entry point
├── App.jsx     # Terminal UI + command engine + portfolio content
└── styles.css  # Terminal styling, theme variables, responsiveness
```

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
