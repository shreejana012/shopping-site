import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Products from './data.json'
import { useParams } from "react-router";

function Checkout() {
  const [products, setProducts] = useState(Products)
  const [showMessage, setShowMessage] = useState(false)
  const { id } = useParams()
  const filteredItem = products.filter(s => (s.id == id))
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [res, setResponse] = useState('Loading')

  function handleName(e) {
    setName(e.target.value)
  }

  function handlePhone(e) {
    setPhoneNum(e.target.value)
  }

  function checkoutProduct(e) {
    e.preventDefault();
    setShowMessage(true)
    const params = {
      number: phoneNum,
      name: name,
      price: filteredItem[0].price,
      product_name: filteredItem[0].name
    }
    const options = {
      method: 'POST',
      retries: 5,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_details: params })
    }
    fetch_retry('/api/order', options, 5)
  }

  const fetch_retry = async (url, options, n) => {
    try {
      const response = await fetch(url, options)
      const body = await response.json()
      setResponse(body.message)
      return true
    } catch(err) {
      if (n === 0) {
        setResponse("Oops!!!Sorry, Website is currently down. We'll be back soon.")
        throw err;
      } else {
        setTimeout(async () => {
          setResponse(`Something went wrong!!! Retrying: ${n} times`)
          return await fetch_retry(url, options, n - 1);
        }, 1000)
      } 
    }
  }

  return (
    <div className="container">
      <Link to='/'><button type="button" className="btn btn-black">>>Back</button></Link>
      { !showMessage ?
        <div>
          <div className="row">
            <div className="col-md-6">
              {filteredItem.map(item => (
                <div style={{textAlign: 'center'}}>
                  <h3>{item.name}</h3>
                  <img className="img-fluid d-block mx-auto" src={item.image} alt={item.name} />
                  <p>{item.description}</p>
                  <p>Price: {item.price}</p>
                </div>
              ))}
            </div>
            <div className="col-md-6">
              <form onSubmit={(e) => checkoutProduct(e)} style={{marginTop: '30px'}}>
                <div className="form-group">
                  <label htmlFor="name">Name*</label>
                  <input type="text" onChange={(e) => handleName(e)}className="form-control" id="name" placeholder="Enter your name" required={true} />
                </div>
                <div className="form-group">
                  <label htmlFor="number">Phone number*</label>
                  <input type="text" required={true} onChange={(e) => handlePhone(e)}  className="form-control" id="number" placeholder="Enter your phone number" /><small>You'll get message about your product shipment</small>
                </div>
                <button type="submit" className="btn btn-dark w-100">Checkout</button>
              </form>
            </div>
          </div>
        </div>: res && res.length > 0 ?
        <div className="row">
          <div className="col-md-6 offset-md-3 card text-center product p-4 pt-5 border-0 h-100 rounded-0">
            <p>{res}</p>
          </div>
        </div>:
        <div className="col-md-6 offset-md-3 card text-center product p-4 pt-5 border-0 h-100 rounded-0">
          <p>Something went wrong!!! </p>
        </div>
      }
    </div>
  )
}
export default Checkout;