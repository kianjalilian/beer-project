import React from "react";

const SortDeck = ({ sorts, count, activeSort, onClick }) => {
   const getClasses = (sort) => {
      return sort === activeSort ? "nav-link active" : "nav-link";
   };

   const getSortString = (sort) => {
      if (sort.path === "name") {
         return sort.order === "asc" ? "name Ascending" : "name Descending";
      } else {
         return sort.order === "asc" ? "abv Ascending" : "abv Descending";
      }
   };

   return (
      <nav className="nav nav-pills my-4">
         <a className="nav-link disabled">{count} results found. Sort by : </a>
         {sorts.map((sort) => {
            return (
               <a
                  key={sort.path + sort.order}
                  href="#"
                  className={getClasses(sort)}
                  onClick={() => onClick(sort)}
               >
                  {getSortString(sort)}
               </a>
            );
         })}
      </nav>
   );
};

export default SortDeck;
