import React from 'react';

const Videos = ({ videos }) => {
  // Check if videos is an array and contains at least one video
  if (!Array.isArray(videos) || videos.length === 0) {
    return <div>No videos found</div>; // Display a message if there are no videos
  }

  return (
    <div>
      {videos.map((video, index) => {
        // Safely check if the video and the necessary properties exist
        if (!video || !video.id || !video.snippet) {
          console.error('Invalid video data:', video); // Log if there's any invalid data
          return null; // Skip rendering this video if any critical properties are missing
        }

        // Safely access the id and other properties of the video
        const { id, snippet } = video;
        const videoId = id?.videoId || id?.channelId; // Handle different types of IDs
        const title = snippet?.title || 'Untitled'; // Provide fallback if title is missing

        return (
          <div key={videoId || index} style={{ marginBottom: '20px' }}>
            <h4>{title}</h4> {/* Render video title */}
            <p>{snippet.description}</p> {/* Render video description */}
            {/* Render other video details */}
            <img 
              src={snippet.thumbnails?.medium?.url} 
              alt={title} 
              style={{ width: '100%', height: 'auto' }} 
            /> {/* Render video thumbnail */}
          </div>
        );
      })}
    </div>
  );
};

export default Videos;

