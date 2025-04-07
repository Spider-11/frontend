import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PGDetails.css';
import axios from 'axios';
import Pay from './pay.jpg';

const PGDetails = ({user}) => {
  const location = useLocation();
  const { pg } = location.state;
  const [message,setMessage]=useState('');
  
  const handlepay=()=>{
      window.open(Pay,'_self')
  }

  const handleBooking = async () => {
    console.log("PG Object in State:", pg);
    console.log("User Object:", user);
    console.log(pg.ownerId);
  
    if (!user || !user._id) {
      console.error("User ID is missing");
      setMessage("User information is missing");
      return;
    }
  
    if (!pg || !pg.ownerId || !pg._id) {
      console.error("PG details are incomplete", pg);
      setMessage("PG details are missing");
      return;
    }
  
    try {
      const response = await axios.post("https://pgbackend-6998.onrender.com/api/bookings/book", {
        userId: user._id,
        ownerId: pg.ownerId,
        pgId: pg._id,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error Booking PG:", error);
      setMessage("Failed to send booking request.");
    }
  };
  
  const handleWhatsapp=()=>{
    if(!pg.mobile)
    {
        alert("Owner's WhatsApp number is not available");
    }
    console.log(pg);
    console.log(pg.mobile);
    const whatsappUrl=`https://wa.me/${pg.mobile}`;
    window.open(whatsappUrl,"_blank");
  }

  const handleContact=()=>{
    if(!pg.mobile)
    {
      alert("Owner's Mobile number is not Available");
    }
    const callUrl=`tel:${pg.mobile}`;
    window.location.href=callUrl;
  }

  return (
    <>
    <div className='pg-details-container'>
        <div className='left'>
      <img src={pg.imageUrl} alt={pg.name} className='pg-full-image' />
      </div>
      <div className='right'>
      <h1>{pg.name}</h1>
      <p><strong>Address:</strong> {pg.address}</p>
      <p><strong>Gender:</strong> {pg.gender}</p>
      <p><strong>WeekdaysMeals:</strong> {pg.weekdaysMeals}</p>
      <p><strong>WeekendsMeals:</strong> {pg.weekendsMeals}</p>
      <p><strong>MealType:</strong> {pg.mealType}</p>
      <p><strong>OpenTime:</strong> {pg.openTime}</p>
      <p><strong>CloseTime:</strong> {pg.closeTime}</p>
      <p><strong>SingleRoom:</strong> ₹ {pg.singleRoom}</p>
      <p><strong>DoubleRoom:</strong> ₹ {pg.doubleRoom}</p>
      </div>
    </div>
          <div className='contacts'>
          <input type='button' className='book' value='Book Now' onClick={handleBooking}></input>
          <input type='button' className='pay' value='Pay Now' onClick={handlepay}></input>
          <input type='button' className='whatsapp' value='Whatsapp' onClick={handleWhatsapp}></input>
          <input type='button' className='contact' value='contact' onClick={handleContact}></input>
        </div>
        {message && <p className='booking-message'>{message}</p>}
        </>
  );
};

export default PGDetails;
