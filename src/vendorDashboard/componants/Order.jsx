import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apipath";

const Order = ({ onOrderComplete }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    const firmId = localStorage.getItem("firmId");
    if (!firmId) {
      setError("Firm ID not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/order/view-order/${firmId}`);
      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data.orders?.filter((order) => !order.completed) || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markCompleted = async (orderId) => {
    try {
      await fetch(`${API_URL}/order/mark-completed/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });

      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      onOrderComplete();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Active Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}
      {orders.length === 0 && !loading && !error && <p>No active orders.</p>}

      {orders.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Delivery Type</th>
                <th>Address/Table</th>
                <th>Payment</th>
                <th>Total Price</th>
                <th>Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.deliveryType}</td>
                  <td>{order.addressorTable}</td>
                  <td>{order.paymentOption}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} - ₹{item.price} x {item.quantity || 1}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button className="button-complete" onClick={() => markCompleted(order._id)}>
                      Mark as Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
