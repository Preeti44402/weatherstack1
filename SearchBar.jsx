import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, onLocationSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="button" className="location-btn" onClick={onLocationSearch} title="Use my location">
                <MapPin size={20} />
            </button>
            <button type="submit" className="search-btn">
                <Search size={20} />
            </button>
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onLocationSearch: PropTypes.func.isRequired,
};

export default SearchBar;
