import React from "react";

const Remove = ({ onClick }) => {
   return (
      <i
         onClick={onClick}
         style={{ cursor: "pointer" }}
         className="fa fa-times"
      ></i>
   );
};

export default Remove;
