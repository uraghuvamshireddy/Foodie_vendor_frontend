import React,{useState, useEffect} from 'react'
import { API_URL } from '../data/apipath';

const AllProducts = () => {
    const [products, setProducts]= useState([]);

    const productsHandler = async()=>{
            const firmId = localStorage.getItem('firmId');
        try {
                const response = await fetch(`${API_URL}/product/${firmId}/products`);
                const newProductsData = await response.json();
                setProducts(newProductsData.products);
                console.log(newProductsData);
        } catch (error) {
            console.error("failed to fetch products", error);
            alert('failed to fetch products')
        }
    }

    useEffect(()=>{
        productsHandler()
        console.log('this is useEffect')
    },[])

     const vegProducts = products.filter(item => item.category.includes('veg'));
      const nonVegProducts = products.filter(item => item.category.includes('non-veg'));
    
     

      const deleteProductById = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
      
        try {
          const response = await fetch(`${API_URL}/product/${productId}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            setProducts(prev => prev.filter(product => product._id !== productId));
            await productsHandler();
            alert("Product deleted successfully");
          } else {
            alert("Failed to delete product");
            console.error('Delete request failed with status:', response.status);
          }
        } catch (error) {
          console.error('Failed to delete product:', error);
          alert('Failed to delete product');
        }
      };
      
    const renderCard = (item) => (
        <div key={item._id} className="card">
          <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} className="card-img" />
          <div className="card-content">
            <h4>{item.productName}</h4>
            <p>₹{item.price}</p>
            <button onClick={() => deleteProductById(item._id)}>Delete</button>
          </div>
        </div>
      );

    
  return (
    <div className="">
   
         <h3>Veg Items</h3>
         <div className="card-grid">
           {vegProducts.length > 0 ? vegProducts.map(renderCard) : <p>No veg products available</p>}
         </div>
   
         <h3>Non-Veg Items</h3>
         <div className="card-grid">
           {nonVegProducts.length > 0 ? nonVegProducts.map(renderCard) : <p>No non-veg products available</p>}
         </div>
       </div>
  )
}

export default AllProducts
