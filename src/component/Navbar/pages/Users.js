import React, { useEffect, useState } from "react";
import axios from "axios";
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://pgbackend-6998.onrender.com/api/show/Users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`https://pgbackend-6998.onrender.com/api/delete/${id}`);
            setUsers(users.filter((user) => user._id !== id));
            alert("✅ User Deleted Successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="boxdd">
            <h2>All Users</h2>
            
                {users.map((user) => (
                    <div key={user._id} className="booking-cards">
                        <h3>{user.name}</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Mobile:</strong> {user.mobile}</p>
                        <button onClick={() => handleDelete(user._id)} style={{backgroundColor:'black'}}>Delete</button>
                    </div>
                ))}
            </div>
        
    );
};

export default Users;

