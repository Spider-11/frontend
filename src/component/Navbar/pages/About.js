import React from 'react'
import './About.css'
import KD from './KD.jpg'
import what from './what.jpg'

const About = () => {
  return (
    <>
    <div className='ab'>
      <h5>About Us</h5>
      <p>Welcome to PGNow, your trusted online destination for finding the perfect paying guest (PG) accommodation. We aim to simplify the process of renting a PG by connecting property owners with potential tenants in a seamless and hassle-free manner.
        </p>
        
    </div>
    <div className='our'>
      <h6>Our Mission</h6>
      <p>we are committed to making PG rentals convenient, secure, and efficient. We strive to provide a user-friendly platform where tenants can explore verified listings, and property owners can showcase their accommodations with ease.</p>
    </div>
    <div className='what'>
      <h6>What We Offer</h6>
      <div className='dil'>
      <div className='dil2'>
       <p>1.  A vast selection of PG accommodations across various locations.</p>
      <p> 2.  Detailed property listings with images, amenities, pricing, and owner details.</p>
      <p> 3.  A secure and transparent booking process with real-time owner approval.</p>
      <p> 4.  Easy communication between tenants and PG owners for smooth transactions.</p>
      <p> 5.  User profiles with the ability to update personal information effortlessly.</p>
    </div>
    <img src={what} alt='What'></img>
    </div>
    </div>
    <div className='why'>
      <h6 style={{textAlign: 'left',marginTop: '40px'}}>Why Choose Us?</h6>
      <div className='dil' style={{display:'flex'}}>
      <img src={KD} alt='home' style={{textAlign:'left',width:'500px',alignItems:'left'}}></img>
      <div className='dil2'>
      <p style={{textAlign: 'right'}}><strong>1.  Verified Listings: </strong>We ensure authenticity by verifying PG accommodations before listing.</p>
      <p style={{textAlign: 'right'}}><strong>2.  Seamless Booking Experience: </strong>Our intuitive interface allows quick and secure bookings.</p>
      <p style={{textAlign: 'right',marginLeft:'50px',padding:'0px 50px'}}> <strong>3.  Direct Owner Communication:</strong>Connect directly with PG owners for inquiries and negotiations.</p>
      <p style={{textAlign: 'right'}}><strong>4.  Flexible Options: </strong>Find accommodations that suit your budget and preferences effortlessly.</p>
    </div>
    </div>
    </div>
    <div className='thank'>
      <pre>Thank you for choosing PGNow! Find your perfect PG today.</pre>
    </div>
    </>
  )
}

export default About
