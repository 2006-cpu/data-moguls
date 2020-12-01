import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';
import { NavLink } from 'react-router-dom';
import './Components.css';

export default function Allproducts() {

  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const products = await getAllProducts();

      setProducts(products);
    } catch (error) {
      throw error;
    };
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className='all-products'>
      {products.map(({ id, name, description, price, imageURL, inStock, category }) => (
        <div key={id} className='product-card'>
          <NavLink to={`/product/${id}`}><img className='thumbnail' src={imageURL} /></NavLink>
          <h3>{name}</h3>
          <p>{category}</p>
          <p>Price: ${price * .01}</p>
          <p style={{color: '#FF6666'}}>{inStock ? 'In Stock!' : 'Out of Stock'}</p>
        </div>
      ))}
    </div>
  )
};
