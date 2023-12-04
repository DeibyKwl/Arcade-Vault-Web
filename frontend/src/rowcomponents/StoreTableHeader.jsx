import React from 'react'

const StoreTableHeader = () => {
  return (
    <thead>
      <tr>      
        <th className="pixel-font text-xs" style={{ width: '8%' }}>ID</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>Name</th>
        <th className="pixel-font text-xs" style={{ width: '25%' }}>Website</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>City</th>
        <th className="pixel-font text-xs" style={{ width: '20%' }}>Address</th>
      </tr>
    </thead>
  );
};

export default StoreTableHeader