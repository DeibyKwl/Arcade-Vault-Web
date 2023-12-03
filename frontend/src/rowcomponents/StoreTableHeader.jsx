import React from 'react'

const StoreTableHeader = () => {
  return (
    <thead>
      <tr>
        
        <th className="pixel-font text-xs th-id">ID</th>
        <th className="pixel-font text-xs th-name">Store Name</th>
        <th className="pixel-font text-xs th-website">Website</th>
        <th className="pixel-font text-xs th-city">City</th>
        <th className="pixel-font text-xs sth-address">Address</th>
      </tr>
    </thead>
  );
};

export default StoreTableHeader