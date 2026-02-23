import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import NoteCard from './NoteCard';

function Quadrant({ quadrant, notes, onSetNotes, onAddNote, onToggleComplete }) {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddNote(quadrant.id, text);
    setText('');
    setIsComposerOpen(false);
  };

  return (
    <article className="quadrant">
      <div className="quadrant-header">
        <h2>{quadrant.title}</h2>
        <button
          type="button"
          className="icon-button"
          onClick={() => setIsComposerOpen((prev) => !prev)}
          aria-label={`Add note to ${quadrant.title}`}
          title="Add note"
        >
          ✏️
        </button>
      </div>

      {isComposerOpen && (
        <form className="composer" onSubmit={handleSubmit}>
          <input
            autoFocus
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write a task..."
            required
          />
          <button type="submit">Add</button>
        </form>
      )}

      <ReactSortable
        list={notes}
        setList={(updatedList) => onSetNotes(quadrant.id, updatedList)}
        group="matrix-notes"
        animation={150}
        className="notes-list"
      >
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            quadrantId={quadrant.id}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ReactSortable>
    </article>
  );
}

export default Quadrant;
