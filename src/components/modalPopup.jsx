import React from "react";
import Modal from "react-bootstrap/Modal";
import Increase from "./../common/increase";
import Decrease from "./../common/decrease";

const ModalPopup = ({
   popupItem,
   count,
   showPopup,
   hidePopup,
   onAddToCart,
   onIncrease,
   onDecrease,
}) => {
   const { image_url, name, tagline, abv, description, srm } = popupItem;

   const hideModal = () => {
      hidePopup();
   };

   return (
      <Modal show={showPopup} onHide={hideModal}>
         <Modal.Header className="d-flex align-content-center justify-content-around">
            <div className="row">
               <div className="col-12 text-center">
                  <img src={image_url} className="popup-image" alt={name} />
               </div>
               <div className="col-12">
                  <Modal.Title>
                     <h4 className="text-center">{name}</h4>
                  </Modal.Title>
               </div>
            </div>
         </Modal.Header>
         <Modal.Body className="text-center" scrollable="true">
            <p>
               <em>{tagline}</em>
            </p>
            Abv: {abv}
            <p>{description}</p>
         </Modal.Body>
         <Modal.Footer className="d-flex justify-content-between">
            <p>Price: {srm}$</p>

            <Increase onClick={onIncrease} />
            <p>{count}</p>
            <Decrease onClick={onDecrease} />

            <button className="btn btn-success" onClick={onAddToCart}>
               Add to Cart
            </button>
            <button className="btn btn-secondary" onClick={hideModal}>
               Cancel
            </button>
         </Modal.Footer>
      </Modal>
   );
};

export default ModalPopup;
