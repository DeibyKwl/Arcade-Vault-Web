import React from 'react';

const GameRow = ({ game }) => {
  return (
    <tr>
      <td className='pixel-font very-small-text'>{game.game_id}</td>
      <td className='pixel-font text-xs text-center'>{game.game_name}</td>
      <td className='pixel-font very-small-text'>{game.game_cost}</td>
      <td className='pixel-font very-small-text text-center'>{game.num_of_players}</td>
      <td className='pixel-font very-small-text text-center'>{game.release_year}</td>
      <td className='pixel-font very-small-text text-center'>{game.type_of_machine}</td>
    </tr>
  );
};

export default GameRow;