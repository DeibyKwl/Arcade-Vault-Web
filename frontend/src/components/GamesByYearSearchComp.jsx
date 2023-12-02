import React, { useState } from 'react';
import axios from 'axios';

const GamesByYearSearchComp = () => {
  const [year, setYear] = useState('');
  const [games, setGames] = useState([]);
  const [searched, setSearched] = useState(false); // New state to track if search has been performed

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const searchGamesByYear = async () => {
    setSearched(true); // Set searched to true when the search is performed
    try {
      const response = await axios.get(`http://localhost:5000/games_by_year`, {
        params: { year_value: year }
      });
      setGames(response.data); // Assuming response.data is the array of arrays
    } catch (error) {
      console.error('Error fetching games: ', error);
      setGames([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={year}
        onChange={handleYearChange}
        placeholder="Enter year"
      />
      <h1><button onClick={searchGamesByYear}>Search</button></h1>
{/* this is kind of a doozy, but basically using maps  */}
      {searched ? (
        Array.isArray(games) && games.length > 0 ? (
          <ul>
            {games.map((gameArray, index) => (
              <li key={index}>{gameArray[0]}</li>
            ))}
          </ul>
        ) : (
          <p>No games found for the year {year}</p>
        )
      ) : null}
    </div>
  );
};

export default GamesByYearSearchComp;
