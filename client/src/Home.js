import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Products from './data.json'

function Home() {
  const [products, setProducts] = useState(Products)

  return (
    <div className="container">
      <h3 style={{textAlign: 'center', marginTop: '30px'}}>Online Shopping Site</h3>
      <div className="row px-5 pt-5">
        { products.map(product => (
        <div className="col-md-4 mt-4 mt-sm-0 card-container">
          <div className="card text-center product p-4 pt-5 border-0 h-100 rounded-0">
            <img className="img-fluid d-block mx-auto" src={product.image} alt={product.name} />
            <div className="card-body p-4 py-0 h-xs-440p">
              <h5 className="card-title font-weight-semi-bold mb-3 w-xl-220p mx-auto">{product.name}</h5>
              <p>{product.description}</p>
              <p className="price">{product.price}</p>
            </div>
            <p className="btn w-100 px-4 mx-auto">
            <Link to={{ pathname: `/checkout/${product.id}` }}>
              <button type="button" className="btn btn-dark w-100">
                Buy Now
              </button>
            </Link>
            </p>
          </div>
        </div>
        ))}
      </div>
    </div>
  )

}

export default Home;