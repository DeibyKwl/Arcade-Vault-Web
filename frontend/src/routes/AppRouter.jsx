import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import Stores from '../components/Stores';
import Games from '../components/Games';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/games" element={<Games />} />
        {/* Other routes... */}
      </Routes>
    </Router>
  );
};

export default AppRouter;