import React, { useEffect, useState } from "react";
import axios from "axios";

const Owners = () => {
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = async () => {
        try {
            const response = await axios.get("https://pgbackend-6998.onrender.com/api/show/Owners");
            setOwners(response.data);
        } catch (error) {
            console.error("Error fetching owners:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this owner?")) return;

        try {
            await axios.delete(`https://pgbackend-6998.onrender.com/api/delete/${id}`);
            setOwners(owners.filter((owner) => owner._id !== id));
            alert("✅ Owner Deleted Successfully");
        } catch (error) {
            console.error("Error deleting owner:", error);
        }
    };

    return (
        <div className="boxdd">
            <h2>All Owners</h2>
            
            
                {owners.map((owner) => (
                    <div key={owner._id} className="booking-cards" >
                        <h3>{owner.name}</h3>
                        <p><strong>Email:</strong> {owner.email}</p>
                        <p><strong>Mobile:</strong> {owner.mobile}</p>
                        <button onClick={() => handleDelete(owner._id)} style={{backgroundColor:'black'}}>Delete</button>
                    </div>
                ))}
            </div>
        
    );
};

export default Owners;
