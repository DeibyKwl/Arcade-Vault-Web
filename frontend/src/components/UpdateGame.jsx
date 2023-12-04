import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameTableHeader from '../rowcomponents/GameTableHeader';

const UpdateGame = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState({
        game_id: '',
        game_name: '',
        release_year: '',
        game_cost: '',
        num_of_players: '',
        type_of_machine: '',
    });
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all_games');
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        fetchGames();
    }, []);

    useEffect(() => {
        const filtered = games.filter(game => {
            const gameName = game.game_name.toLowerCase();
            const year = game.release_year ? game.release_year.toString() : '';
            const game_cost = game.game_cost ? game.game_cost.toString() : '';
            const numOfPlayers = game.num_of_players ? game.num_of_players.toString() : '';
            const typeOfMachine = game.type_of_machine ? game.type_of_machine.toLowerCase() : '';

            const lowerCaseSearchTerm = searchTerm.toLowerCase();

            return gameName.includes(lowerCaseSearchTerm) ||
                year.includes(lowerCaseSearchTerm) ||
                game_cost.includes(lowerCaseSearchTerm) ||
                numOfPlayers.includes(lowerCaseSearchTerm) ||
                typeOfMachine.includes(lowerCaseSearchTerm);
        });

        setFilteredGames(filtered);
    }, [searchTerm, games]);

    const handleGameSelect = (gameId) => {
        const selected = games.find(game => game.game_id.toString() === gameId);
        if (selected) {
            setSelectedGame(selected);
            setEditMode(true);
        }
    };

    const handleInputChange = (e) => {
        setSelectedGame({ ...selectedGame, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/update_game', selectedGame);
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage('Error updating game: ' + error.message);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <div className="flex flex-col items-center p-2">
                <h2 className="text-center">Update Game</h2>
                <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-60 text-center"
                />
            </div>

            <div className='scrollable-container' style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                <table>
                    
                    <GameTableHeader />
                    <tbody>
                        {filteredGames.map(game => (
                            <tr key={game.game_id}>
                                <td className='pixel-font text-xs text-center'>{game.game_id}</td>
                                <td className='pixel-font text-xs text-center'>{game.game_name}</td>
                                <td className='pixel-font text-xs text-center'>{game.game_cost}</td>
                                <td className='pixel-font text-xs text-center'>{game.num_of_players}</td>
                                <td className='pixel-font text-xs text-center'>{game.release_year}</td>
                                <td className='pixel-font text-xs text-center'>{game.type_of_machine}</td>
                                <td>
                                    <button className="pixel-font very-small-text text-center hover:text-blue-400" onClick={() => handleGameSelect(game.game_id.toString())}>
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editMode && (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='flex'>
                    <div className='w-50% p-2'>
                            <label className='block pixel-font text-xs mb-2 px-2'>
                                Game Name:
                                <input type='text' name='game_name' value={selectedGame.game_name} onChange={handleInputChange} className='mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs' />
                            </label>
                        </div>
                        <div className='w-50% p-2'>
                            <label className='block pixel-font text-xs mb-2'>
                                Year:
                                <input
                                    type='text'
                                    name='release_year' // Make sure this matches the key in your state
                                    value={selectedGame.release_year}
                                    onChange={handleInputChange}
                                    className='mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs'
                                />
                            </label>
                        </div>
                        <div className='w-50% p-2'>
                            <label className='block pixel-font text-xs mb-2'>
                                Cost:
                                <input type='text' name='game_cost' value={selectedGame.game_cost} onChange={handleInputChange} className='mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs' />
                            </label>
                        </div>
                        <div className='w-50% p-2'>
                            <label className='block pixel-font text-xs mb-2'>
                                Number of Players:
                                <input type='text' name='num_of_players' value={selectedGame.num_of_players} onChange={handleInputChange} className='mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs' />
                            </label>
                        </div>
                        <div className='w-50% p-2'>
                            <label className='block pixel-font text-xs mb-2'>
                                Type of Machine:
                                <input type='text' name='type_of_machine' value={selectedGame.type_of_machine} onChange={handleInputChange} className='mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs' />
                            </label>
                        </div>
                    </div>

                    <button className='block w-full pixel-font text-sm hover:text-blue-400 py-2' type='submit'>Submit Update</button>
                    {/* Submit button */}
                </form>
            )}
            {responseMessage && <p className='pixel-font text-xs mt-4'>{responseMessage}</p>}
        </div >
    );
};

export default UpdateGame;
