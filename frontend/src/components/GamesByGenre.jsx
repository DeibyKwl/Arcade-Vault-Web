import React, { useState } from 'react';
import axios from 'axios';

const GamesByGenre = () => {
    const [primaryGenre, setPrimaryGenre] = useState('');
    const [secondaryGenre, setSecondaryGenre] = useState('');
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    const genres = [
        'Shooter',
        'Platformer',
        'Racing',
        'Rhythm Game',
        'Maze',
        'Fighting',
        'Puzzle',
        'Light Gun Shooter',
        'Pinball',
        'Beat \'em Up',
        'Sport'
    ];

    const handleSearch = async () => {
        setLoading(true);
        try {
            const genreQuery = secondaryGenre ? `${primaryGenre}+${secondaryGenre}` : primaryGenre;
            const encodedQuery = encodeURIComponent(genreQuery);
            const response = await axios.get(`http://localhost:5000/game_by_genre?genre_value=${encodedQuery}`);
            setGames(response.data);
        } catch (error) {
            console.error('Error fetching games: ', error);
        }
        setLoading(false);
    };


    return (
        <div className='flex flex-col items-center'>
            <h1 className='pixel-font'>Games By Genre</h1>
            <div className="flex flex-col items-center gap-2">
                <select value={primaryGenre} className="bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center" onChange={e => setPrimaryGenre(e.target.value)}>
                    <option value="">Select Primary Genre</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
                <select value={secondaryGenre} className="bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center" onChange={e => setSecondaryGenre(e.target.value)}>
                    <option value="">(none)</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            <p className='pixel-font'>{games.length} game(s) found.</p>
            <button onClick={handleSearch} className='pixel-font mt-2'>Search</button>

            {loading && <p>Loading...</p>}

            {!loading && games.length > 0 && (
                <div className="scrollable-container w-full">
                    <p className='pixel-font'>{games.length} game(s) found.</p>
                    <ul>
                        {games.map((game, index) => (
                            <li key={index} className='pixel-font'>{game[0]}</li> // Accessing the game name at index 0
                        ))}
                    </ul>
                </div>
            )}

            {!loading && games.length === 0 && (primaryGenre || secondaryGenre) && (
                <p className='pixel-font'>No games found for the selected genres.</p>
            )}
        </div>
    );
};

export default GamesByGenre;