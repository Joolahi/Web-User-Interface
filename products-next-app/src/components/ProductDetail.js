import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetails.css'

const apiUrl = 'https://fakestoreapi.com/products'

async function getProductDetailsById(productId) {
    try{
        const response = await axios.get(`${apiUrl}/${productId}`);
        console.log(response)
        return response.data;
    } catch (error){
        console.log('Error:', error);
        throw error;
    }
}


function ProductDetails() {
  const {id} = useParams();
  const productId = parseInt(id);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
        const details = await getProductDetailsById(productId);
        console.log(details)
        setProductDetails(details);
    };
    fetchDetails();
  }, [productId])

  return (
    <div className='details-container'>
      <h2>Product Details</h2>
      <Link to="/products">
        <button>Back</button>
      </Link>
      {productDetails ? (
        <div>
          <h3>{productDetails.title}</h3>
          <img src={productDetails.image} alt={productDetails.title} style={{ maxWidth: '200px' }} />
          <p><p className='smallheader'>Description:</p> {productDetails.description}</p>
          <p><p className='smallheader'>Category: </p>{productDetails.category}</p>
          <p><p className='smallheader'>Rating: </p>{productDetails.rating.rate}</p>
          <p><p className='smallheader'>Price: </p>{productDetails.price} €</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductDetails;