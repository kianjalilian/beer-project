import React from "react";
import Increase from "./../common/increase";
import Decrease from "./../common/decrease";
import Remove from "../common/remove";

const HorizontalCard = ({ item, onVolumeChange, onDelete }) => {
   return (
      <div className="row no-gutters d-flex align-items-center ">
         <div className="col-md-2">
            <img
               src={item.image_url}
               key={item.name}
               className="card-img shopping-image"
               alt={item.name}
            />
         </div>
         <div className="col-md-6">
            <div className="card-body">
               <h5 className="card-title">{item.name}</h5>
               <p className="card-text">
                  You have {item.count} of this product.
               </p>
            </div>
         </div>
         <div className="col-6 col-md-2 text-center">
            <Increase onClick={() => onVolumeChange(item, "asc")} />
            <p className="m-0">{item.count}</p>
            <Decrease onClick={() => onVolumeChange(item, "desc")} />
         </div>
         <div className="col-6 col-md-2">
            <Remove onClick={() => onDelete(item)} />
         </div>
      </div>
   );
};

export default HorizontalCard;
