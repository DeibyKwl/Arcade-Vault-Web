import React from 'react';


const GameTableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="pixel-font text-xs" style={{ width: '10%' }}>ID</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>Name</th>
        <th className="pixel-font text-xs" style={{ width: '10%' }}>Cost</th>
        <th className="pixel-font text-xs" style={{ width: '10%' }}>Num of Players</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>Release Year</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>Type of Machine</th>
      </tr>
    </thead>
  );
};

export default GameTableHeader;
