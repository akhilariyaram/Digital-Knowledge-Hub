import React, { useState,useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FaCartPlus, FaCheck, FaTrash, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../chat/src/context/AuthContext";
import P1 from '../../assets/1.jpeg';
import P2 from '../../assets/2.jpeg';
import P3 from '../../assets/3.jpeg';
import S1 from '../../assets/S1.jpeg';
import S2 from '../../assets/S2.jpeg';
import C1 from '../../assets/C1.jpeg';
import C2 from '../../assets/C2.jpeg';
import C3 from '../../assets/C3.jpeg';
import C4 from '../../assets/C4.jpeg';
import C5 from '../../assets/C5.jpeg';
import C6 from '../../assets/C6.jpeg';
import C7 from '../../assets/C7.jpeg';
import C8 from '../../assets/C8.jpeg';
import F1 from '../../assets/F1.jpeg';
import F2 from '../../assets/F2.jpeg';
import F3 from '../../assets/F3.jpeg';
import Login_main from '../Login/Login_main';

const Market = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Login_main />
  }
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedOption, setSelectedOption] = useState("buy");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedCategory("All"); 
  };

  const items = [
    { id: 1, name: "Onion Seeds", price: 10, category: "Seeds", image: S1 },
    { id: 2, name: "Fertilizers 1", price: 20, category: "Fertilizers", image: F1 },
    { id: 3, name: "Pesticides 1", price: 15, category: "Pesticides", image: P1 },
    { id: 4, name: "Grass Seeds", price: 10, category: "Seeds", image: S2 },
    { id: 5, name: "Fertilizers 2", price: 20, category: "Fertilizers", image: F2 },
    { id: 6, name: "Pesticides 2", price: 15, category: "Pesticides", image: P2 },
    { id: 7, name: "Fertilizers 3", price: 20, category: "Fertilizers", image: F3 },
    { id: 8, name: "Pesticides 3", price: 15, category: "Pesticides", image: P3 },
    // Add more products here
  ];

  const items_crop = [
    { id: 1, name: "Onion", price: 30, category: "Crops", image: C1 },
    { id: 2, name: "Potato", price: 50, category: "Crops", image: C2 },
    { id: 3, name: "Pea", price: 40, category: "Crops", image: C3 },
    { id: 4, name: "Wheat", price: 50, category: "Crops", image: C4 },
    { id: 5, name: "Rice", price: 35, category: "Crops", image: C5 },
    { id: 6, name: "Spinach", price: 45, category: "Crops", image: C6 },
    { id: 7, name: "Cauliflower", price: 50, category: "Crops", image: C7 },
    { id: 8, name: "Carrot", price: 45, category: "Crops", image: C8 },
  ];

  const addToCart = (item) => {
    const updatedItem = { ...item, addedToCart: true };
    setCartItems((prevCartItems) => [...prevCartItems, updatedItem]);
    setTimeout(() => {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, addedToCart: false } : cartItem
        )
      );
    }, 2000);
  };

  const removeFromCart = (item) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    items.forEach((item) => (item.addedToCart = false));
  };

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const categories = selectedOption === "sell" ? ["Crops"] : ["All", "Seeds", "Fertilizers", "Pesticides"];

  const filterItemsByCategory = (category) => {
    let selectedItems = selectedOption === "sell" ? items_crop : items;

    if (category === "All") {
      return selectedItems;
    } else {
      return selectedItems.filter((item) => item.category === category);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-primary min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center"
                onClick={toggleCart}
              >
                <FaCartPlus className="mr-2" />
                <span className="font-semibold">{cartItems.length}</span>
              </button>
            </div>

            <div className="flex gap-4">
              <button
                className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center ${selectedOption === "buy" ? "bg-blue-600" : ""}`}
                onClick={() => handleOptionChange("buy")}
              >
                Buy
              </button>
              <button
                className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center ${selectedOption === "sell" ? "bg-green-600" : ""}`}
                onClick={() => handleOptionChange("sell")}
              >
                Sell
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold mb-6 text-center">Marketplace</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <div className=""></div>
            {categories.map((category) => (
              <button
                key={category}
                className={`py-2 px-4 rounded-lg ${category === selectedCategory ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {filterItemsByCategory(selectedCategory).map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg"
              >
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
                  <p className="text-gray-600">Rs. {item.price}</p>
                </div>
                {item.addedToCart ? (
                  <div className="flex items-center text-green-500">
                    <FaCheck className="mr-2" />
                    Added to Cart
                  </div>
                ) : (
                  <>
                    {selectedOption === "buy" && (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                    {selectedOption === "sell" && (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
                        onClick={() => addToCart(item)}
                      >
                        Sell Item
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Cart</h3>
              <button className="text-gray-500" onClick={toggleCart}>
                <FaTimes />
              </button>
            </div>
            {cartItems.length > 0 ? (
              <>
                <ul className="mb-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b border-gray-200 py-4"
                    >
                      <div>
                        <h4 className="text-lg font-semibold">{item.name}</h4>
                        <p className="text-gray-600">Rs. {item.price}</p>
                      </div>
                      <button className="text-red-500" onClick={() => removeFromCart(item)}>
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center scroll-smooth">
                  <p className="font-bold">Total: Rs. {calculateTotal()}</p>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-4">
                    <p className="">Proceed to Payment</p>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-20">
                <p className="text-gray-500">Your cart is empty.</p>
              </div>
            )}
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Market;

