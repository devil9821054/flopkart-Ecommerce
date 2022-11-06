import { parse } from "query-string";
import { API } from "../../backend";


export const singup = user =>{
    return fetch(`${API}/singup`,{
        method: "POST",
        headers: {
          Accept:"application/json",
          "Content-Type":"application/json" 
        },
        body:JSON.stringify(user)
    })
    .then(response =>{
        return Response.json();
    })
    .catch(err => console.log(err))}


    
export const singin = user =>{
    return fetch(`${API}/singin`,{
        method: "POST",
        headers: {
          Accept:"application/json",
          "Content-Type":"application/json" 
        },
        body:JSON.stringify(user)
    })
    .then(response =>{
        return Response.json();
    })
    .catch(err => console.log(err))}



export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt" , JSON.stringify(data))
        next();
    }
}    


export const singout = next =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();
    }
    return fetch(`${API}/singin`,{
         method: "GET"
    })

    .then(response => console.log("singout succesfull"))
    .catch(err => console.log(err))
}


export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
      return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));

    }else{
        return false;
    }
}