import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //hook for dispatching action
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";

function Products() {
  const dispatch = useDispatch(); //getting dispatch function from useDispatch
  const { data: products, status } = useSelector((state) => state.product);
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    //Making api req using thunk
    dispatch(fetchProducts());

    // const fetchProducts = async () => {
    //   // fetching products from url
    //   const response = await fetch("https://fakestoreapi.com/products");
    //   //converting string response to json
    //   const data = await response.json();
    //   console.log(data);
    //   setProducts(data);
    // };
    // fetchProducts();
  }, []);

  //function for adding product to store
  const handleAdd = (product) => {
    dispatch(add(product)); //calling dispatch function to add product
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading.....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong :/</h2>;
  }

  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button onClick={() => handleAdd(product)} className="btn">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
