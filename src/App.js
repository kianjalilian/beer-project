import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import ShowBeers from "./components/showBeers";
import ShoppingCartPage from "./components/shoppingCartPage";

class App extends Component {
   render() {
      return (
         <React.Fragment>
            <NavBar />
            <main className="container">
               <Switch>
                  {/* <Route path="/not-found" component={} /> */}
                  <Route path="/shopping-cart" component={ShoppingCartPage} />
                  <Route
                     path="/favorite-beers"
                     render={(props) => (
                        <ShowBeers
                           {...props}
                           food={"all"}
                           showFavorite={true}
                        />
                     )}
                  />
                  <Route
                     path="/pizza-beers"
                     render={(props) => (
                        <ShowBeers
                           {...props}
                           food={"pizza"}
                           showFavorite={false}
                        />
                     )}
                  />
                  <Route
                     path="/steak-beers"
                     render={(props) => (
                        <ShowBeers
                           {...props}
                           food={"steak"}
                           showFavorite={false}
                        />
                     )}
                  />
                  <Route
                     path="/all-beers"
                     render={(props) => (
                        <ShowBeers
                           {...props}
                           food={"all"}
                           showFavorite={false}
                        />
                     )}
                  />
                  <Redirect from="/" exact to="/all-beers" />
                  <Redirect to="not-found" />
               </Switch>
            </main>
         </React.Fragment>
      );
   }
}

export default App;
