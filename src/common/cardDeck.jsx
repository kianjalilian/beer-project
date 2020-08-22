import React from "react";
import Card from "./card";

const CardDeck = ({ items, columnLarge, column, onCardClick, onLikeClick }) => {
   function getClasses() {
      const part1 = "row-cols-" + column;
      const part2 = " row-cols-lg-" + columnLarge;
      return "text-center row " + part1 + part2;
   }

   return (
      <div className={getClasses()}>
         {items.map((item) => {
            return (
               <Card
                  key={item.id}
                  item={item}
                  onCardClick={onCardClick}
                  onLikeClick={onLikeClick}
               />
            );
         })}
      </div>
   );
};

export default CardDeck;
