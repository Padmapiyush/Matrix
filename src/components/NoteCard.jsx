function NoteCard({ note, quadrantId, onToggleComplete }) {
  const completedClass = note.completed ? 'note-completed' : '';

  return (
    <label className={`note-card ${completedClass}`}>
      <input
        type="checkbox"
        checked={note.completed}
        onChange={() => onToggleComplete(quadrantId, note.id)}
      />
      <span>{note.text}</span>
    </label>
  );
}

export default NoteCard;
