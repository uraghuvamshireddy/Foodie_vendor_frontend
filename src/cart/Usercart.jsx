import React from 'react';
import { useCart } from './Cartcontext';

function Usercart() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const handleQuantityChange = (item, quantity) => {
    if (quantity <= 0) {
      removeFromCart(item);
    } else {
      const existingItem = cartItems.find(cartItem => cartItem._id === item._id);

      if (existingItem) {
        addToCart({ ...existingItem, quantity });
      } else {
        addToCart({ ...item, quantity });
      }
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1)); 
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="cart-container">
      <h2 className="cart-title">Order Items</h2>
      {cartItems.length === 0 ? (
        <h3 className="empty-cart">Your Cart is Empty</h3>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="product-name">{item.productName}</td>
                    <td className="product-price">₹{item.price}</td>
                    <td className="quantity">
                      <input
                        type="number"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(item, parseInt(e.target.value) || 1)
                        }
                        min="1"
                        className="quantity-input"
                      />
                    </td>
                    <td className="total-price">
                      ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                    </td>
                    <td className="remove-btn">
                      <button
                        onClick={() => removeFromCart(item)}
                        className="remove"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3 className="total-price-label">Total Price: ₹{totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usercart;

