
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreRow from '../rowcomponents/StoreRow'; // Import StoreRow
import StoreTableHeader from '../rowcomponents/StoreTableHeader'; // Import StoreTableHeader


const AllStores = () => {
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
        {loading ? <p>Loading stores...</p> : (
          <div className='flex flex-col items-center'>
      <h1 className='pb-2'> All Stores</h1>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search stores..."
              className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center"
            />
            <div className="pt-2 scrollable-container w-full">
              <table className="min-w-full fixed-layout-table">
                <StoreTableHeader />
                <tbody>
                  {filteredStores.map((store) => (
                    <StoreRow key={store.store_id} store={store} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default AllStores;