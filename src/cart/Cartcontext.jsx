import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add or update an item in the cart
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = { ...updatedCartItems[existingItemIndex], quantity: item.quantity };
      setCartItems(updatedCartItems);
    } else {
      // If the item doesn't exist, add it to the cart
      setCartItems([...cartItems, item]);
    }
  };

  // Remove an item from the cart
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem._id !== item._id);
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
