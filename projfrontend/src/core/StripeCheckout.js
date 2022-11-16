import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { CartEmpty, loadCart } from '../auth/helper/cartHelper'
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend'



const StripeCheckout = (
    {products , 
    setReload = f => f,
    reload = undefined
 })=>  {

     const [data , setData] = useState({
        loadin: false,
        success:false,
        error:"",
        address:"" 
     });


    const token = isAuthenticated() && isAuthenticated.token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () => {
         let amount = 0;
         products.map(p => {
            amount = amount + p.price
         })
         return amount;
    }


    const makePayment  = (token) =>{
     const body = {
         token, 
         products
     } 
     const headers = {
        "Content-Type" : "appliaction/json"
     } 
     return fetch(`${API}/stripepayment`, {
        method:"POST", 
        headers,
        body:JSON.stringify(body)
     })
     .then(response =>{
           console.log(response)
           //call further methods...createOrder
     })
     .catch(err => console.log(err))
    }
     
    const showStripeButton = () =>{
        return isAuthenticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51M4SmaSJhzC9qeZEOLIZq2GOgxDBGHSwKGsKZnf0HzeD7diYPXAnyiJK3MT5Uu4iFcw8Vu3D4cJUcqmYFtFWG9xX00JPPkYwvz"
            token={makePayment}
            amount = {getFinalAmount() * 100}
            name = "Pay Here"
            shippingAddress
            billingAddress
            
            >
                 <button className='btn btn-success'>Pay with Stripe </button>
            </StripeCheckoutButton>
           

           
        ):(
            <Link to = "/signin">
                <button className='btn btn-warning'>Signin</button>
            </Link>
        )
    }


    

  return (
    <div>
        <h3 className='text-white'> Stripe checkout:  ${getFinalAmount()} </h3>
        
        {showStripeButton()}
        
            
    </div>
  )
}

export default StripeCheckout;