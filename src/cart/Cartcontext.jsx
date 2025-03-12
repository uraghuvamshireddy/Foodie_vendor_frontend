import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);
  
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: item.quantity,
      };
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...item,
          quantity: item.quantity || 1, 
        },
      ]);
    }
  };
  

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
