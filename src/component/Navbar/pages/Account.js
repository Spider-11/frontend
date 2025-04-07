
import React, { useInsertionEffect } from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import './Account.css';

const Account = () => {

  const [user, setUser] = useState({ firstname: '', lastname: '', mobile: '', email: '', password: '' });
  const userId = JSON.parse(localStorage.getItem("user"))?._id || localStorage.getItem("user");
  const navigate=useNavigate();

useEffect(() => {
  if (userId) {
    axios.get(`http://localhost:5000/api/auth/user/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user data: ", error));
  } else {
    console.error("Invalid userId:", userId);
  }
}, [userId]);

  const handleChange=(e)=>{
    setUser({ ...user,[e.target.name]: e.target.value});
  }

  const handleUpdate=(e)=>{
    axios.put(`http://localhost:5000/api/auth/user/${userId}`,user)
      .then(response=>alert("User Updated Successfully"))
      .catch(error=>console.error("Error Updating user Data: ",error));
  };

  const handleDelete=(e)=>{
    axios.delete(`http://localhost:5000/api/auth/user/${userId}`)
      .then(response=>{alert("Acount Deleted Successfully");
        localStorage.removeItem("user");
        localStorage.clear();
        navigate('/');
        window.location.reload();
      })
      .catch(error=>console.error("Error Deleting the Account: ",error));
  };

  return (
    <>
      <div className='information'>
        <div className='info'>
          <h3>User Information</h3>
          <div className='infor'>
        <label>First Name:</label>
        <input type='text' name='firstname' value={user.firstname} onChange={handleChange} />
        </div>
        <div className='infor'>
        <label>Last Name:</label>
        <input type='text' name='lastname' value={user.lastname} onChange={handleChange} />
        </div>
        <div className='infor'>
        <label>Mobile Number: </label>
        <input type='number' name='mobile' value={user.mobile} onChange={handleChange}/>
        </div>
        <div className='infor'>
        <label>Gmail:</label>
        <input type='email' name='email' value={user.email} onClick={handleChange}></input>
        </div>
        <div className='infor'>
        <label>Password:</label>
        <input type='text' name='password' value={user.password} onChange={handleChange}/>
         </div>
        <div className='infor'>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete} style={{backgroundColor: 'black'}}>Delete</button>
        </div>
        </div>
      </div>  
    </>
  )
}

export default Account