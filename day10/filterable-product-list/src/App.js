import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import CartPage from "./components/CartPage";
import "./App.css"; // Import the CSS file for styling

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Set the product data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Optimized filtering with useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Optimized clear button with useCallback
  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <header className="header">
          <h1>Filterable Product List</h1>
          <div className="cart-button-container">
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <button className="cart-button">
                🛒 Go to Cart
              </button>
            </Link>
          </div>
        </header>
        <Routes>
          <Route exact path="/" element={
            <>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} clearSearch={clearSearch} />
              <h3>Count of Products: {filteredProducts.length}</h3>
              <ProductList products={filteredProducts} addToCart={addToCart} />
            </>
          } />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;