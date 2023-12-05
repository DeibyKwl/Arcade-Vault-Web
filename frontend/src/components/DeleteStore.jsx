import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import StoreRow from '../rowcomponents/StoreRow';
import StoreTableHeader from '../rowcomponents/StoreTableHeader';

const DeleteStore = () => {
    const [stores, setStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStores = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/all_stores');
                setStores(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchStores();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };



    const handleDelete = async (store_id) => {
        if (window.confirm("Are you sure you want to delete this store?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/delete_store/${store_id}`);
                console.log('Delete response:', response);
                setStores(stores.filter(store => store.store_id !== store_id));
            } catch (error) {
                console.error('Error deleting store:', error);
                console.error('Error response:', error.response);
            }
        }
    };
    

    const filteredStores = searchTerm
        ? stores.filter(store =>
            Object.values(store).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : stores;

    return (
        <div>
            {loading ? <p>Loading stores...</p> : (
                <div className='flex flex-col items-center'>
                    <h1 className='pb-2'>Delete Stores</h1>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search stores..."
                        className="p-2 bg-white text-black border-gray-300 pixel-font text-xs w-80 text-center"
                    />
                    <div className='scrollable-container' style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                        <table className="min-w-full fixed-layout-table">
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
                                            <button className="pixel-font very-small-text text-center hover:text-blue-400" onClick={() => handleDelete(store.store_id)}>
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            )}
            {/* {reponseMessage && <p>{responseMessage}</p>} */}
        </div>
    );
};

export default DeleteStore;
