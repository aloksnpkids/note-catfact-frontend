import React, { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../services/noteService';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div>
      <h2>All Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <ul>
          {notes.map(note => (
            <li key={note._id} style={{ marginBottom: '1rem' }}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p><em>{note.catfact}</em></p>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
