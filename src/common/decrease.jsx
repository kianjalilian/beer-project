import React from "react";

const Decrease = ({ onClick }) => {
   return (
      <i
         onClick={onClick}
         style={{ cursor: "pointer" }}
         className="fa fa-angle-down"
      ></i>
   );
};

export default Decrease;
