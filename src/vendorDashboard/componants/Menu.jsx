import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apipath';
import { useParams } from "react-router-dom";
import { useCart } from '../../cart/Cartcontext';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const { firmId } = useParams();
  const [products, setProducts] = useState([]);
  const {addToCart,cartItems} = useCart()
  const fid = localStorage.getItem('firmId');
  const productsHandler = async () => {
    // const firmId = localStorage.getItem('firmId');
    console.log('Fetching products for firmId:', firmId);
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      console.log('Fetched products:', newProductsData); 
      if (newProductsData && newProductsData.products) {
        setProducts(newProductsData.products); 
      } else {
        console.error('No products data found.');
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    productsHandler();
    console.log('useEffect triggered');
  }, []);

  const firmName = localStorage.getItem('firmName');
  console.log('Firm Name:', firmName);

  const vegProducts = products.filter(item => 
   item.category.includes('veg')
  );
  
  const nonVegProducts = products.filter(item => 
  item.category.includes('non-veg')
  );

  return (
    <div className="menu-container">
     <div className="">
     <h2 className="name">{firmName}</h2>
     <NavLink to={`/${fid}/menu/cart`}>
  <div className="cart">Items Added</div>
</NavLink>
     </div>

      {/* Veg Table */}
      {vegProducts.length === 0 ? (
        <p className="no-products">No veg products available</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Veg Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {vegProducts.map((item) => {
              console.log('Veg Item Category:', item.category);
              return (
                <tr key={item._id}>
                  <td className="product-name">{item.productName}</td>
                  <td className="product-price">₹{item.price}</td>
                  <td className="product-image">
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        className="product-img"
                      />
                    )}
                  </td>
                  <td><button onClick={()=>addToCart(item)}>Add</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Non-Veg Table */}
      {nonVegProducts.length === 0 ? (
        <p className="no-products">No non-veg products available</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Non-Veg Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {nonVegProducts.map((item) => {
              console.log('Non-Veg Item Category:', item.category);
              return (
                <tr key={item._id}>
                  <td className="product-name">{item.productName}</td>
                  <td className="product-price">₹{item.price}</td>
                  <td className="product-image">
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        className="product-img"
                      />
                    )}
                  </td>
                  <td><button onClick={()=>addToCart(item)}>Add</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Menu;
