import {React , Fragment} from 'react';
import {  Link } from "react-router-dom";
import {signout , isAuthenticated}  from "../auth/helper";
import { useNavigate } from "react-router-dom";

 


const Menu = () =>{
  let navigate = useNavigate();
  return (
  <div>
    <ul className='nav nav-tabs bg-dark'>

    <li className='nav-item'>
      <Link  className='nav-link menu-link' to="/">
        Home
        </Link>
    </li>

    <li className='nav-item'>
      <Link className='nav-link menu-link' to="userdashboard">Dashboard</Link>
    </li>

 

     <li className='nav-item'>
      <Link className='nav-link menu-link' to="/admindashboard">A.Dashboard</Link>
     </li>

    
  

    { !isAuthenticated() && ( 
    <Fragment>
    <li className='nav-item'>
      <Link className='nav-link menu-link' to="/signup">SignUp</Link>
    </li>

    <li className='nav-item'>
      <Link className='nav-link menu-link' to="/signin">SingIn</Link>
    </li>

    </Fragment>)
    }


     <li className='nav-item'>
      <Link className='nav-link menu-link' to="/cart">Cart</Link>
    </li>

    {isAuthenticated() && (
      <li  className='nav-item'>
        <Link 
        className='nav-link menu-link'
        onClick={() =>{
          signout(() =>{
            
            return navigate("/signup");
          })
          
        }}
        >
         SignOut
         </Link>
        
       
      </li>

    )}


    
     
    </ul>

  </div>
  );
}
export default Menu;
