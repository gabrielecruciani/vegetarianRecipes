import React, { useState } from 'react';
import './LoginSignup.css';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const LoginSignup = () => {

    const [action, setAction] = useState('Sign Up');

  return (
    <div className='login-container'>

        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            {action==='Login' ? <div></div> : <div className='input-container'>
                <FaIcons.FaUser alt=''/>
                <input type='text' placeholder='Name' className='border-on-click' required/>
            </div>}
            
            <div className='input-container'>
                <MdIcons.MdEmail alt=''/>
                <input type='email' placeholder='Email' className='border-on-click' required/>
            </div>
            <div className='input-container'>
                <FaIcons.FaLock alt=''/>
                <input type='password' placeholder='Password' className='border-on-click' required/>
            </div>
        </div>
        {action==='Sign Up' ? <div></div> : <div className='forgot-password'>Lost Password? <span>Click Here!</span></div>}
        <div className='submit-container'>
            <div className={action==='Login' ? 'submit gray' : 'submit'} onClick={()=>{setAction('Sign Up')}}>Sign Up</div>
            <div className={action==='Sign Up' ? 'submit gray' : 'submit'} onClick={()=>{setAction('Login')}}>Login</div>
        </div>
        <div className={action==='Login' ? 'banner adapter' : 'banner'}>
            <h3>Available Soon!</h3>
        </div>
        
    </div>
  )
}
