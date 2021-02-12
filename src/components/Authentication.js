import React, { useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../context";
import { spotifyAuthRedirect } from "../constants/api";


export default function Authentication(){

   const authContext = useContext(AuthContext);  

   const logoutHandler = () => {
       authContext.logout();
       authContext.isLoggedIn = false;
   };

   const getHashParams = useCallback(() => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }, []);

   useEffect(() =>{
    const token = getHashParams().access_token;
    if(token){
        authContext.isLoggedIn = true;
        authContext.token = token;
    } else {
      authContext.isLoggedIn = false;
    }
   },[]);
   
   return (
       <>
          {!authContext.isLoggedIn && <a href={spotifyAuthRedirect}>Spotify login</a>}
          {authContext.isLoggedIn && <button className="login" onClick={logoutHandler}>Spotify Logout</button>}
       </>
   )
}