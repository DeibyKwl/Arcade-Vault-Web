import React from 'react';

const SimpleRow = ({ game }) => {
  return (
    <tr>
      <td>{game[0]}</td> {/* Assuming the game name is the first element in the array */}
      <td>{game[1]}</td> {/* Assuming the year is the second element */}
    </tr>
  );
};

export default SimpleRow;
