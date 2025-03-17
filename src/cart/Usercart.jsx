import React, { useState } from 'react';
import { useCart } from './Cartcontext';
import { API_URL } from '../vendorDashboard/data/apipath';
import { jsPDF } from 'jspdf';
import { useParams } from 'react-router-dom';

function Usercart() {
  const {id} = useParams();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    phoneNumber: '',
    deliveryType: '',
    addressorTable: '',
    paymentOption: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value,
    });
  };

  const generatePDF = (orderDetails) => {
    const doc = new jsPDF();
    const firmName = localStorage.getItem('firmname');
    console.log(firmName);
    const { name, phoneNumber, deliveryType, addressorTable, paymentOption, items, totalPrice } = orderDetails;

    const date = new Date().toLocaleString();
    
    doc.setFontSize(14);
    doc.text(`Firm: ${firmName}`, 10, 10);
    doc.text(`Date: ${date}`, 10, 20);
    doc.text(`Name: ${name}`, 10, 30);
    doc.text(`Phone: ${phoneNumber}`, 10, 40);
    doc.text(`Delivery Type: ${deliveryType}`, 10, 50);
    doc.text(`Address/Table: ${addressorTable}`, 10, 60);
    doc.text(`Payment: ${paymentOption}`, 10, 70);

    doc.setFontSize(12);
    doc.text("Items Ordered:", 10, 80);
    let y = 90;  

    doc.setFontSize(10);
    doc.text("Item Name", 10, y);
    doc.text("Qty", 80, y);
    doc.text("Price", 120, y);
    doc.text("Total", 160, y);
    doc.line(10, y + 2, 200, y + 2);  
    y += 10;

    items.forEach((item) => {
      const { productName, price } = item;
      const quantity = item.quantity || 1;  
      const totalItemPrice = price * quantity;
  
      doc.text(productName, 10, y);
      doc.text(quantity.toString(), 80, y);
      doc.text(`₹${price}`, 120, y);
      doc.text(`₹${totalItemPrice}`, 160, y);
      y += 10;
  });

    doc.line(10, y, 200, y);
    y += 10;

    doc.text(`Total Price: ₹${totalPrice.toFixed(2)}`, 10, y);

    doc.save(`Bill-${date}.pdf`);
};


  const handleSubmitOrder = async () => {

    if (!id) {
      console.error("user not authenticated");
      return;
    }

    const orderDetails = {
      ...personalDetails,
      items: cartItems,
      totalPrice: calculateTotalPrice(),
    };

    try {
      const response = await fetch(`${API_URL}/order/add-order/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Order placed successfully!');
        generatePDF(orderDetails);
        setPersonalDetails({
          name: '',
          phoneNumber: '',
          deliveryType: '',
          addressorTable: '',
          paymentOption: '',
        });
        setShowDetailsForm(false);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
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
            <button
              className="order-btn"
              onClick={() => setShowDetailsForm(true)} 
            >
              Order
            </button>
          </div>

          {showDetailsForm && (
            <div className="order-details-form">
              <div className="form-container">
                <h3>Enter Your Details</h3>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={personalDetails.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phoneNumber"
                    value={personalDetails.phoneNumber}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Delivery Type:
                  <select
                    name="deliveryType"
                    value={personalDetails.deliveryType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Delivery Type</option>
                    <option value="In Restaurent">In Restaurent</option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                    
                  </select>
                </label>
                <label>
                  Address/Table:
                  <input
                    type="text"
                    name="addressorTable"
                    value={personalDetails.addressorTable}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Payment Option:
                  <select
                    name="paymentOption"
                    value={personalDetails.paymentOption}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Payment Option</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    
                  </select>
                </label>
                <button onClick={handleSubmitOrder}>Submit Order</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Usercart;
