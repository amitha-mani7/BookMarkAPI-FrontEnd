import React, { useEffect, useState } from 'react';
import axios from '../api';

function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('/api/bookmarks');
        setBookmarks(response.data);
      } catch (error) {
        alert('Failed to fetch bookmarks!');
      }
    };

    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (id) => {
    try {
      await axios.delete(`/api/bookmark/${id}`);
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
    } catch (error) {
      alert('Failed to remove bookmark!');
    }
  };

  return (
    <div>
      <h2>Bookmarked Repositories</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <h3>{bookmark.repoName}</h3>
            <p>
              <a href={bookmark.repoUrl} target="_blank" rel="noopener noreferrer">
                {bookmark.repoUrl}
              </a>
            </p>
            <button onClick={() => handleRemoveBookmark(bookmark.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookmarkList;
