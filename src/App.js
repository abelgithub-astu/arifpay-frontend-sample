import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./CartContext";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route exact path="/" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
