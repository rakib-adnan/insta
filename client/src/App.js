
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import './App.scss'
import AuthenticateUser from './middlewares/AuthenticateUser';
import AuthRedirectUser from './middlewares/AuthRedirectUser';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={ <AuthenticateUser><Home /></AuthenticateUser> } />
      <Route path="/login" element={<AuthRedirectUser><Login /></AuthRedirectUser> } />
      <Route path="/register" element={<AuthRedirectUser><Register /></AuthRedirectUser> } />
      <Route path="/profile/:id" element={<AuthRedirectUser> <Profile /></AuthRedirectUser>} />
    </Routes>
    </>
  );
}

export default App;
