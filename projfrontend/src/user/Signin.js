import React, {useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";


const Signin = () =>{
    const SigninForm = () => {
        return(
            <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
                 <form className="">
                 
                    <div className="form-group">
                        <label className="text-light">email</label>
                        <input className="form-control"  type= "email"/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input className="form-control"  type= "password"/>
                    </div>
                    
                    <div  class="d-grid">
                    <button class="btn btn-success ">Submit</button>
                    </div>
                   
                 </form>
              </div>
            </div>
        )
    };

    return(
       <Base title="SignIn Page" description="A page for users to Sign in!!">
         {SigninForm()}
      
       
       </Base>
       

    )
    


}
export default Signin;