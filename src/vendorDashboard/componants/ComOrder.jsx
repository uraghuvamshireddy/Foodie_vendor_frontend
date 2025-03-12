import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apipath";

const ComOrder = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompletedOrders = async () => {
    const firmId = localStorage.getItem("firmId");
    if (!firmId) {
      setError("Firm ID not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/order/view-order/${firmId}`);
      if (!response.ok) throw new Error("Failed to fetch completed orders");

      const data = await response.json();
      setCompletedOrders(data.orders?.filter((order) => order.completed) || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Completed Orders</h2>

      {loading && <p>Loading completed orders...</p>}
      {error && <p className="error">{error}</p>}
      {completedOrders.length === 0 && !loading && !error && <p>No completed orders.</p>}

      {completedOrders.length > 0 && (
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
              </tr>
            </thead>
            <tbody>
              {completedOrders.map((order) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComOrder;
