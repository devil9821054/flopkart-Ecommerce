import React, {useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { singup } from "../auth/helper";





const Signup = () =>{

   const [values , setValues] = useState({
      name:"",
      email:"",
      password:"",
      error:"",
      success: false
   });

   const {name , email, password , error, success} =  values;

   const handleChange = name => event => {
    setValues({name:event.target.value})
   }




    const onSubmit = event =>{
    event.preventDefault();
    setValues({...values , error:false})
    singup({name , email, password })
      .then(data =>{
          if(data.error){
              setValues({...values , error: data.error , success: false})
          }
          else{
              setValues({
                  ...values,
                 name: "",
                 email:"",
                 password:"",
                 error: "",
                 success: true
             });
         }
    })
    .catch(console.log("error in singup"));
   }





    const SignUpForm = () => {
        return(
            <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
                 <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input className="form-control "
                         onChange = {handleChange(name)}
                         type= "text"
                        
                         />
                    </div>
    
                    <div className="form-group">
                        <label className="text-light">email</label>
                        <input className="form-control"
                         onChange = {handleChange(email)}
                        type= "email"
                       
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input className="form-control" 
                         onChange = {handleChange(password)}
                        type= "password"
                        
                        />
                    </div>
                    
                    <div  class="d-grid">
                    <button onClick={onSubmit} class="btn btn-success ">Submit</button>
                    </div>
                   
                 </form>
              </div>
            </div>
        )
    };


    return(
       <Base title="SignUp Page" description="A page for users to Sign up!!">
      
       {SignUpForm()}
       <p className="text-white text-center"> {JSON.stringify(values)} </p>
       </Base> 

    )
}


export default Signup;