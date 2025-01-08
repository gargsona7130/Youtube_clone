import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed } from './components';

/* 
Initially importing all here like this
but now imported it like above.

import Navbar from './components/Navbar';
import VideoDetail from './components/VideoDetail';
import ChannelDetail from './components/ChannelDetail';
import {Feed} from '.@mui/icons-material';
import SearchFeed from './components/SearchFeed';
*/

const App = () => (
    <BrowserRouter>
    <Box sx={{ backgroundColor: '#000' }} >
       <Navbar />
       <Routes>
        <Route path="/" exact element = {<Feed />} />
        <Route path="video/:id" element={<VideoDetail />} />
        <Route path="channel/:id" element={<ChannelDetail />} />
        <Route path="search/:searchTerm" element={<SearchFeed />} />

        </Routes> 
    </Box>
    </BrowserRouter>
  )


export default App

