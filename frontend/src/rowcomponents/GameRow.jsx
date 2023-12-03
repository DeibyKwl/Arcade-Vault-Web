import React from 'react';

const GameRow = ({ game }) => {
  return (
    <tr>
      <td className='pixel-font text-xs'>{game.game_id}</td>
      <td>{game.game_name}</td>
      <td>{game.game_cost}</td>
      <td>{game.num_of_players}</td>
      <td>{game.release_year}</td>
      <td>{game.type_of_machine}</td>
    </tr>
  );
};

export default GameRow;