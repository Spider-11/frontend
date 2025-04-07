import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Addpg.css';

const Addpg = () => {
    const [pgData, setPgData] = useState({
        name: '',
        address: '',
        gender: '',
        weekdaysMeals: '',
        weekendsMeals: '',
        mealType: '',
        openTime: '',
        closeTime: '',
        singleRoom: '',
        doubleRoom: '',
        mobile: '',
        image: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPgData({ ...pgData, [name]: value });
    };

    const handleFileChange = (e) => {
        setPgData({ ...pgData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const ownerId = localStorage.getItem("ownerId"); // Retrieve the stored ownerId
        if (!ownerId) {
            alert("❌ Owner ID missing! Please log in.");
            return;
        }
    
        const formData = new FormData();
        Object.entries(pgData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("ownerId", ownerId); // ✅ Ensure ownerId is sent
    
        try {
            const response = await axios.post('http://localhost:5000/api/pg/addpg', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            alert(response.data.message);
            navigate('/');
    
        } catch (error) {
            console.error("Axios Error:", error.response?.data || error.message);
            alert("Error: " + (error.response?.data?.message || "Server error"));
        }
    };
    
    return (
        <>
            <h2 className='hh'>Add The PG Details</h2>
            <form onSubmit={handleSubmit}>
                {[
                    { name: "name", label: "Enter the PG Name" },
                    { name: "address", label: "Enter the Address" },
                    { name: "weekdaysMeals", label: "Meals on Weekdays" },
                    { name: "weekendsMeals", label: "Meals on Weekends" },
                    { name: "mealType", label: "Meal Type" },
                    { name: "singleRoom", label: "Single Person Room", type: "number" },
                    { name: "doubleRoom", label: "2-Sharing Person Room", type: "number" },
                ].map(({ name, label, type = "text" }) => (
                    <div className='container2' key={name}>
                        <div className='entryarea2'>
                            <input type={type} className='hov2' name={name} onChange={handleChange} required />
                            <div className='labelline2'>{label}</div>
                        </div>
                    </div>
                ))}
                <div className='container2'>
                    <div className='entryarea6'>
                        <select className='hov6' name="gender"  onChange={handleChange} required>
                            <option value=""></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Both">Both</option>
                        </select>
                        <div className='labelline6'>Allowed Gender</div>
                    </div>
                </div>
                <div className='container2'>
                    <div className='entryarea2'>
                        <input type='time' className='hov2' name="openTime" onChange={handleChange} required />
                        <div className='labelline2'>Gate Opening Time</div>
                    </div>
                </div>
                <div className='container2'>
                    <div className='entryarea2'>
                        <input type='time' className='hov2' name="closeTime" onChange={handleChange} required />
                        <div className='labelline2'>Gate Closing Time</div>
                    </div>
                </div>
                <div className='container2'>
                    <div className='entryarea6'>
                        <input type='number' className='hov6' name="mobile" onChange={handleChange} required />
                        <div className='labelline6'>Mobile</div>
                    </div>
                </div>

                <div className='container2'>
                    <div className='entryarea2'>
                        <input type='file' accept='image/*' className='hov2' onChange={handleFileChange} required />
                        <div className='labelline2'>Upload Image</div>
                    </div>
                </div>
                <div className='login2'>
                    <button type='submit' className='bt2'>Create</button>
                </div>
            </form>
        </>
    );
};

export default Addpg