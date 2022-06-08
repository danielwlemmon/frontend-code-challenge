import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DisplayMovies from './Components/DisplayMovies';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<DisplayMovies />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
