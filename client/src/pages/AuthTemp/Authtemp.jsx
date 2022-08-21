import React from 'react'
import { GrFacebook } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import AuthFooter from '../../components/Footer/AuthFooter';
import './Authtemp.scss';
import mobile from './mobile.png';

const Authtemp = () => {
  return (
    <div className='login-container'>
 <div className="auth-container">
    <div className="auth-left">
      <img src={mobile} alt="" />
    </div>
    <div className="auth-rigit">
    <div className="login-wraper">
      <a className='login-logo-link' href="/"> <img clssName= "login-logo"src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" /></a>
      <form action="" className="login-form">
        <input className='login-input' type="text" placeholder='Phone number, usernamem, or email' />
        <input className='login-input' type="text" placeholder='Password' />
        <button className='login-submit' >Log In</button>
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
    </div>
 </div>
    <AuthFooter/>
  </div>
  )
}

export default Authtemp;