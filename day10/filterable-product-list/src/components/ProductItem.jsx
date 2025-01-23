import React from "react";

const ProductItem = ({ product, addToCart }) => {
  return (
    <div style={{ margin: "10px 0", padding: "10px", border: "1px solid #ddd" }}>
      <h4>{product.title}</h4>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;