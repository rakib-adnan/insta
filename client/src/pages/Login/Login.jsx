import React, { useContext, useState } from 'react';
import { GrFacebook } from 'react-icons/gr';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AuthFooter from '../../components/Footer/AuthFooter';
import axios from 'axios';
import cookie from 'js-cookie'
import AuthContext from '../../context/AuthContext';

const Login = () => {

  // use auth context

  const {dispatch}= useContext(AuthContext);

  const navigate = useNavigate();
  
  const  [input, setInput] = useState({
    auth : '',
    password : '',
  })
  const handleInput = (e) =>{
    setInput ((prev) => ({...prev, [e.target.name] : e.target.value}));
  }

  

   const loginSubmit = async (e) =>{
    e.preventDefault();
    try {
      if(!input.auth || !input.password){
        toast.error("All field are required!");
      }else{
        await axios.post('http://localhost:5050/api/login', {email : input.auth, password : input.password}).then( res => {
          // toast.success("You are logged in successfully!");
          cookie.set('token', res.data.token);
          cookie.set('user', JSON.stringify(res.data.user));
          dispatch({type : 'LOGIN_USER', payload : res.data});
          navigate('/');

         
        })
      }
    } catch (error) {
      
      createToast("Something went wrong!");
    }


   }
     //? react toastify
     const createToast = (msg) =>{
      return toast.error(msg);
     }
  return (
    <div className='login-container'>
    <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

      <div className="login-wraper">
        <a className='login-logo-link' href="/"> <img clssName= "login-logo"src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" /></a>
        <form onSubmit={loginSubmit} className="login-form">
          <input name='auth' value={input.auth} onChange={ handleInput} className='login-input' type="text" placeholder='Phone number, usernamem, or email' />
          <input name='password' value={input.password} onChange={ handleInput}  className='login-input' type="text" placeholder='Password' />
          <button type='submit' className='login-submit' >Log In</button>
        </form>
        <div className="divider">
         <span className='or'>OR</span>
        </div>
        <a href="/" className="login-fb-link"><GrFacebook/> Log in with Facebook</a>
        <a href="/"className='forgot-password'> Forgot password?</a>
     
      </div>
      <div className="sign-up-wraper">
        <span className='sign-up-text'>Don't have an account?<Link className='sign-up-link' to="/register">Sign up</Link></span>
      </div>
      <div className="get-app">
        <span className='app-text'>Get the app.</span>
        <div className="app-logo">
          <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="" />
          <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="" />
        </div>
      </div>
      <AuthFooter/>
    </div>
  )
}

export default Login;