import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apipath';
import { useParams, NavLink } from "react-router-dom";
import { useCart } from '../../cart/Cartcontext';

const Menu = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [firmName, setfirmName] = useState("");
  const { addToCart } = useCart();

  const productsHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${id}/products`);
      const newProductsData = await response.json();
      if (newProductsData?.restaurentName) setfirmName(newProductsData.restaurentName);
      if (newProductsData?.products) setProducts(newProductsData.products);
    } catch (error) {
      console.error('Failed to fetch products', error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  localStorage.setItem('firmname', firmName);

  const vegProducts = products.filter(item => item.category.includes('veg'));
  const nonVegProducts = products.filter(item => item.category.includes('non-veg'));

  const renderCard = (item) => (
    <div key={item._id} className="card">
      <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} className="card-img" />
      <div className="card-content">
        <h4>{item.productName}</h4>
        <p>₹{item.price}</p>
        <button onClick={() => addToCart(item)}>Add</button>
      </div>
    </div>
  );

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>{firmName}</h2>
        <NavLink to={`/${id}/menu/cart`}>
          <button className="cart-button">Items Added</button>
        </NavLink>
      </div>

      <h3>Veg Items</h3>
      <div className="card-grid">
        {vegProducts.length > 0 ? vegProducts.map(renderCard) : <p>No veg products available</p>}
      </div>

      <h3>Non-Veg Items</h3>
      <div className="card-grid">
        {nonVegProducts.length > 0 ? nonVegProducts.map(renderCard) : <p>No non-veg products available</p>}
      </div>
    </div>
  );
};

export default Menu;
