import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "./Navbar.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Addpg from "./pages/Addpg";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Owners from "./pages/Owners";
import Account from "./pages/Account";
import PGDetails from "./pages/PGDetails";
import UserBookings from "./pages/UserBookings";

const Navbar = ({ user, setUser }) => {
  const [isMenu, setisMenu] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [setUser]);

  const toggleMenu = () => {
    setisMenu(!isMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo" style={{fontSize:'1.5rem'}}>PGNow</div>
        <div className="menu" onClick={toggleMenu}>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
        </div>

        <ul className={isMenu ? "navbar-link active" : "navbar-link"}>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={toggleMenu}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" onClick={toggleMenu}>
              Contact
            </NavLink>
          </li>

          {/* Show Login only when no user is logged in */}
          {!user && (
            <li>
              <NavLink to="/login" onClick={toggleMenu}>
                Login
              </NavLink>
            </li>
          )}

          {/* Role-based options - only after login */}
          {user && (
            <>
              {user.role === "User" && (
                <>
                <li>
                  <NavLink to="/search" onClick={toggleMenu}>
                    Search
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/userbookings' onClick={toggleMenu}>UserBookings</NavLink>
                </li>
                </>
              )}

              {user.role === "Owner" && (
                <>
                  <li>
                    <NavLink to="/addpg" onClick={toggleMenu}>
                      Add PG
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/bookings" onClick={toggleMenu}>
                      Bookings
                    </NavLink>
                  </li>
                </>
              )}

              {user.role === "Admin" && (
                <>
                  <li>
                    <NavLink to="/users" onClick={toggleMenu}>
                      Show Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/owners" onClick={toggleMenu}>
                      Show Owners
                    </NavLink>
                  </li>
                </>
              )}

              {/* Account & Logout only for logged-in users */}
              <li>
                <NavLink to="/account" onClick={toggleMenu}>
                  My Account
                </NavLink>
              </li>
              <li>
                <button className="logout-btn" style={{backgroundColor:'black',color:'white',cursor:'pointer',fontSize:'18px',fontFamily:'Times New Roman',border:'none',}} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/addpg" element={<Addpg />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/users" element={<Users />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/account" element={<Account />} />
        <Route path="/pg/:id" element={<PGDetails user={user} />} />
        <Route path="/userbookings" element={<UserBookings />} />
      </Routes>
    </>
  );
};

export default Navbar;
