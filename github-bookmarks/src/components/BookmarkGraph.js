import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from '../api';
import 'chart.js/auto';

function BookmarkGraph() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get('/api/bookmarks');
        const bookmarks = response.data;
        const bookmarkCounts = bookmarks.reduce((acc, bookmark) => {
          const date = new Date(bookmark.bookmarkedAt).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(bookmarkCounts);
        const data = Object.values(bookmarkCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of Bookmarks',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        alert('Failed to fetch bookmarks!');
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div>
      <h2>Bookmarks Over Time</h2>
      {chartData ? (
        <Bar data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}

export default BookmarkGraph;
