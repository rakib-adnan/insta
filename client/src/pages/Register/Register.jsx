
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { GrFacebook } from 'react-icons/gr';
import './Register.scss';
import AuthFooter from '../../components/Footer/AuthFooter';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

  //? react toastify
  const createToast = (msg) =>{
    return toast.success(msg);
  }
  //? state for form fields
  const [input, setInput] = useState({
    email : '',
    name : '',
    username : '',
    password : '',
  });
  //? function to handle input change
  const handleUser = (e) =>{
    setInput((prevState) => ({...prevState, [e.target.name] : e.target.value}));
  }

  //? function to handle form submit
  const handleUserRegister =async (e) =>{
    e.preventDefault();
     try {
      if(!input.email || !input.name || !input.username || !input.password){
        swal("Danger!", "All field are reuqire!", "error");
        createToast("All field are required!");
      }else{
         await axios.post('http://localhost:5050/api/register', input).then( 
          (res) => {
             setInput((prevState) => ({
              email : '',
              name : '',
              username : '',
              password : ''
             }));
              swal("Success!", "You are registered successfully!", "success");
          }
     
          )
    }
    
     } catch (error) {
      console.log(error);
     }
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

       

          <span className="content-text-1">Sign up to see photos and videos from your friends.</span>
          <button className='login-submit-1'><span className='icon1'><GrFacebook/></span>Log in with Facebook</button>

          <div className="divider">
         <span className='or'>OR</span>
        </div>

        <form onSubmit={ handleUserRegister} className="login-form">

          <input name='email' onChange={ handleUser } value={input.email} className='login-input' type="text" placeholder='Mobile Number or Email' />
          <input name='name' onChange={ handleUser } value={input.name}  className='login-input' type="text" placeholder='Full Name' />
          <input name='username' onChange={ handleUser } value={input.username}  className='login-input' type="text" placeholder='Username' />
          <input name='password' onChange={ handleUser } value={input.pass}  className='login-input' type="text" placeholder='Password' />   
          

        <div className="content-text-2">
        <span className="text-1">People who use our service may have uploaded your contact information to Instagram. <span className="learn">Learn More</span></span>

        
            </div>
            <div className="content-text-3">
              <span className="text-2">By signing up, you agree to our <span className="terms">Terms</span> and <span className="privacy">Privacy Policy</span></span>
            </div>
          <button type='submit' className='login-submit' >Sign up</button>
      </form>
      </div>
      <div className="sign-up-wraper">
        <span className='sign-up-text'>Have an account?<Link className='sign-up-link' to="/login">Log in</Link></span>
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

export default Register;