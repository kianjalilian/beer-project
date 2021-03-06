import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
   return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
         <Link className="navbar-brand" to="/">
            Beers
         </Link>
         <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
         >
            <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
               <NavLink className="nav-item nav-link" to="/all-beers">
                  All beers
               </NavLink>
               <NavLink className="nav-item nav-link" to="/pizza-beers">
                  Pizza beers
               </NavLink>
               <NavLink className="nav-item nav-link" to="/steak-beers">
                  Steak beers
               </NavLink>
               <NavLink className="nav-item nav-link" to="/favorite-beers">
                  Favorite beers
               </NavLink>
               <NavLink className="nav-item nav-link" to="/shopping-cart">
                  Shopping Cart
               </NavLink>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
