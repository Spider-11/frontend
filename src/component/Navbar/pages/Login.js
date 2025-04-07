import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert('Please enter all details');
      return;
    }

    try {
      const response = await axios.post('https://pgbackend-6998.onrender.com/api/auth/login', { email, password, role });

      if (response.data.user) {
        alert(response.data.message);

        // Store user info in localStorage
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem('ownerId',response.data.user._id)
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Set user state
        setUser(response.data.user);

        // Redirect based on role
        if (response.data.user.role === "User") {
          navigate('/search');
        } else if (response.data.user.role === "Owner") {
          navigate('/addpg');
        } else if (response.data.user.role === "Admin") {
          navigate('/users');
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='form'>
      <div className='title'>Login</div>
      <div className='container'>
        <div className='entryarea'>
          <input type='email' className='hov' onChange={(e) => setEmail(e.target.value)} required />
          <div className='labelline'>Enter your Gmail</div>
        </div>
      </div>

      <div className='container'>
        <div className='entryarea'>
          <input type='password' className='hov' onChange={(e) => setPassword(e.target.value)} required />
          <div className='labelline'>Enter your Password</div>
        </div>
      </div>

      <div className='container'>
        <div className='entryarea8'>
          <select className='hov8' onChange={(e) => setRole(e.target.value)} required>
            <option value=''></option>
            <option value='User'>User</option>
            <option value="Owner">Owner</option>
            <option value='Admin'>Admin</option>
          </select>
          <div className='labelline8'>Select your Role</div>
        </div>
      </div>

      <div className='login'>
        <button type='button' className='bt' onClick={handleLogin}>Login</button>
      </div>
      
      <div className='regist'>
        <h4>Don't have an account? <Link to={'/register'}>Register</Link></h4>
      </div>
    </div>
  );
};

export default Login;
