import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
        try {
          const response = await axios.get('http://localhost:5000/all_stores');
          console.log(response.data); // Log the response data
          setStores(response.data);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };

    fetchStores();
  }, []);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredStores = searchTerm
    ? stores.filter(store =>
        Object.values(store).some(value =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : stores;


  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search stores..."
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Website</th>
            <th>City</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map(store => (
            <tr key={store.store_id}>
              <td>{store.store_id}</td>
              <td>{store.store_name}</td>
              <td>{store.website}</td>
              <td>{store.city}</td>
              <td>{store.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;