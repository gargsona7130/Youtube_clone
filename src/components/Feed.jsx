import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button } from "@mui/material";
import { Sidebar, Videos } from '.';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New"); // Set initial category
  const [videos, setVideos] = useState(null); // State for fetched videos

  // Fetch data when selectedCategory changes
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setVideos(null); // Clear previous videos while fetching new ones

    // Fetching videos for the selected category
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`, { signal })
      .then((data) => setVideos(data.items)) // Set videos to the fetched data
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Error fetching data:', err);
        }
      });

    return () => controller.abort(); // Cleanup fetch request if component unmounts or category changes
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: 'auto', md: '92vh' }, borderRight: '1px solid #3d3d3d', px: { sx: 0, md: 2 } }}>
        <Sidebar />
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
          Copyright 2025 Sonal Garg
        </Typography>
      </Box>

      <Box p={2} sx={{ overflow: 'auto', height: '90vh', flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
          {selectedCategory} <span style={{ color: '#F31503' }}> Videos </span>
        </Typography>

        {/* Category buttons to change the selected category */}
        <Box sx={{ mb: 2 }}>
          <Button onClick={() => setSelectedCategory("Music")} sx={{ marginRight: 1 }}>
            Music
          </Button>
          <Button onClick={() => setSelectedCategory("Sports")} sx={{ marginRight: 1 }}>
            Sports
          </Button>
          <Button onClick={() => setSelectedCategory("News")} sx={{ marginRight: 1 }}>
            News
          </Button>
          <Button onClick={() => setSelectedCategory("Gaming")} sx={{ marginRight: 1 }}>
            Gaming
          </Button>
        </Box>

        {/* Loading or displaying fetched videos */}
        {videos ? (
          <Videos videos={videos} /> // Pass the fetched videos to the Videos component
        ) : (
          <Typography variant="body1" sx={{ color: 'white' }}>
            Loading videos...
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

export default Feed;



