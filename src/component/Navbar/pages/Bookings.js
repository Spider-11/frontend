import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Booking.css'

const Bookings = () => {
  const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Load user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            console.error("User not found in localStorage");
        }
    }, []);

    useEffect(() => {
        if (!user || !user._id) {
            console.error("User not found or missing _id", user);
            return;
        }

        const fetchBookings = async () => {
            try {
                console.log("Fetching bookings for user:", user._id);
                const response = await axios.get(`https://pgbackend-6998.onrender.com/api/bookings/owner/${user._id}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [user]); // Runs when `user` is updated

  const handleUpdateStatus= async (bookingId,status) => {
    try{
      await axios.put(`https://pgbackend-6998.onrender.com/api/bookings/update/${bookingId}`,{status});
      setBookings(bookings.map(booking=>(booking._id===bookingId ? {...booking,status}:booking)));
    }
    catch(error)
    {
      console.log('Error updating booking:',error);
    }
  }
  return (
    <>
      <div className='boxdd'>
      <h2>Booking Requests</h2>
      {bookings.length===0?(
        <p>No bookings yet</p>
      ):(
        bookings.map((booking)=>(
          <div key={booking._id} className='booking-cards'>
            <p><strong>PG:</strong>{booking.pgId.name}</p>
            <p><strong>User:</strong>{booking.userId.firstname} {booking.userId.lastname}</p>
            <p><strong>Status:</strong>{booking.status}</p>

            {booking.status==="Pending" &&(
              <>
              <button onClick={()=>handleUpdateStatus(booking._id,"Approved")} >Approve</button>
              <button onClick={()=>handleUpdateStatus(booking._id,"Denied")} style={{backgroundColor:'black'}}>Deny</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
    </>
  )
}

export default Bookings
