import React from "react";
import HorizontalCard from "./horizontalCard";

const ListGroupItem = ({ item, onVolumeChange, onDelete }) => {
   return (
      <li
         key={item.name}
         style={{ minHeight: "12rem" }}
         className="list-group-item bg-light"
      >
         <HorizontalCard
            item={item}
            onVolumeChange={onVolumeChange}
            onDelete={onDelete}
         />
      </li>
   );
};

export default ListGroupItem;
