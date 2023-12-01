import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './HomePage.css'; // Import your CSS file
import Stores from '../../components/Stores.jsx';
import Games from '../../components/Games.jsx';


const HomePage = () => {
  const [activeTab, setActiveTab] = useState('stores'); // Initial active tab

  return (

      <div>
        <nav>
          <ul className="tab-list">
            <li className={activeTab === 'stores' ? 'active-tab' : ''}>
              <Link to="/stores" onClick={() => setActiveTab('stores')}>Stores</Link>
            </li>
            <li className={activeTab === 'games' ? 'active-tab' : ''}>
              <Link to="/games" onClick={() => setActiveTab('games')}>Games</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/stores" element={<Stores />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </div>

  );
};

export default HomePage;