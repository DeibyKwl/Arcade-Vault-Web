import React from 'react';


const GameTableHeader = () => {
  return (
    <thead>
      <tr>
        <th className='pixel-font text-xs'>ID</th>
        <th className='pixel-font text-xs'>Name</th>
        <th className='pixel-font text-xs px-2 text-center'>Cost</th>
        <th className='pixel-font text-xs'>Players</th>
        <th className='pixel-font text-xs'>Release Date</th>
        <th className='pixel-font text-xs'>Machine Type</th>
      </tr>
    </thead>
  );
};

export default GameTableHeader;
