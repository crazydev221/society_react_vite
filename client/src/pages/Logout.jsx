import React, { useEffect } from 'react'
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // setTimeout(() => {
        navigate("/");
        // }, 3000);
    }, []);

  return (
    <div className='logout-main'>
    <h1>Logout Successful!</h1>
    <p>You will be redirected to the landing page...</p>
  </div>
  )
}

export default Logout