import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamesByCost = () => {
    const [games, setGames] = useState([]);
    const [selectedCost, setSelectedCost] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedCost) {
            const fetchGamesByCost = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/game_by_cost`, { params: { cost_value: selectedCost } });
                    setGames(response.data);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
                setLoading(false);
            };

            fetchGamesByCost();
        }
    }, [selectedCost]);

    // Define the cost thresholds
    const costs = Array.from({ length: 8 }, (_, i) => (i + 1) * 0.25); // [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

    return (
        <div className='flex flex-col items-center'>
            <h1 className='pb-2'>Games By Cost</h1>
            <select value={selectedCost} className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center" onChange={e => setSelectedCost(e.target.value)}>
                <option value="">Select a cost threshold</option>
                {costs.map(cost => (
                    <option key={cost} value={cost}>{`$${cost.toFixed(2)}`}</option>
                ))}
            </select>

            {loading && <p>Loading...</p>}

            {selectedCost && games.length > 0 && (
                <p className='pixel-font'>{games.length} game(s) found for the cost of ${selectedCost} or less.</p>
            )}

            {selectedCost && games.length === 0 && !loading && (
                <p>No games found for the cost of ${selectedCost} or less.</p>
            )}

            <div className="scrollable-container w-full p-2">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className='pixel-font text-center text-lg'>Game Name</th>
                            <th className='pixel-font text-center text-lg'>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <td className='pixel-font text-center'>{game[0]}</td>{/* game name */}
                                <td className='pixel-font text-center'>{`$${parseFloat(game[1]).toFixed(2)}`}</td>{/* game cost */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GamesByCost;
