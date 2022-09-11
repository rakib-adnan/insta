import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { createToast } from '../../utility/Tost';

const Verify = () => {
    const params = useParams();
    const navigate = useNavigate();
 
      useEffect( () =>{
        axios.post('http://localhost:5050/api/user/Verify', params)
        .then(res =>{
          
          createToast("Account Activeition successful");
          navigate('/login');
        })
        .catch( error =>{
          createToast("Account Activeition Failed");
         
        })
      })

  return (
    <div><h1>Verify Your Accout</h1></div>
  )
}

export default Verify;