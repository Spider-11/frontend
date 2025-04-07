import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [pgs, setPgs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch PG data from the backend
  useEffect(() => {
    fetch('https://pgbackend-6998.onrender.com/api/pg/list')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched PGs:', data); // Debugging log
        setPgs(data);
      })
      .catch((error) => console.error('Error fetching PGs:', error));
  }, []);

  // Handle PG card click
  const handlePGClick = (pg) => {
    navigate(`/pg/${pg._id}`, { state: { pg } });
  };

  // Filter PGs based on search input
  const filteredPGs = pgs.filter((pg) =>
    pg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pg.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='container'>
        <div className='entryarea'>
          <input
            type='text'
            className='hov'
            placeholder='Search by city or PG Name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </div>
      </div>

      <div className='search-items'>
        {filteredPGs.length > 0 ? (
          filteredPGs.map((pg) => (
            <div key={pg._id} className='pg-card' onClick={() => handlePGClick(pg)}>
              <img
                src={pg.imageUrl ? pg.imageUrl : 'https://via.placeholder.com/150'} // Fallback for missing images
                alt={pg.name}
                className='pg-image'
              />
              <div className='pg-details'>
                <h3>{pg.name}</h3>
                <p>{pg.address}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No PGs found</p>
        )}
      </div>
    </>
  );
};

export default Search;
