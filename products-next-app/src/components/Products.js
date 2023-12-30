import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../styles/Products.css'

const apiUrl = 'https://fakestoreapi.com/products';

function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
        .get(apiUrl)
        .then((reponse) =>{
            setProducts(reponse.data);
            })
        .catch((error)=>{
            console.log('Error', error);
        });
    }, []);




  return (
    <div>
      <div className='product-container'>
        <h2 className='product-header'>Products</h2>
        <ul>
            {products.map((product) => (
                <div key={product.id} className='product'>
                    <Link to={`/products/${product.id}`}>
                        <h3>{product.title}</h3>
                        <img src={product.image} alt={product.title} style={{maxWidth: '100px'}}/>
                        <p style={{textDecoration: 'none'}}>Price: {product.price} €</p>
                    </Link>
                </div>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Products;