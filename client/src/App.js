
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import './App.scss'
import AuthenticateUser from './middlewares/AuthenticateUser';
import AuthRedirectUser from './middlewares/AuthRedirectUser';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import LoadingBar from 'react-top-loading-bar';
import LoderContext from './context/LoaderContext';
import { ToastContainer} from 'react-toastify';
import { createToast } from './utility/Tost';
import Verify from './components/Verify/Verify';
import ForgotPass from './pages/ForgotPassword/ForgotPass';
import ResetPassword from './pages/ResetPassword/ResetPassword';



function App() {

  //get auth context 
  const { dispatch } = useContext(AuthContext)

  const token = Cookies.get('token');

  //! Loder State 
  const {LoderState, LoderDispatch}= useContext(LoderContext);

  // checked logged user
  useEffect( () => {
    try {
      axios.get('http://localhost:5050/api/user/me', {
        headers : {
          "authorization": `Bearer ${token}`
        }
      }).then(res => {

        if(res.data.isVerified && token){
          dispatch({ type : 'LOGIN_USER_SUCCESS', payload : res.data })
        }else{
          createToast("Please Verified Your Data");
          Cookies.remove('token');
        }
      }).catch(error =>{
        dispatch({ type : 'LOGOUT_USER'})
      })
    } catch (error) {
      
    }
  }, [token]);

  return (
    <>
     <LoadingBar
        color='#f11946'
        progress={LoderState}
        onLoaderFinished={() => LoderDispatch({type : "LODER_END"})}
      />
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

    <Routes>
      <Route path="/" element={ <AuthenticateUser><Home /></AuthenticateUser> } />
      <Route path="/login" element={<AuthRedirectUser><Login /></AuthRedirectUser> } />
      <Route path="/register" element={<AuthRedirectUser><Register /></AuthRedirectUser> } />
      <Route path="/profile/:id" element={<AuthRedirectUser> <Profile /></AuthRedirectUser>} />
      <Route path="/user/:id/verify/:token" element={<Verify/>} />
      <Route path="/forgot" element={<ForgotPass/>} />
      <Route path="/password-recover/:token" element={<ResetPassword/>} />
    </Routes>
    </>
  );
}

export default App;
