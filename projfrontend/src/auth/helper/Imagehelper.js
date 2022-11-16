import React from 'react';
import { API } from '../../backend';


 const Imagehelper = ({product}) => {
   const  imageUrl = product ? `${API}/product/photo/${product._id}`: "https://images-eu.ssl-images-amazon.com/images/I/61BeBTB41DL._AC_UL450_SR450,320_.jpg"
  return (
    <div className="rounded border border-success p-2">
        <img
                  src={imageUrl}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />


    </div>
  )
}

export default Imagehelper