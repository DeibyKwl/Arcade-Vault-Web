import React from "react";
const StoreRow = ({ store }) => {
    return (
        <tr>
        <td className="pixel-font text-xs text-center">{store.store_id}</td>
        <td className="pixel-font very-small-text text-center">{store.store_name}</td>
        <td className="pixel-font very-small-text text-center">{store.website}</td>
        <td className="pixel-font very-small-text text-center">{store.city}</td>
        <td className="pixel-font very-small-text text-center">{store.address}</td>
        </tr>
    );
    }

export default StoreRow;