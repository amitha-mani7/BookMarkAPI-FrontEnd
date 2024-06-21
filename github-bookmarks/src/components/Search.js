import React, { useState } from 'react';
import axios from '../api';

function Search() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('repositories'); 
  const [results, setResults] = useState([]);
  const [viewingUserRepos, setViewingUserRepos] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (searchType === 'repositories') {
        response = await axios.get(`/api/github/search/repositories?query=${query}`);
      } else {
        response = await axios.get(`/api/github/search/users?query=${query}`);
      }
      setResults(response.data.items);
      setViewingUserRepos(false);
    } catch (error) {
      alert('Search failed!');
    }
  };

  const handleViewRepos = async (username) => {
    try {
      const response = await axios.get(`/api/github/users/${username}/repos`);
      setResults(response.data);
      setViewingUserRepos(true);
      setCurrentUser(username);
    } catch (error) {
      alert('Failed to fetch user repositories!');
    }
  };

  const handleBookmark = async (repo) => {
    try {
      await axios.post('/api/bookmark', { repo });
      alert('Repository bookmarked!');
    } catch (error) {
      alert('Failed to bookmark repository!');
    }
  };

  const handleBackToSearch = () => {
    setViewingUserRepos(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div>
      <h2>Search GitHub</h2>
      {!viewingUserRepos ? (
        <>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
              <option value="repositories">Repositories</option>
              <option value="users">Users</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <ul>
            {results.map((result) => (
              <li key={result.id || result.login}>
                {searchType === 'repositories' ? (
                  <>
                    <h3>{result.name}</h3>
                    <p>{result.description}</p>
                    <button onClick={() => handleBookmark(result)}>Add Bookmark</button>
                  </>
                ) : (
                  <>
                    <h3>{result.login}</h3>
                    <button onClick={() => handleViewRepos(result.login)}>View Repos</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <button onClick={handleBackToSearch}>Back to Search</button>
          <h3>{currentUser}'s Repositories</h3>
          <ul>
            {results.map((repo) => (
              <li key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <button onClick={() => handleBookmark(repo)}>Add Bookmark</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Search;
