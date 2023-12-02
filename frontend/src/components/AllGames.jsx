import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameRow from '../rowcomponents/GameRow';
import GameTableHeader from '../rowcomponents/GameTableHeader';

const AllGames = () => {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get('http://localhost:5000/all_games');
                console.log(response.data); // Log the response data
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
                // Optionally update the UI to show an error message
            }
            setLoading(false); // Finish loading
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
            {loading ? (
                <p>Loading games...</p>
            ) : (
                <div className='flex flex-col items-center'>
                    <h1 >All Games</h1>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search games..."
                        style={{ color: 'black' }} // Set the text color to black
                    />
                    <div className="scrollable-container w-full">

                        <table className="min-w-full">
                            <GameTableHeader />
                            <tbody>
                                {filteredGames.map(game => (
                                    <GameRow key={game.game_id} game={game} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllGames;
