import React, { useState } from 'react';
import { searchNotes } from '../services/noteService';

const SearchNote = ({ onSearch, onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await searchNotes(query);
      onResults(response.data);  // Call onResults to pass results back to parent
      onSearch(query);            // Update searchQuery in parent
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchNote;
