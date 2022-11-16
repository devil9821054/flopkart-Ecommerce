import React, {useState} from "react";
import Base from "../core/Base";
import { useNavigate } from "react-router-dom";


import{signin , authenticate ,isAuthenticated} from "../auth/helper";


const Signin = () =>{
    let navigate = useNavigate();
  const [values , setValues] = useState({
    email:"levi@ackerman.com",
    password:"123456",
    error:"",
    loading: false,
    didRedirect: false
    });
   const {email  , password , error , loading , didRedirect} = values;
   const {user} = isAuthenticated();

   const handleChange = name => event => {
    //setAllValues({...allValues, [e.target.name]: e.target.value}) ===>>>>stack overflow..
    setValues({...values , error:false , [name]: event.target.value})
     } 


   const onSubmit = event => {
         event.preventDefault();
         setValues({...values , error: false , loading: true})
         signin({email , password})
         .then(data =>{
            if(data.error){
                setValues({...values , error: data.error , loading: false})
            }
            else{
              authenticate(data , () =>{
                setValues({
                    ...values,
                    didRedirect:true
                });
              });
            }

            if(isAuthenticated()){ 
                return navigate("/");
             }
         })
         .catch(console.log("signin req failed.."));

        
   }

//TODO...
   const performRedirect = () =>{
     if(didRedirect){
        if(user && user.role === 1){
            return <p>redirect to the admin dash</p>
        }
        else{
            return <p>redirect to the user dash</p>
        }
     }
     if(isAuthenticated()){ 
        return navigate("/");
     }
   }
   
  const loadingMessage = () =>{
    return (
        loading && (
            <div className="alert alert-info">

                <h2>Loading....</h2>
            </div>
        )
    )
  }
 
   const errorMessage = () =>{
     return( 
         <div className="row">
               <div className="col-md-6 offset-sm-3 text-left">
     <div className="alert alert-danger"
      style={{display: error ? "" : "none"}}
     >
 
         {error}
     </div>
     </div>
     </div>
     );
   }




    const SigninForm = () => {
        return(
            <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
                 <form className="">
                 
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input onChange={handleChange("email")} value={email} className="form-control"  type= "email"/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input onChange={handleChange("password")} value={password} className="form-control"  type= "password"/>
                    </div>
                    
                    <div  class="d-grid">
                    <button  onClick = {onSubmit} class="btn btn-success ">Submit</button>
                    </div>
                   
                 </form>
              </div>
            </div>
        )
    };

    return(
       <Base title="SignIn Page" description="A page for users to Sign in!!">
        
        
         {loadingMessage()}
         {errorMessage()}
         {SigninForm()}
         {performRedirect()}
        
       
       </Base>
       

    )
    


}
export default Signin;