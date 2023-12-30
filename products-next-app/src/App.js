import * as React from 'react';
import {Routes, Link, Route} from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home'
import Products from './components/Products';
import About from './components/About';
import ProductDetails from './components/ProductDetail';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <h1>Welcome to fake store.</h1>
        <nav className='nav'>
          <Link to="/" className='link'>Home</Link>
          <Link to="products" className='link'>Products</Link>
          <Link to="about" className='link'>About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="about" element={<About/>}/> 
          <Route path="/products/:id" element={<ProductDetails/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
