import React, { useState } from 'react';
import axios from 'axios';

const AddStore = () => {
  const [storeDetails, setStoreDetails] = useState({
    store_name: '',
    website: '',
    city: '',
    address: '',
    user_first_name: '',
    user_last_name: '',
    user_email: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    setStoreDetails({ ...storeDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/add_store', storeDetails);
      setResponseMessage(response.data.message || 'Store added successfully');
    } catch (error) {
      setResponseMessage('Error adding store: ' + error.message);
    }
  };

  return (
    <div className='text-center p-2'>
      <h2>Add Store</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='text-black pixel-font'
          type="text"
          name="store_name"
          value={storeDetails.store_name}
          onChange={handleInputChange}
          placeholder="Store Name"
        />
        <br />
        <input
          className='text-black pixel-font'
          type="text"
          name="website"
          value={storeDetails.website}
          onChange={handleInputChange}
          placeholder="Website"
        />
        <br />
        <input
          className='text-black pixel-font'

          type="text"
          name="city"
          value={storeDetails.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <br />
        <input
          className='text-black pixel-font'

          type="text"
          name="address"
          value={storeDetails.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <br />
        <input
          className='text-black pixel-font'

          type="text"
          name="user_first_name"
          value={storeDetails.user_first_name}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <br />
        <input
          className='text-black pixel-font'

          type="text"
          name="user_last_name"
          value={storeDetails.user_last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <br />
        <input
          className='text-black pixel-font'

          type="email"
          name="user_email"
          value={storeDetails.user_email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <br />
        <button className='text-white hover:text-blue-400 pixel-font'
          type="submit">Submit Store</button>
      </form>
      {responseMessage && <p className='text-green-300 pixel-font'>{responseMessage}</p>}
    </div>
  );
};

export default AddStore;
