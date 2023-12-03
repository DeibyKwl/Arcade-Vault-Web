import React, { useState } from 'react';
import axios from 'axios';
import StoreRow from '../rowcomponents/StoreRow'; // Adjust the path as needed
import StoreTableHeader from '../rowcomponents/StoreTableHeader'; // Adjust the path as needed

const StoreByAddress = () => {
    const [address, setAddress] = useState('');
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const searchStoreByAddress = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/store_by_address', { params: { store_address: address } });
            const storeData = response.data.map(([storeId, storeName, website, city, address]) => ({
                store_id: storeId,
                store_name: storeName,
                website: website,
                city: city,
                address: address
            }));
            setStores(storeData);
        } catch (err) {
            console.error('Error fetching stores: ', err);
            setError('Failed to fetch store details');
            setStores([]);
        }
        setIsLoading(false);
    };

    return (

        <div className="pixel-font flex flex-col items-center">
            <h1>Search Store by Address</h1>
            <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter store address"
                className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center"

            />
          <button onClick={searchStoreByAddress} className='pixel-font animate-blink-slow red-orange-gradient-text'> 🔎 Search </button> {/* Remove text-center class from the button */}

            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {stores.length > 0 && (
                <div className="pt-2 scrollable-container w-full">
                    <table className="min-w-full">
                        <StoreTableHeader />
                        <tbody>
                            {stores.map(store => (
                                <StoreRow key={store.store_id} store={store} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {stores.length === 0 && !isLoading && <p>No stores found for the given address.</p>}
        </div>

    );
};

export default StoreByAddress;
