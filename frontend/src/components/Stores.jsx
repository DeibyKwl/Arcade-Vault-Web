import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//I want to import storeList from the storeList.jsx file
import StoreList from './StoreList.jsx';

// we want to display storeList on the page
const Stores = () => {
  // Your Stores component logic here

  return (
    <div>
      <StoreList />
    </div>
  );
};


export default Stores