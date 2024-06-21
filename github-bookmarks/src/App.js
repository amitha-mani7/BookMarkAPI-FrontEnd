import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Search from './components/Search';
import BookmarkList from './components/BookmarkList';
import ImportBookmarks from './components/ImportBookmarks';
import BookmarkGraph from './components/BookmarkGraph';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<ProtectedRoute element={Search} />} />
          <Route path="/bookmarks" element={<ProtectedRoute element={BookmarkList} />} />
          <Route path="/import-bookmarks" element={<ProtectedRoute element={ImportBookmarks} />} />
          <Route path="/graph" element={<ProtectedRoute element={BookmarkGraph} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
