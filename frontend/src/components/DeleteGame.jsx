import React, { useState } from 'react';
import axios from 'axios';

const DeleteGame = () => {
    const [gameId, setGameId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this game?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/delete_game/${gameId}`);
                setStatusMessage(`Game deleted successfully: ${response.data.message}`);
                setGameId('');
            } catch (error) {
                console.error('Error deleting game:', error);
                setStatusMessage('Error deleting game');
            }
        }
    };

    return (
        <div>
            <input 
                type="number" 
                value={gameId} 
                onChange={(e) => setGameId(e.target.value)} 
                placeholder="Enter Game ID" 
            />
            <button onClick={handleDelete}>Delete Game</button>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};

export default DeleteGame;
