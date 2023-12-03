import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamesByTypeOfMachine = () => {
    const [selectedType, setSelectedType] = useState('');
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedType) {
            const fetchGamesByTypeOfMachine = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/game_by_type_of_machine`, { 
                        params: { type_of_machine: selectedType } 
                    });
                    setGames(response.data);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
                setLoading(false);
            };

            fetchGamesByTypeOfMachine();
        }
    }, [selectedType]);

    // types of machines
    const typesOfMachines = [
        'Arcade Cabinet',
        'Pinball Machine',
        'Basketball Shooting Game',
        'Bubble Hockey Table',
        'Dance Dance Revolution Machine',
        'Virtual Pinball Machine',
        'Guitar Arcade Unit',
        'Arcade Boxing Machine',
        'Foosball Table',
        'Virtual Reality Arcade Pod',
        'Interactive Touchscreen',
        'Claw Machine',
        'Racing Simulator',
        'Coin Pusher Machine',
        'Boxing'
    ];

    return (
        <div className='flex flex-col items-center'>
            <h1 className='pixel-font'>Games By Type of Machine</h1>
            <select 
                value={selectedType} 
                className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center" 
                onChange={e => setSelectedType(e.target.value)}
            >
                <option value="">Select Type of Machine</option>
                {typesOfMachines.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            {loading && <p>Loading...</p>}

            {selectedType && games.length > 0 && (
                <p className='pixel-font'>{games.length} game(s) found for {selectedType}.</p>
            )}

            {selectedType && games.length === 0 && !loading && (
                <p>No games found for the selected type of machine.</p>
            )}

            <div className="scrollable-container w-full p-2">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className='pixel-font text-center'>Game Name</th>
                            <th className='pixel-font text-center'>Type of Machine</th>
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

export default GamesByTypeOfMachine;
