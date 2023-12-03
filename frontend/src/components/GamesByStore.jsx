import React, { useState } from 'react';
import axios from 'axios';
import GameRow from '../rowcomponents/GameRow'; // Assuming rowcomponents is at the same level as components
import GameTableHeader from '../rowcomponents/GameTableHeader'; // Assuming rowcomponents is at the same level as components


const StoreGames = () => {
  const [storeName, setStoreName] = useState('');
  const [games, setGames] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };

  const searchGamesByStoreName = async () => {
    setIsSearched(true);
    try {
      const response = await axios.get(`http://localhost:5000/games_by_store`, { params: { store_name: storeName } });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games: ', error);
      setGames([]);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h1>Games By Store Name</h1>
      <input
        type="text"
        value={storeName}
        onChange={handleStoreNameChange}
        placeholder="Enter store name"
      />
      <button onClick={searchGamesByStoreName}>Search</button>
      {isSearched && (
        games.length > 0 ? (
          <table className="min-w-full">
            <GameTableHeader /> {/* Use the GameTableHeader component */}
            <tbody>
              {games.map((game) => (
                <GameRow key={game.game_id} game={game} /> // Use the GameRow component
              ))}
            </tbody>
          </table>
        ) : (
          <p>No games found with the store name {storeName}</p>
        )
      )}
    </div>
  );
};

export default StoreGames;
