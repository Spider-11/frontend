import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [firstname,setFirst]=useState('');
    const [lastname,setSecond]=useState('');
    const [mobile,setMobile]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [conpassword,setconPassword]=useState('');
    const [role,setRole]=useState('');

    const navigate = useNavigate();
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };
    
      const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
      };

    const handleRegister = async () => {
        if (!firstname || !lastname || !mobile || !email || !password || !conpassword || !role) {
            alert('All fields are required');
            return;
        }
        if (password !== conpassword) {
            alert('Passwords do not match');
            return;
        }
        if(!validateEmail(email)){
            alert('Please enter a valid email addrss');
            return;
        }
        
        if(!validatePassword(password))
        {
            alert( "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }
    
        try {
            const userData = { firstname, lastname, mobile, email, password, role };
    
            const response = await axios.post('https://pgbackend-6998.onrender.com/api/auth/register', userData);
    
            alert(response.data.message);
            localStorage.setItem("user", response.data.user._id);
            localStorage.setItem("role", response.data.user.role);
    
            if (response.data.user.role === 'Owner') {
                localStorage.setItem("ownerId", response.data.user.ownerId); // ✅ Automatically fetched from backend
            }
    
            navigate('/');
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };
    
    
  return (
    <div className='form1'>
      <div className='title1'>
        Register
      </div>
    <div className='container1'>
        <div className='entryarea1'>
            <input type='text' className='hov1' onChange={(e)=>setFirst(e.target.value)} required></input>
            <div className='labelline1'>Enter your First Name</div>
        </div>

    </div>
    <div className='container1'>
        <div className='entryarea1'>
            <input type='text' className='hov1' onChange={(e)=>setSecond(e.target.value)} required></input>
            <div className='labelline1'>Enter your Last name</div>
        </div>
        
    </div>
    <div className='container1'>
        <div className='entryarea1'>
            <input type='number' className='hov1' onChange={(e)=>setMobile(e.target.value)}  required></input>
            <div className='labelline1'>Enter your Mobile Number</div>
        </div>
        
    </div>
    <div className='container1'>
        <div className='entryarea1'>
            <input type='email' className='hov1' onChange={(e)=>setEmail(e.target.value)} required></input>
            <div className='labelline1'>Enter your Gmail</div>
        </div>
        
    </div>
    <div className='container1'>
        <div className='entryarea1'>
            <input type='password' className='hov1' onChange={(e)=>setPassword(e.target.value)} required></input>
            <div className='labelline1'>Enter your Password</div>
        </div>
        
    </div>
    <div className='container1'>
        <div className='entryarea1'>
            <input type='password' className='hov1' onChange={(e)=>setconPassword(e.target.value)} required></input>
            <div className='labelline1'>Confirm Password</div>
        </div>
        
    </div>
    <div className='container'>
      <div className='entryarea9'>
        <select className='hov9' onChange={(e)=>setRole(e.target.value)} required>
          <option value=''></option>
          <option value='User'>User</option>
          <option value='Owner'>Owner</option>
        </select>
        <div className='labelline9'>Enter the Role</div>
      </div>

    </div>
    <div className='login1'>
       <button type='button' className='bt1' onClick={handleRegister}>Register</button>
    </div>
    <div className='regist1'>
      <h4>Already have an account? <Link to={'/login'}>Login</Link></h4>
    </div>
    </div>
  )
}

export default Register
