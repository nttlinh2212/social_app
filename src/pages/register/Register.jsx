import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import "./register.css"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { instance } from '../../utils';
//import SnackbarCustom from '../../components/snackbar/SnackbarCustom';
import { Snackbar } from '@mui/material';

const registerSchema =  yup.object().shape({
    email:yup
        .string()//"Please enter your email!"
        .required()//'Email is required'
        .email()//'Please enter a valid email!'
        ,
    username:yup
        .string()
        .required()
        .min(6)//'Username must be more than 6 characters'
        ,
    password: yup
        .string()
        .required(),
    passwordConfirm: yup
        .string()
        .required("confirm password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match!")
        ,
})

function Register(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const navigate = useNavigate();
    //const {register,formState:{errors},handleSubmit} = useForm();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(registerSchema)
    });
    const registerClickedHandler = async (data)=>{
        //alert(JSON.stringify(data));
        const {passwordConfirm,...other} = data
        try {
            const ret = await instance.post('auth/register',other);
            if(ret.status === 201){
                setMessage("register successfully!")
                setOpen(true);
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setMessage(error.response.data.message);
                setOpen(true);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
            
        }
        
        
    }
    useEffect(()=>{
        if(localStorage.socialApp_accessToken){
            navigate('/',{replace:true})
        }
    },[navigate])
    return (
        <div className='register'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Lammasocial</h3>
                    <span className="registerDesc">
                        Connects people all around the world on Lammasocial!
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit(registerClickedHandler)}>
                        <input type="text" placeholder='Email' className='registerInput' autoFocus {...register('email',{required:true})}/>
                        {errors.email && <span className='errorMessage'>{errors.email.message}</span>}
                        <input type="text" placeholder='Username' className='registerInput' {...register('username',{required:true, minLength:6})}/>
                        {errors.username && <span className='errorMessage'>{errors.username.message}</span>}
                        <input type="password" placeholder='Password' className='registerInput' {...register('password',{required:true, minLength:6})}/>
                        {errors.password && <span className='errorMessage'>{errors.password.message}</span>}
                        <input type="password" placeholder='Confirm Password' className='registerInput' {...register('passwordConfirm',{required:true, minLength:6})} />
                        {errors.passwordConfirm && <span className='errorMessage'>{errors.passwordConfirm.message}</span>}
                        <button type='submit' className='registerButton' >Register</button>
                        <button className='registerLoginButton' onClick={()=>navigate('/login')}>Login an account</button>
                        <Snackbar
                            open={open}
                            autoHideDuration={2000}
                            message={message}
                            onClose={()=>setOpen(false)}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;