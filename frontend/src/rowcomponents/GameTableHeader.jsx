import React from 'react';


const GameTableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="pixel-font text-xs" style={{ width: '10%' }}>ID</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>Name</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>Website</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>City</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>Address</th>
        <th className="pixel-font text-xs" style={{ width: '10%' }}>Select</th>
      </tr>
    </thead>
  );
};

export default GameTableHeader;
