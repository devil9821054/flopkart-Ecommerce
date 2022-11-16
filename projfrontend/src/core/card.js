import React, { useState } from 'react'
import Imagehelper from '../auth/helper/Imagehelper';
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from '../auth/helper/cartHelper';

  
    const Card = ({
      product,
      addtoCart = true,
      removeFromCart = false,
      setReload  = f => f, 
      reload = undefined
    }) => {
      let navigate = useNavigate();
      const  [redirect , setRedirect] = useState(false);
      const  [count , setCount] = useState(product.count);


            
      const CardTitle = product ? product.name: "No photo avaible"
      const CardDescrption = product ? product.description: "No description avaible"
      const CardPrice = product ? product.price: "No photo price avaible"
      
      const addToCart =() =>{
              addItemToCart(product, () => setRedirect(true));

      }

      const getRedirect = redirect =>{
          if(redirect){
            return navigate("/cart");
          }
      }




      const showAddToCart = (addtoCart) =>{
            return(
                   addtoCart && (
                    <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
                   )

            )
      }

      const showRemoveFromCart = (removeFromCart) =>{
           return(
            removeFromCart && (
              <button
              onClick={() => {
                removeItemFromCart(product._id);
                setReload(!reload);
              }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
              Remove from cart
            </button>
            )
           )
      }





        return (
          <div className="card text-white bg-dark border border-info  width: 18rem;" >
            <div className="card-header lead">{CardTitle}</div>
            <div className="card-body">
             
                {getRedirect(redirect)}

              <Imagehelper product={product} />

              <p className="lead bg-success font-weight-normal text-wrap">
                {CardDescrption}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {CardPrice}</p>
              <div className="row">

                <div className="col-12">
                 {showAddToCart(addtoCart)}
                </div>

                <div className="col-12">
                 {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };
  

export default Card