import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamesList = () => {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all_games');
                console.log(response.data); // Log the response data
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
                // Optionally update the UI to show an error message
            }
        };

        fetchGames();
    }, []);

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const filteredGames = searchTerm
        ? games.filter(game =>
            Object.values(game).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : games;

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search games..."
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Players</th>
                        <th>Release Date</th>
                        <th>Machine Type</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGames.map(game => (
                        <tr key={game.game_id}> {/* Ensure that game_id is the correct key */}
                            <td>{game.game_id}</td>
                            <td>{game.game_name}</td>
                            <td>{game.game_cost}</td>
                            <td>{game.num_of_players}</td>
                            <td>{game.release_year}</td>
                            <td>{game.type_of_machine}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GamesList;
