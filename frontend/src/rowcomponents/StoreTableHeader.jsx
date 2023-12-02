import React from 'react'

const StoreTableHeader = () => {
  return (
    <thead>
      <tr>
        
        <th className="text-xs th-id">ID</th>
        <th className="th-name">Store Name</th>
        <th className="th-website">Website</th>
        <th className="th-city">City</th>
        <th className="th-address">Address</th>
      </tr>
    </thead>
  );
};

export default StoreTableHeader