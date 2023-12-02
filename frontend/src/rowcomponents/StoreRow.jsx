import React from "react";
const StoreRow = ({ store }) => {
    return (
        <tr>
        <td><h1 className="text-xs">{store.store_id}</h1></td>
        <td className="text-xs">{store.store_name}</td>
        <td className="text-xs">{store.website}</td>
        <td className="text-xs">{store.city}</td>
        <td className="text-xs">{store.address}</td>
        </tr>
    );
    }

export default StoreRow;