import React from 'react';
import {  Link } from "react-router-dom";




const Menu = () =>{
  return (
  <div>
    <ul className='nav nav-tabs bg-dark'>

    <li className='nav-item'>
      <Link  className='nav-link menu-link' to="/">
        Home
        </Link>
    </li>

    <li className='nav-item'>
      <Link className='nav-link menu-link' to="/">Dashboard</Link>
    </li>

    <li className='nav-item'>
      <Link className='nav-link menu-link' to="/">A.Dashboard</Link>
    </li>

    <li className='nav-item'>
      <Link className='nav-link menu-link' to="/signup">SignUp</Link>
    </li>
    <li className='nav-item'>
      <Link className='nav-link menu-link' to="/signin">SingIn</Link>
    </li>

    <li className='nav-item'>
      <Link className='nav-link menu-link' to="/">SingOut</Link>
    </li>
    </ul>

  </div>
  );
}
export default Menu;
