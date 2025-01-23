import React from "react";
import { Link } from "react-router-dom";

const CartPage = ({ cart, removeFromCart }) => {
  return (
    <div>
      <h1>Cart</h1>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <button style={{ fontSize: "20px" }}>
          🔙 Back to Products
        </button>
      </Link>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.title}
            <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;