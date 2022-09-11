import React from 'react';
import { useState } from 'react';
import axios from 'axios'

const ForgotPass = () => {

    //? Use state hook
    const [email , setEmail] = useState('');

    const [ msg, setMsg] = useState({
        type : '',
        msg : '',
        status : false
    })

    const handleRecoverPass = async (e) =>{
        e.preventDefault();

        await axios.post('http://localhost:5050/api/user/recover-password', {email}).then( res => {
             setMsg({
                type : "success",
                msg : "password recovery link sent",
                status : true
             })

        }).catch(error =>{
            setMsg({
                type : "danger",
                msg : "invalid email on not exixts",
                status : true
             })
        })
    }
    
  return (
    <div className='forgot-pass'>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center py-2">
                          
                            <h2>Forgot Your Password</h2>
                        </div>
                        <div className="card-body">
                            {msg.status && <p className={`alert alert-${msg.type}`}>{msg.msg}</p>}
                            <form action="" onSubmit={handleRecoverPass} method='POST'>
                                <input className='form-control' type="text" name='email' value={email} onChange={ e => setEmail(e.target.value)} placeholder='Your Email' />
                                <br />
                                <button className='btn btn-primary ' type='submit'>Send Login Link</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ForgotPass