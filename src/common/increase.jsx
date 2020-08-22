import React from "react";

const Increase = ({ onClick }) => {
   return (
      <i
         onClick={onClick}
         style={{ cursor: "pointer" }}
         className="fa fa-angle-up"
      ></i>
   );
};

export default Increase;
