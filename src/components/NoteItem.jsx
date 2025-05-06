import React from 'react';

const NoteItem = ({ note, onDelete }) => {
  return (
    <li style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p><em>{note.catfact}</em></p>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </li>
  );
};

export default NoteItem;
