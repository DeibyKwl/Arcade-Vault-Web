import React, { useState, useEffect } from 'react'
import axios from 'axios'

// this will be how we get a list of all stores in our arcade database
// we will also have a search bar to search for a specific store
const StoreList = () => {
    const [stores, setStores] = useState([])
    
    useEffect(() => {
        const fetchStores = async () => {
        const { data } = await axios.get('/api/stores')
        setStores(data)
        }
        fetchStores()
    }, [])
    
    return (
        <div>
        <h1>Store List</h1>
        <ul>
            {stores.map(store => (
            <li key={store.id}>
                <a href={`/stores/${store.id}`}>{store.name}</a>
            </li>
            ))}
        </ul>
        </div>
    )
    }
    