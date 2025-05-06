import React, { useState, useEffect } from 'react';
import {
  getNotes,
  createNote,
  deleteNote as deleteNoteService,
} from './services/noteService';
import AddNote from './components/AddNote';
import SearchNote from './components/SearchNote';
import NoteItem from './components/NoteItem';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (noteData) => {
    try {
      await createNote(noteData);
      fetchNotes();
    } catch (err) {
      console.error('Error adding note', err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNoteService(id);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting note', err);
    }
  };

  // Use the searchResults state to store filtered notes
  const filteredNotes = searchResults.length > 0 ? searchResults : notes;

  return (
    <div className="App">
      <h1>Note CatFact</h1>
      <AddNote onAdd={handleAddNote} />
      <SearchNote onResults={setSearchResults} />
      {filteredNotes.map(note => (
        <NoteItem key={note._id} note={note} onDelete={handleDeleteNote} />
      ))}
    </div>
  );
}

export default App;
