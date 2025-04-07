import axios from "axios";
import { useEffect, useState } from "react";
import './UserBookings.css';

const UserBookings=()=>{
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const today = new Date().toLocaleDateString();
    // Load user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            console.error("User not found in localStorage");
        }
    }, []);

    useEffect(() => {
        // Ensure user is available before making API call
        if (!user || !user._id) {
            console.error("User not found or missing _id", user);
            return;
        }

        const fetchBookings = async () => {
            try {
                console.log("Fetching bookings for user:", user._id);
                const response = await axios.get(`http://localhost:5000/api/bookings/status/${user._id}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [user]); // Runs when `user` is updated


return(
    <div className="boxdd">
        <h2>My Bookings</h2>
        {bookings.length===0?(
            <p>No bookings found</p>
        ):(
            bookings.map((booking)=>(
                <div key={booking._id} className="booking-cards">
                    <p><strong>PG:</strong>{booking.pgId.name}</p>
                    <p><strong>Owner:</strong>{booking.ownerId.firstname} {booking.ownerId.lastname}</p>
                    <p><strong>Status:</strong>{booking.status}</p>
                </div>
            ))
        )}
    </div>
);
};

export default UserBookings;