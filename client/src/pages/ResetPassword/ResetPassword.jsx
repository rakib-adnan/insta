import React from 'react';
import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { createToast } from '../../utility/Tost';

const ResetPassword = () => {

    //? Use state hook
    const [password , setPassword] = useState('');
    const [cpassword , setCPassword] = useState('');
    const {token} = useParams();
    const navigate = useNavigate();

    const [ msg, setMsg] = useState({
        type : '',
        msg : '',
        status : false
    })

    const handleResetPassword = async (e) =>{
        e.preventDefault();

        try {
            
        //todo check password
        if(!password){
            setMsg({
                type : "danger",
                msg : "Please set a password",
                status : true
            })
        }else if(password !== cpassword){
            setMsg({
                type : "warning",
                msg : "Password not match",
                status : true
            })
        }else{
            await axios.post('http://localhost:5050/api/user/reset-password', {token, password}).then(res => {
                setMsg({
                    type : "",
                    msg : "",
                    status : false
                })
              createToast('Password Changed Successful');
              navigate('/login')
              

            }).catch(error =>{
               createToast('Time out Please try again')
            })

           
        }
        } catch (error) {
            createToast('Try again')
        }

    }
    
  return (
    <div className='forgot-pass'>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center py-2">
                          
                            <h2>Reset Your Password</h2>
                        </div>
                        <div className="card-body">
                            {msg.status && <p className={`alert alert-${msg.type}`}>{msg.msg}</p>}
                            <form action="" onSubmit={handleResetPassword} method='POST'>
                                <input className='form-control
                                ' type="password" name='password' value={password} onChange={ e => setPassword(e.target.value)} placeholder='New Password' />
                                <br />
                                <input className='form-control' type="password" name='confirm-password' value={ cpassword} onChange={e => setCPassword(e.target.value)} placeholder='Confirm Password' />
                                <br />
                                <button className='btn btn-primary ' type='submit'>Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ResetPassword