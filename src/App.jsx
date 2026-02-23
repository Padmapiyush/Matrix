import { useEffect, useState } from 'react';
import Quadrant from './components/Quadrant';

const STORAGE_KEY = 'eisenhower-matrix-notes-v1';

const QUADRANTS = [
  { id: 'urgent-important', title: 'Urgent & Important' },
  { id: 'urgent', title: 'Urgent' },
  { id: 'important', title: 'Important' },
  { id: 'other', title: 'Other' }
];

const defaultNotes = {
  'urgent-important': [],
  urgent: [],
  important: [],
  other: []
};

const buildInitialState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return defaultNotes;
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      ...defaultNotes,
      ...parsed
    };
  } catch {
    return defaultNotes;
  }
};

function App() {
  const [notesByQuadrant, setNotesByQuadrant] = useState(buildInitialState);

  // Persist the matrix state between sessions.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesByQuadrant));
  }, [notesByQuadrant]);

  const addNote = (quadrantId, text) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    const newNote = {
      id: crypto.randomUUID(),
      text: cleanText,
      completed: false
    };

    setNotesByQuadrant((prev) => ({
      ...prev,
      [quadrantId]: [...prev[quadrantId], newNote]
    }));
  };

  const toggleNoteCompletion = (quadrantId, noteId) => {
    setNotesByQuadrant((prev) => ({
      ...prev,
      [quadrantId]: prev[quadrantId].map((note) =>
        note.id === noteId ? { ...note, completed: !note.completed } : note
      )
    }));
  };

  const updateQuadrantNotes = (quadrantId, updatedNotes) => {
    setNotesByQuadrant((prev) => ({
      ...prev,
      [quadrantId]: updatedNotes
    }));
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Eisenhower Matrix Notes</h1>
        <p>Capture, prioritize, and move tasks with drag-and-drop.</p>
      </header>

      <section className="matrix-grid" aria-label="Eisenhower matrix board">
        {QUADRANTS.map((quadrant) => (
          <Quadrant
            key={quadrant.id}
            quadrant={quadrant}
            notes={notesByQuadrant[quadrant.id]}
            onSetNotes={updateQuadrantNotes}
            onAddNote={addNote}
            onToggleComplete={toggleNoteCompletion}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
