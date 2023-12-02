import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './HomePage.css'; // Import your CSS file
import Stores from '../../components/Stores.jsx';
import Games from '../../components/Games.jsx';
import GamesByYear from '../../components/GamesByYear.jsx';


// we have a fucntional home page now
// but its very uggly so im going to add some css
// and make it look better


const HomePage = () => {
  const [activeTab, setActiveTab] = useState('stores'); // Initial active tab

// i'd like to make a better looking home page using some tailwind css
// i'll start by making a nav bar
// then i'll add some css to make it look better
  return (

      <div>
        <nav>
        <h1 className="text-4xl text-center text-blue-500">Hello World</h1>

          <ul className="tab-list">
            <li className={activeTab === 'stores' ? 'active-tab' : ''}>
              <Link to="/stores" onClick={() => setActiveTab('stores')}>Stores</Link>
            </li>
            <li className={activeTab === 'games' ? 'active-tab' : ''}>
              <Link to="/games" onClick={() => setActiveTab('games')}>Games</Link>
            </li>
            <li className={activeTab === 'gamesbyyear' ? 'active-tab' : ''}>
              <Link to="/gamesbyyear" onClick={() => setActiveTab('gamesbyyear')}>Games By Year</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/stores" element={<Stores />} />
          <Route path="/games" element={<Games />} />
          <Route path="/gamesbyyear" element={<GamesByYear />} />
        </Routes>
      </div>

  );
};

export default HomePage;