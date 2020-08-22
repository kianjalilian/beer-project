import React, { Component } from "react";
import ListGroup from "../common/listGroup";
import CheckoutCard from "../common/checkoutCard";
import "./shoppingCartPage.css";

class ShoppingCartPage extends Component {
   state = { shoppingCart: [] };

   componentDidMount() {
      let shoppingCart;
      if (localStorage.getItem("ShoppingCart") === "") {
         shoppingCart = [];
      } else {
         shoppingCart = JSON.parse(localStorage.getItem("ShoppingCart"));
      }
      window.scrollTo(0, 0);
      this.checkCartExpiration();
      this.setState({ shoppingCart });
   }

   checkCartExpiration = () => {
      const cartDuration = 1000 * 60 * 60 * 24 * 7;
      const currentTime = new Date().getTime();
      const cartLastUpdate = localStorage.getItem("cartUpdateTime");
      console.log(currentTime - cartLastUpdate);
      if (currentTime - cartLastUpdate > cartDuration) {
         localStorage.removeItem("cartLastUpdate");
         localStorage.removeItem("ShoppingCart");
      }
   };

   handleVolumeChange = (item, order) => {
      const time = new Date().getTime();
      localStorage.setItem("cartUpdateTime", time);
      const newShoppingCart = [...this.state.shoppingCart];
      const index = newShoppingCart.indexOf(item);
      if (order === "asc") {
         newShoppingCart[index].count += 1;
      } else {
         const count = newShoppingCart[index].count;
         newShoppingCart[index].count = count > 1 ? count - 1 : 1;
      }
      localStorage.setItem("ShoppingCart", JSON.stringify(newShoppingCart));
      this.setState({ shoppingCart: newShoppingCart });
   };

   handleDelete = (item) => {
      const time = new Date().getTime();
      localStorage.setItem("cartUpdateTime", time);
      const shoppingCart = [...this.state.shoppingCart];
      const newShoppingCart = shoppingCart.filter((i) => i.name !== item.name);
      localStorage.setItem("ShoppingCart", JSON.stringify(newShoppingCart));
      this.setState({ shoppingCart: newShoppingCart });
   };

   render() {
      const { shoppingCart } = this.state;
      return (
         <React.Fragment>
            <div className="container my-4">
               <div className="row">
                  <ListGroup
                     column="12"
                     columnMedium="8"
                     cart={shoppingCart}
                     onVolumeChange={this.handleVolumeChange}
                     onDelete={this.handleDelete}
                  />
                  <CheckoutCard
                     column="12"
                     columnMedium="4"
                     cart={shoppingCart}
                  />
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default ShoppingCartPage;
