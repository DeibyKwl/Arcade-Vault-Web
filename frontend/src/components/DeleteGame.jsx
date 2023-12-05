import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameTableHeader from '../rowcomponents/GameTableHeader';

const DeleteGame = () => {
    
    const [gamess, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/all_games');
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchGames();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleDelete = async (game_id) => {
        if (window.confirm("Are you sure you want to delete this game?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/delete_game/${game_id}`);
                //setStatusMessage(`Game deleted successfully: ${response.data.message}`);
                console.log('Delete response:', response);
                setGames(gamess.filter(games => games.game_id !== game_id));
            } catch (error) {
                console.error('Error deleting game:', error);
                console.error('Error response:', error.response);
                //setStatusMessage('Error deleting game');
            }
        }
    };

    const filteredGames = searchTerm
        ? gamess.filter(games =>
            Object.values(games).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : gamess;
    
    return (
        <div>
            {loading ? <p>Loading games...</p> : (
                <div className='flex flex-col items-center'>
                    <h1 className='pb-2'>Delete Games</h1>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search games..."
                        className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center"
                    />
                    <div className='scrollable-container' style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                        <table className="min-w-full fixed-layout-table">
                            <GameTableHeader />
                            <tbody>
                                {filteredGames.map(games => (
                                    <tr key={games.store_id}>
                                        <td className="pixel-font text-xs text-center">{games.game_id}</td>
                                        <td className="pixel-font very-small-text text-center">{games.game_name}</td>
                                        <td className="pixel-font very-small-text text-center">{games.game_cost}</td>
                                        <td className="pixel-font very-small-text text-center">{games.num_of_players}</td>
                                        <td className="pixel-font very-small-text text-center">{games.release_year}</td>
                                        <td className="pixel-font very-small-text text-center">{games.type_of_machine}</td>
                                        <td>
                                            <button className="pixel-font very-small-text text-center hover:text-blue-400" onClick={() => handleDelete(games.game_id)}>
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            )}
            {/* {reponseMessage && <p>{responseMessage}</p>} */}
        </div>
    );
};

    

export default DeleteGame;
