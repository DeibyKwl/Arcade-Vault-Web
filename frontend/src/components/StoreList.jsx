import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:5000/all_stores');
        console.log(response.data);
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      setLoading(false); // Finish loading
    };

    fetchStores();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStores = searchTerm
    ? stores.filter((store) =>
        Object.values(store).some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : stores;

  return (
    <div>
      {loading ? (
        <p>Loading stores...</p>
      ) : (
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
              {filteredStores.map((store) => (
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
      )}
    </div>
  );
};

export default StoreList;