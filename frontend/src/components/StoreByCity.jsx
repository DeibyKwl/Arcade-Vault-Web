import React, { useState } from 'react';
import axios from 'axios';
import StoreRow from '../rowcomponents/StoreRow';
import StoreTableHeader from '../rowcomponents/StoreTableHeader';

const StoreByCity = () => {
    const [city, setCity] = useState('');
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const searchStoreByCity = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/store_by_city', { params: { store_city: city } });
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
            <h1>Search Store by City</h1>
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city name"
                className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center"
            />
            <button className="pixel-font" onClick={searchStoreByCity}>Search</button>

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
            {stores.length === 0 && !isLoading && <p>No stores found for the given city.</p>}
        </div>
    );
};

export default StoreByCity;
