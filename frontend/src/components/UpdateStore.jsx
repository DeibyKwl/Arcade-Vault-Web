import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreTableHeader from '../rowcomponents/StoreTableHeader';
// import StoreRow from '../rowcomponents/StoreRow';    

const UpdateStore = () => {
    const [stores, setStores] = useState([]);
    const [selectedStoreId, setSelectedStoreId] = useState('');
    const [filteredStores, setFilteredStores] = useState([]);
    const [storeDetails, setStoreDetails] = useState({
        store_id: '',
        store_name: '',
        website: '',
        city: '',
        address: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const [responseMessage, setResponseMessage] = useState('');
    const [editMode, setEditMode] = useState(false);

    // Fetch all stores
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/all_stores');
                setStores(response.data);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };
        fetchStores();
    }, []);

    useEffect(() => {
        const filtered = stores.filter(store =>
            store.store_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            store.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStores(filtered);
    }, [searchTerm, stores]);

    // Handle store selection
    const handleStoreSelect = (storeId) => {
        setSelectedStoreId(storeId);
        const selectedStore = stores.find(store => store.store_id.toString() === storeId);
        if (selectedStore) {
            setStoreDetails(selectedStore);
            setEditMode(true);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        setStoreDetails({ ...storeDetails, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/update_store', storeDetails);
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage('Error updating store: ' + error.message);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            
            <div className='flex flex-col items-center p-2'>
                <h2 className="text-center">Update Store</h2>
                <input
                    type="text"
                    placeholder="Search stores..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-60 text-center"
                />
            </div>

            <div className='scrollable-container' style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                <table>
                    <StoreTableHeader />
                    <tbody>
                        {filteredStores.map(store => (
                            <tr key={store.store_id}>
                                <td className="pixel-font text-xs text-center">{store.store_id}</td>
                                <td className="pixel-font very-small-text text-center">{store.store_name}</td>
                                <td className="pixel-font very-small-text text-center">{store.website}</td>
                                <td className="pixel-font very-small-text text-center">{store.city}</td>
                                <td className="pixel-font very-small-text text-center">{store.address}</td>
                                <td>
                                    <button className="pixel-font very-small-text text-center hover:text-blue-400" onClick={() => handleStoreSelect(store.store_id.toString())}>
                                        Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editMode && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap">
                        <div className="w-1/2">
                            <label className='block pixel-font text-xs mb-2 p-2'>
                                Store Name:
                                <input type="text" name="store_name" value={storeDetails.store_name} onChange={handleInputChange} className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs" />
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label className='block pixel-font text-xs mb-2 p-2'>
                                Website:
                                <input type="text" name="website" value={storeDetails.website} onChange={handleInputChange} className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs" />
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label className='block pixel-font text-xs mb-2 px-2'>
                                City:
                                <input type="text" name="city" value={storeDetails.city} onChange={handleInputChange} className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs" />
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label className='block pixel-font text-xs mb-2 px-2'>
                                Address:
                                <input type="text" name="address" value={storeDetails.address} onChange={handleInputChange} className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 pixel-font text-xs" />
                            </label>
                        </div>
                    </div>

                    <button className='block w-full pixel-font text-sm hover:text-blue-400 py-2' type="submit">Submit Update</button>
                </form>
            )}
            {responseMessage && <p className="pixel-font text-xs mt-4">{responseMessage}</p>}
        </div>
    );
};

export default UpdateStore;
