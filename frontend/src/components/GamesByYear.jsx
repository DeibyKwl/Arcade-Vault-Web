import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamesByYear = () => {
    const [games, setGames] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedYear) {
            const fetchGamesByYear = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/games_by_year`, { params: { year_value: selectedYear } });
                    setGames(response.data);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
                setLoading(false);
            };

            fetchGamesByYear();
        }
    }, [selectedYear]); // This useEffect will run every time selectedYear changes

    const years = Array.from({length: 2023 - 1970 + 1}, (_, i) => 1970 + i);

    return (
        <div className='flex flex-col items-center'>
      <h1 className='pb-2'>Games By Year</h1>
            <select value={selectedYear} className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center" onChange={e => setSelectedYear(e.target.value)}>
                <option value="">Select a year</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            {loading && <p>Loading...</p>}

            {selectedYear && games.length > 0 && (
                <p className='pixel-font'>{games.length} game(s) found for the year {selectedYear}.</p>
            )}

            {selectedYear && games.length === 0 && !loading && (
                <p>No games found for the year {selectedYear}.</p>
            )}

            <div className="scrollable-container w-full p-2">
                <table className="min-w-full">
                    <thead>
                      
                        <tr>
                            <th className='pixel-font'>Game Name</th>
                            <th className='pixel-font'>Year</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <td className='pixel-font'>{game[0]}</td>
                                <td className='pixel-font'>{selectedYear}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GamesByYear;
