import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransferGame = () => {
    const [games, setGames] = useState([]);
    const [stores, setStores] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [fromStore, setFromStore] = useState(''); // Store transferring from
    const [toStore, setToStore] = useState(''); // Store transferring to
    const [message, setMessage] = useState('');

// mostly working, transfering from initial store to second store, 
// then clicking the storeswap button and then trying to swap again reports an error but will still swap the game

    const fetchData = async () => {
        try {
            const gamesResponse = await axios.get('http://localhost:5000/all_games');
            setGames(gamesResponse.data);
            const storesResponse = await axios.get('http://localhost:5000/all_stores');
            setStores(storesResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (fromStore === toStore) {
            setMessage("Error: 'From Store' and 'To Store' cannot be the same.");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/transfer_game/${selectedGame}/${fromStore}/${toStore}`);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error transferring game:', error);
            setMessage('Error transferring game');
        }
    };

    const handleSwapStores = () => {
        setFromStore(toStore);
        setToStore(fromStore);
    };

    return (
        <div className='flex flex-col items-center'>
            <h1 className='py-2 text-center w-full '>Transfer Game</h1>
            <form onSubmit={handleSubmit} className="p-2 text-black border-gray-300 pixel-font text-xs w-80 text-center">

                <label htmlFor="game-select" className="pb-2 block text-sm font-medium text-blue-700">
                    Select Game
                </label>
                <select className='p-2 w-full' value={selectedGame} onChange={e => setSelectedGame(e.target.value)}>
                    <option value="">Select Game</option>
                    {games.map(game => (
                        <option key={game.game_id} value={game.game_id}>{game.game_name}</option>
                    ))}
                </select>
                <label htmlFor="from-store-select" className="pb-2 block text-sm font-medium text-red-500 mt-3">
                    From Store
                </label>
                <select className='p-2 w-full' value={fromStore} onChange={e => setFromStore(e.target.value)}>
                    <option value="">From Store</option>
                    {stores.map(store => (
                        <option key={store.store_id} value={store.store_id}>{store.store_name}</option>
                    ))}
                </select>
                <label htmlFor="to-store-select" className="pb-2 block text-sm font-medium text-green-700 mt-3">
                    To Store
                </label>
                <select className='p-2 w-full' value={toStore} onChange={e => setToStore(e.target.value)}>
                    <option value="">To Store</option>
                    {stores.map(store => (
                        <option key={store.store_id} value={store.store_id}>{store.store_name}</option>
                    ))}
                </select>
                <button className='p-2 px-4 bg-white items-center hover:bg-purple-400 text-black border-gray-300 pixel-font text-xs w-50' type="submit" onClick={handleSubmit}>Transfer Game</button>
                <button className='mt-2 p-4 text-black border-gray-300 pixel-font text-lg' onClick={handleSwapStores}>🔃</button>

            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TransferGame;
