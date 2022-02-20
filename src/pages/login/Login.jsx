import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { instance } from '../../utils';
import "./login.css"


function Login(props) {
    const { dispatch} = useContext(AuthContext);
    const [isFetching, setIsFetching]= useState(false);
    const [error, setError]= useState(null);
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    useEffect(()=>{
        if(localStorage.socialApp_accessToken){
            navigate('/',{replace:true})
        }
    },[navigate])
    const loginHandler = async (e)=>{
        setIsFetching(true);
        e.preventDefault();
        console.log(email.current.value,password.current.value);
        
        try {
            const ret = await instance.post('/auth/login',{
                email:email.current.value,
                password:password.current.value
            })
            
            if(ret.status === 200){
                
                console.log(ret.data);
                localStorage.socialApp_accessToken=ret.data.accessToken;
                localStorage.socialApp_refreshToken=ret.data.refreshToken;
                localStorage.socialApp_userId=ret.data._id;
                dispatch({
                    type:"LOGIN",
                    payload:{user:ret.data}
                })
                setError(null)
                setIsFetching(false);
                navigate(from,{replace:true});
                //navigate(-1,{replace:true});
                
            }
            
        } catch (error) {
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                setError(error.response.data.message)
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
                console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            setIsFetching(false);
            
            
            
            
            
        }
        
    }
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lammasocial</h3>
                    <span className="loginDesc">
                        Connects people all around the world on Lammasocial!
                    </span>
                </div>
                <div className="loginRight">
                    {/* <div className="loginBox"> */}
                        <form onSubmit={loginHandler} className="loginBox">
                            <input type="email" placeholder='Email'  className='loginInput' required autoFocus ref={email}/>
                            <input type="password" placeholder='Password'  className='loginInput' minLength={6} required ref={password}/>
                            {error&&(<span>{error}</span>)}
                            <button type='submit' className='loginButton'>{isFetching?(<CircularProgress size={'28px'} className='loading'/>):("Login")}</button>
                            <span className="loginForgot">Forgot password?</span>
                            <button type='button' className='loginRegisterButton'onClick={()=> navigate('/register')} >{isFetching?(<CircularProgress size={'28px'} className='loading'/>):("Create a new account")}</button>
                        </form>
                        
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

export default Login;