import React from "react";
import ListGroupItem from "./listGroupItem";

const ListGroup = ({
   column,
   columnMedium,
   cart,
   onVolumeChange,
   onDelete,
}) => {
   const getClasses = () => {
      return "list-group text-center col-" + column + " col-md-" + columnMedium;
   };

   return (
      <ul className={getClasses()}>
         {cart &&
            cart.map((item) => {
               return (
                  <ListGroupItem
                     key={item.name}
                     item={item}
                     onVolumeChange={onVolumeChange}
                     onDelete={onDelete}
                  />
               );
            })}
      </ul>
   );
};

export default ListGroup;
