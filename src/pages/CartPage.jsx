import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link, } from "react-router-dom";
import axios from "axios";
const {
  getExpireDateFromDate
} = require('arifpay/lib/helper');

const CartPage = () => {
  
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const Checkout = async () => {
    const config = {
      headers: {
        "x-arifpay-key": "vYbDITI6j19eJZo0kBRIBPP6uLZ9jtIM",
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
    };
    const updatedCart = await cart.map(item => {
      const { id, ...rest } = item; 
      return rest; 
    });

    //console.log('updatedCart',updatedCart)
    const domainURL = "https://arifpay-frontend-sample.vercel.app";
    const date = new Date();
     date.setTime(date.getTime() + 10 * 3_600_000);
    const expired = getExpireDateFromDate(date);
      let amount = cart.map(e => e.price * e.quantity).reduce((e, c) => e + c)
    const body = {
      items: updatedCart,
      phone:"251980430777",
       email:"abeljo@gmail.com",
       notifyUrl: `${domainURL}`,
       beneficiaries: [{
         accountNumber: '1000262501447',
       bank: 'AWINETAA',
       amount: amount
       }, ],
       paymentMethods: ["TELEBIRR"],
       expireDate: expired,
       nonce: Math.floor(Math.random() * 10000).toString(),
       cancelUrl: `${domainURL}/notify`,
       errorUrl: `${domainURL}/error`,
       successUrl: `${domainURL}/success`
     };
     console.log(body)
    const res = await axios.post(
      "https://gateway.arifpay.org/api/checkout/session",
      body,
      config
    );

    const PaymentUrl = res.data.data.paymentUrl
    console.log(res.data)
    if(PaymentUrl){
      try {
        const headers = {
          "x-arifpay-key": "vYbDITI6j19eJZo0kBRIBPP6uLZ9jtIM",
          "Content-Type": "application/json",
          Accepts: "application/json",
        };
      
        const headerParams = Object.keys(headers).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(headers[key])).join('&');
       window.location.href = `${PaymentUrl}?${headerParams}`;
      } catch (error) {
        console.log(error)
      }
    }
    
   
  };

  return (
    <>
      <nav className="h-12 bg-green-400 flex items-center justify-between px-2">
        <h2 className="text-white px-9 text-[24px] font-[600]">Cart</h2>
        <Link to="/cart" className="text-white font-bold  px-9">
          Cart({cart.length})
        </Link>
      </nav>
      <div className="p-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex border-b-[3px] border-gray-300">
              <div
                
                className="p-4  "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12  h-12 mb-2"
                />
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.price}Br</p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center ">
              <button
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-2 py-1"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-2 py-1"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
            </div> </div>
            ))}
            
          </div>
        )}
        {cart.length > 0 && (
          <div className="flex px-3">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              onClick={Checkout}
              className="bg-green-700 ml-3 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
