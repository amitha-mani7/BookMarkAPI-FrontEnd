import React, { useState } from 'react';
import axios from '../api';

function ImportBookmarks() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to import!');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/import-bookmarks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Bookmarks imported successfully!');
    } catch (error) {
      alert('Failed to import bookmarks!');
    }
  };

  return (
    <div>
      <h2>Import Bookmarks</h2>
      <form onSubmit={handleImport}>
        <input type="file" accept=".csv" onChange={handleFileChange} required />
        <button type="submit">Import</button>
      </form>
    </div>
  );
}

export default ImportBookmarks;
