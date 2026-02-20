import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ activeTab, setActiveTab, unit, toggleUnit, favorites, onSearch }) => {
    const tabs = [
        { id: 'current', label: 'Current Weather' },
        { id: 'history', label: 'Forecast / History' },
        { id: 'features', label: 'API Features' },
    ];

    return (
        <nav className="nav-container">
            <div className="nav-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="nav-actions">
                {favorites && favorites.length > 0 && (
                    <select
                        className="favorites-select"
                        onChange={(e) => {
                            if (e.target.value) {
                                onSearch(e.target.value);
                                e.target.value = ""; // Reset selection
                            }
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Saved Cities</option>
                        {favorites.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                )}
                <button className="unit-toggle" onClick={toggleUnit}>
                    {unit === 'metric' ? '°C' : '°F'}
                </button>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    unit: PropTypes.string.isRequired,
    toggleUnit: PropTypes.func.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.string),
    onSearch: PropTypes.func,
};

export default Navbar;
