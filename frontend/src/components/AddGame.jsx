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
            const response = await axios.get('http://localhost:5000/add_game', { params: gameDetails });
            setResponseMessage(response.data.message || 'Game added successfully');
        } catch (error) {
            setResponseMessage('Error adding game: ' + error.message);
        }
    };

    return (
        <div>
            <h2 className="pixel-font text-xl">Add Game</h2>
            <form onSubmit={handleSubmit} className="pixel-font text-black">
                <div className="mb-4">
                    <label className="block mb-2">Store:</label>
                    <select
                        name="store_id"
                        value={gameDetails.store_id}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-white border border-gray-300 rounded-lg"
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
                    <label className="block mb-2">Game Name:</label>
                    <input
                        type="text"
                        name="game_name"
                        value={gameDetails.game_name}
                        onChange={handleInputChange}
                        className="w-full p-2 text-black bg-white border border-gray-300 rounded-lg"
                    />
                </div>
                <div>
                    <label>Release Year:</label>
                    <input
                        type="number"
                        name="release_year"
                        value={gameDetails.release_year}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Number of Players:</label>
                    <input
                        type="number"
                        name="num_of_players"
                        value={gameDetails.num_of_players}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Type of Machine:</label>
                    <input
                        type="text"
                        name="type_of_machine"
                        value={gameDetails.type_of_machine}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Cost:</label>
                    <input
                        type="number"
                        name="game_cost"
                        value={gameDetails.game_cost}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">Add Game</button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default AddGame;
