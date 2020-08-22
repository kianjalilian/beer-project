import React from "react";

const CheckoutCard = ({ column, columnMedium, cart }) => {
   const getClasses = () => {
      return "my-4 my-md-0 col-" + column + " col-md-" + columnMedium;
   };

   const getTotalPrice = (shoppingCart) => {
      let total = 0;
      if (shoppingCart === null) return 0;
      for (let item of shoppingCart) {
         total += item.price * item.count;
      }
      return total;
   };

   return (
      <div className={getClasses()}>
         <div className="card bg-light mb-3">
            <div className="card-header text-white bg-dark">Checkout</div>
            <div className="card-body">
               <p className="card-text">
                  By placing your order, you agree to
                  <a href="#"> Delivery Terms</a>
               </p>
               <h5 className="card-title">Order Summary</h5>

               {cart &&
                  cart.map((item) => {
                     return (
                        <div key={item.name} className="row my-4 card-text">
                           <div className="col-6">{item.name}</div>
                           <div className="col-3">{item.count}</div>
                           <div className="col-3">{item.price}</div>
                        </div>
                     );
                  })}
            </div>
            <div className="card-footer">
               Total : {getTotalPrice(cart)} $
               <button className="btn btn-success card-text float-right">
                  Submit Order
               </button>
            </div>
         </div>
      </div>
   );
};

export default CheckoutCard;
