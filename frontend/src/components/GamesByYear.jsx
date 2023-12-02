import React, { useState } from 'react';
import axios from 'axios';
import GameRow from '../rowcomponents/GameRow'; // Assuming rowcomponents is at the same level as components
import GameTableHeader from '../rowcomponents/GameTableHeader'; // Assuming rowcomponents is at the same level as components

const GamesByYear = () => {
  const [year, setYear] = useState('');
  const [games, setGames] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const searchGamesByYear = async () => {
    setIsSearched(true);
    try {
      const response = await axios.get(`http://localhost:5000/games_by_year`, { params: { year_value: year } });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games: ', error);
      setGames([]);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h1>Games By Year</h1>
      <input
        type="text"
        value={year}
        onChange={handleYearChange}
        placeholder="Enter year"
      />
      <button onClick={searchGamesByYear}>Search</button>
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
          <p>No games found for the year {year}</p>
        )
      )}
    </div>
  );
};

export default GamesByYear;
