import React, { useState } from 'react';
import Stores from '../../components/Stores.jsx';
import Games from '../../components/Games.jsx';
import GamesByYear from '../../components/GamesByYear.jsx';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('stores');

  const renderComponent = () => {
    switch (activeTab) {
      case 'stores':
        return <Stores />;
      case 'games':
        return <Games />;
      case 'gamesbyyear':
        return <GamesByYear />;
      default:
        return <Stores />;
    }
  };


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="vaporwave-bg min-h-screen flex flex-col">
      {/* Navigation at the top */}
      <nav className="flex justify-center space-x-4 p-4">
        
        <h1 className={`${activeTab === 'stores' ? 'active-tab' : ''}`}>
          <button onClick={() => handleTabClick('stores')}>All Stores</button>
        </h1>
        
        <h1 className={`${activeTab === 'games' ? 'active-tab' : ''}`}>
          <button onClick={() => handleTabClick('games')}>All Games</button>
        </h1>
        
        <h1 className={`${activeTab === 'gamesbyyear' ? 'active-tab' : ''}`}>
          <button onClick={() => handleTabClick('gamesbyyear')}>Games By Year |</button>
        </h1>

        <h1 className={`${activeTab === 'gamesbygenre' ? 'active-tab' : ''}`}>
          <button onClick={() => handleTabClick('gamesbygenre')}>Games By Genre</button>
        </h1>
      </nav>

      <div className="flex flex-col flex-grow items-center justify-start pt-8">
        <div className="w-full md:w-2/3 lg:w-1/3 bg-black text-white p-4 rounded-lg shadow-lg mx-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;