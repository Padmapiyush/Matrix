# Eisenhower Matrix Notes (React)

A fully responsive note-taking web app that uses the Eisenhower Matrix for prioritization.

## Features

- 4 quadrants in a 2x2 layout:
  - Urgent & Important
  - Urgent
  - Important
  - Other
- Responsive design:
  - Desktop/tablet: 2x2 grid
  - Mobile: stacked quadrants
- Add notes with a ✏️ pencil action in each quadrant
- Each note includes:
  - Checkbox
  - Task text
  - Card-style UI
- Completion state visuals:
  - Strikethrough text
  - Reduced opacity
- Drag-and-drop with `SortableJS` / `react-sortablejs`:
  - Reorder notes inside a quadrant
  - Move notes across quadrants
- Local storage persistence

## Project Structure

```text
.
├── index.html
├── package.json
├── src
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   └── components
│       ├── NoteCard.jsx
│       └── Quadrant.jsx
└── README.md
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run in development mode:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

## Notes

- Data is persisted in `localStorage` under key: `eisenhower-matrix-notes-v1`.
- The app uses React functional components and hooks.
