// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [zipCode, setZipCode] = useState('');
//   const [address, setAddress] = useState('');
//   const [radius, setRadius] = useState(10);
//   const [resources, setResources] = useState([]);
//   const [error, setError] = useState('');

//   // Handle zip code search
//   const handleZipCodeSearch = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await axios.get(`http://localhost:5001/api/resources/zipCode/${encodeURIComponent(zipCode)}`);
//       setResources(response.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Handle address search
//   const handleAddressSearch = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:5001/api/resources/address', { address, radius });
//       setResources(response.data);
//     } catch (err) {
//       setError('Failed to fetch resources by address');
//     }
//   };

//   return (
//     <div>
//       <h1>Find Resources</h1>
      
//       {/* Zip Code Form */}
//       <form onSubmit={handleZipCodeSearch}>
//         <label htmlFor="zipCode">Enter Zip Code:</label>
//         <input
//           type="text"
//           id="zipCode"
//           value={zipCode}
//           onChange={(e) => setZipCode(e.target.value)}
//           required
//         />
//         <button type="submit">Search</button>
//       </form>
      
//       {/* Address/City Form */}
//       <form onSubmit={handleAddressSearch}>
//         <label htmlFor="address">Enter Address or City:</label>
//         <input
//           type="text"
//           id="address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />
//         <input 
//           type="number" 
//           value={radius} 
//           min="1" 
//           max="50" 
//           step="1" 
//           onChange={(e) => setRadius(Number(e.target.value))} 
//         />
//         <button type="submit">Search</button>
//       </form>

//       {/* Display results */}
//       {error && <p>{error}</p>}
//       <ul>
//         {resources.map((resource) => (
//           <li key={resource._id}>
//             <h3>{resource.name}</h3>
//             <p>{resource.type}</p>
//             <p>{resource.address}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Results from './pages/Results';
import Details from './pages/Details';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/results" element={<Results />} />
                <Route path="/details/:id" element={<Details />} />
            </Routes>
        </Router>
    );
};

export default App;
