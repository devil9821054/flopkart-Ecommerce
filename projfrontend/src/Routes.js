import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./core/Home";
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import Cart from './core/Cart';


const Routesf = ()  => {
  return (
    <BrowserRouter>
    
       <Routes>
       <Route path='/' exact element={<Home/>} />
       <Route path='/signup' exact element={<Signup/>} />
       <Route path='/signin' exact element={<Signin/>} />
       <Route path='/Cart' exact element={<Cart/>} />


       <Route path="/admindashboard" exact element={<AdminDashBoard/>} />
       <Route path="/userdashboard" exact element={<UserDashBoard/>} />
       <Route path="/admin/create/category" exact element={<AddCategory/>} />


       /admin/create/category
       


     
      
      </Routes>
    </BrowserRouter>
  );
};

export default Routesf;
