import { getNodeText } from "@testing-library/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux"; //Hook for getting data from store
import { remove } from "../store/cartSlice";

function Cart() {
  const dispatch = useDispatch(); //function to change state in store
  const products = useSelector((state) => state.cart); //subscribing to data

  //to remove item from cart
  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  return (
    <div>
      <h3>Cart</h3>
      <div className="cartWrapper">
        {products.map((product) => (
          <div key={product.id} className="cartCard">
            <img src={product.image} alt="" />
            <h5>{product.title}</h5>
            <h5>{product.price}</h5>
            <button className="btn" onClick={() => handleRemove(product.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
