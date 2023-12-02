import React from 'react';

const GameRow = ({ game }) => {
  return (
    <tr>
      <td><h1 className="text-xs">{game.game_id}</h1></td>
      <td>{game.game_name}</td>
      <td>{game.game_cost}</td>
      <td>{game.num_of_players}</td>
      <td>{game.release_year}</td>
      <td>{game.type_of_machine}</td>
    </tr>
  );
};

export default GameRow;