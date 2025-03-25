import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchBar.css';
import searchIcon from '../assets/search.svg';
import pinIcon from '../assets/pin.svg';
import downChevronIcon from '../assets/down_chevron.svg';

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    const [cityOrZip, setCityOrZip] = useState('');
    const [address, setAddress] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        'All',
        'Insurance Navigation',
        'Primary Care',
        'Dental Care',
        'Vision Care',
        'Food Services',
        'Hygiene Resources',
        'Testing Centers',
    ];

    const handleSearch = (e) => {
        e.preventDefault();

        const searchParams = new URLSearchParams({
            cityOrZip,
            address,
            category: selectedCategory,
        });

        navigate(`/results?${searchParams.toString()}`);
    }

    return (
        <div className={`search-bar ${isLandingPage ? 'landing' : ''}`}>
            <div className="inputs">
                <div className="city-input-container">
                    <img src={searchIcon} alt="City or zip code" className="input-icon" height="30px" width="30px"/>
                    <input type="text" placeholder="City or zip code" className="input" value={cityOrZip} onChange={(e) => setCityOrZip(e.target.value)}/>
                </div>
                <div className="divider"></div>
                <div className="address-input-container">
                    <img src={pinIcon} alt="Address" className="input-icon" height="30px" width="30px"/>
                    <input type="text" placeholder="Address" className="input" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
            </div>
            <div className="filter-and-search">
                <div className="category-label">Category:</div>
                <div className="category-container">
                    <button 
                        className={`category-button ${selectedCategory ? 'active' : ''}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {selectedCategory}
                        <img src={downChevronIcon} alt="Select a category" className="category-icon"/>
                    </button>
                    {isDropdownOpen && (
                        <div className="category-dropdown">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`category-option ${selectedCategory === category ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default SearchBar;