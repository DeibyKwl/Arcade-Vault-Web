import React, { useState } from 'react';
import axios from 'axios';
import GameRow from '../rowcomponents/GameRow'; // Assuming rowcomponents is at the same level as components
import GameTableHeader from '../rowcomponents/GameTableHeader'; // Assuming rowcomponents is at the same level as components


const GamesByStore = () => {
  const [storeName, setStoreName] = useState('');
  const [games, setGames] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };

  //this looks like sh*t but works 
  const searchGamesByStoreName = async () => {
    setIsSearched(true);
    try {
      const response = await axios.get(`http://localhost:5000/games_by_store`, { params: { store_name: storeName } });
      const gamesData = response.data.map(([gameId, gameName, releaseYear, numOfPlayers, typeOfMachine, gameCost]) => ({
        game_id: gameId,
        game_name: gameName,
        release_year: releaseYear,
        num_of_players: numOfPlayers,
        type_of_machine: typeOfMachine,
        game_cost: gameCost
      }));
      setGames(gamesData);
    } catch (error) {
      console.error('Error fetching games: ', error);
      setGames([]);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='pb-2'>Games By Store Name</h1>
      <input
        type="text"
        value={storeName}
        onChange={handleStoreNameChange}
        placeholder="Enter store name"
        className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center"
      />
      <div className='p-2'>
        <div className="text-center"> {/* Add a parent container with text-center class */}
          <button onClick={searchGamesByStoreName} className='pixel-font'>Search</button> {/* Remove text-center class from the button */}
        </div>
        {isSearched && (
          games.length > 0 ? (
            <div className="pt-2 scrollable-container w-full">
              <table className="min-w-full">
                <GameTableHeader /> {/* Use the GameTableHeader component */}
                <tbody>
                  {games.map((games) => (
                    <GameRow key={games.game_id} game={games} />
                  ))}

                </tbody>
              </table>
            </div>
          ) : (
            <p>No games found with the store name {storeName}</p>
          )
        )}
      </div>
    </div>
  );
};

export default GamesByStore;
