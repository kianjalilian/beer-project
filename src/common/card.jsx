import React from "react";
import Like from "./like";
import "./card.css";

const Card = ({ item, onCardClick, onLikeClick }) => {
   const { image_url, name, tagline, liked } = item;
   return (
      <div className="col mb-4">
         <div className="card h-100">
            <img
               src={image_url}
               className="card-image card-img-top mx-auto mt-3"
               alt={name}
            />
            <div className="card-body">
               <h5 className="card-title">{name}</h5>
               <p className="card-text">{tagline}</p>
            </div>
            <div className="card-footer d-flex justify-content-around align-items-center">
               <button
                  className="btn btn-primary"
                  onClick={() => onCardClick(item)}
               >
                  More Information
               </button>
               <Like liked={liked} onClick={() => onLikeClick(item)} />
            </div>
         </div>
      </div>
   );
};

export default Card;
