import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddGame = () => {
    const [gameDetails, setGameDetails] = useState({
        store_id: '',
        game_name: '',
        release_year: '',
        num_of_players: '',
        type_of_machine: '',
        game_cost: '',
        game_genre: ''
    });
    const [stores, setStores] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all_stores'); // Replace with your API endpoint to fetch stores
                setStores(response.data);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };
        fetchStores();
    }, []);

    const handleInputChange = (e) => {
        setGameDetails({ ...gameDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/add_game', gameDetails);
            const message = response.data.message || 'Game added successfully';
            setResponseMessage(message);
        } catch (error) {
            setResponseMessage('Error adding game: ' + (error.response.data.error || error.message));
        }
    };

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

    const costs = Array.from({length: 8}, (_, i) => (i + 1) * 0.25);
    const years = Array.from({length: 2023 - 1970 + 1}, (_, i) => 1970 + i);
    
    const genres = [
        'Shooter',
        'Platformer',
        'Racing',
        // 'Rhythm Game',
        'Maze',
        'Fighting',
        'Puzzle',
        // 'Light Gun Shooter',
        'Pinball',
        // 'Beat \'em Up',
        'Sport'
    ];

    const num_of_players = Array.from({length: 4}, (_, i) => i + 1);

    
    return (
        <div>
            <h2 className="pixel-font text-2xl p-4 text-White text-center">Add Game</h2>
            <form onSubmit={handleSubmit} className="pixel-font text-black">
                <div className="mb-4">
                    <label className="block mb-2 text-white">Store:</label>
                    <select
                        name="store_id"
                        value={gameDetails.store_id}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
                    >
                        <option value="">Select a Store</option>
                        {stores.map(store => (
                            <option key={store.store_id} value={store.store_id}>
                                {store.store_name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Repeat for each input field */}
                <div className="mb-4">
                    <label className="block mb-2 text-white">Game Name:</label>
                    <input
                        type="text"
                        name="game_name"
                        value={gameDetails.game_name}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-white">Number of Players:</label>
                    <select

                        name="num_of_players"
                        value={gameDetails.num_of_players}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
                    >
                        <option value="">Select a Number</option>
                        {num_of_players.map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-white">Release Year:</label>
                    <select
                        name="release_year"
                        value={gameDetails.release_year}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
                    >
                        <option value="">Select a Year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-white">Type of Machine:</label>
                    <select
                        name="type_of_machine"
                        value={gameDetails.type_of_machine}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
                    >
                        <option value="">Select a Type</option>
                        {typesOfMachines.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-white">Cost:</label>
                    <select
                        name="game_cost"
                        value={gameDetails.game_cost}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
                    >
                        <option value="">Select a Cost</option>
                        {costs.map(cost => (
                            <option key={cost} value={cost.toFixed(2)}>{cost.toFixed(2)}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-white">Genre:</label>
                    <select
                        name="game_genre"
                        value={gameDetails.game_genre}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
                    >
                        <option value="">Select a Genre</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                <form>
                    {/* Form fields */}
                    <div className="flex justify-center"> {/* Add the flex and justify-center classes */}
                        <button className='text-white text-center items-center hover:text-blue-400' type="submit">Submit Game</button>
                    </div>
                </form>
            {responseMessage && <p className='pixel-font text-xs text-center text-green-300 mt-4'>{responseMessage}</p>}
            </form>
        </div>
    );
};

export default AddGame;