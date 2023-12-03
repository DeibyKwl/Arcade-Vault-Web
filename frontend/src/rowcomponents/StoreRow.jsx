import React from "react";
const StoreRow = ({ store }) => {
    return (
        <tr>
        <td className="pixel-font text-xs">{store.store_id}</td>
        <td className="text-xs">{store.store_name}</td>
        <td className="text-xs">{store.website}</td>
        <td className="text-xs">{store.city}</td>
        <td className="text-xs">{store.address}</td>
        </tr>
    );
    }

export default StoreRow;