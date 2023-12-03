import React from 'react';


const GameTableHeader = () => {
  return (
    <thead>
      <tr>
        <th className='pixel-font td-id'>ID</th>
        <th className='td-name'>Name</th>
        <th className='td-cost'>Cost</th>
        <th className='td-players'>Players</th>
        <th className='td-releasedate'>Release Date</th>
        <th className='td-machine'>Machine Type</th>
      </tr>
    </thead>
  );
};

export default GameTableHeader;
