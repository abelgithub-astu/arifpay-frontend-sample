import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const checkCartProduct = (product) => {
    const found = cart.find((item) => item.id === product.id);
    if (found) {
      return true;
    }
    return false;
  };

  const products = [
    {
      id: 1,
      name: "Banana",
      price: 12,
      quantity: 1,
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400",
    },
    {
      id: 2,
      name: "Mangoo",
      price: 21,
      quantity: 1,
      image: "https://ichef.bbci.co.uk/images/ic/1920x1080/p06hk0h6.jpg",
    },
    {
      id: 3,
      name: "Papaya",
      price: 27,
      quantity: 1,
      image:
        "https://www.heart.org/-/media/Images/News/2023/October-2023/1013EIOLIPapaya_SC.jpg",
    },
    {
      id: 4,
      name: "Apple",
      price: 37,
      quantity: 1,
      image:
        "https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg",
    },
    // Add more products as needed
  ];

  return (
    <div>
      <nav className="h-12 bg-green-400 flex items-center justify-between px-2">
        <h2 className="text-white px-9 text-[24px] font-[600]">Products</h2>
        <Link to="/cart" className="text-white font-bold px-9">
          Cart ({cart.length})
        </Link>
      </nav>
      <div className="flex flex-wrap bg-gray-100 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white w-[350px]  p-4 m-2 rounded-lg shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-md h-[250px] mb-2"
            />
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-gray-600">{product.price}Br</p>
            <div>
              {checkCartProduct(product) ? (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
