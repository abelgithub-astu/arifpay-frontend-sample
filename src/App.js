import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./CartContext";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";
import NotifyPage from "./pages/NotifyPage";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route exact path="/" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/notify" element={<NotifyPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
