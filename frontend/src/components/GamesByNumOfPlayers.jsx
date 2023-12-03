import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamesByNumPlayers = () => {
    const [games, setGames] = useState([]);
    const [selectedNumPlayers, setSelectedNumPlayers] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedNumPlayers) {
            const fetchGamesByNumPlayers = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/game_by_num_players`, { 
                        params: { num_of_players: selectedNumPlayers } 
                    });
                    setGames(response.data);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
                setLoading(false);
            };

            fetchGamesByNumPlayers();
        }
    }, [selectedNumPlayers]);

    // Define the number of players options
    const numPlayersOptions = [1, 2, 3, 4]; // Adjust this if you have more options

    return (
        <div className='flex flex-col items-center'>
            <h1 className='pixel-font'>Games By Number of Players</h1>
            <select 
                value={selectedNumPlayers} 
                className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center" 
                onChange={e => setSelectedNumPlayers(e.target.value)}
            >
                <option value="">Select Number of Players</option>
                {numPlayersOptions.map(num => (
                    <option key={num} value={num}>{num} Player{num > 1 ? 's' : ''}</option>
                ))}
            </select>

            {loading && <p>Loading...</p>}

            {selectedNumPlayers && games.length > 0 && (
                <p className='pixel-font'>{games.length} game(s) found for up to {selectedNumPlayers} player(s).</p>
            )}

            {selectedNumPlayers && games.length === 0 && !loading && (
                <p>No games found for up to {selectedNumPlayers} player(s).</p>
            )}

            <div className="scrollable-container w-full p-2">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className='pixel-font text-center'>Game Name</th>
                            <th className='pixel-font text-center'>Number of Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <td className='pixel-font text-center'>{game[0]}</td>
                                <td className='pixel-font text-center'>{game[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GamesByNumPlayers;
