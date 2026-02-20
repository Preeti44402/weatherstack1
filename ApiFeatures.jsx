import React from 'react';

const ApiFeatures = () => {
    return (
        <div className="weather-card">
            <h2>API Features & Integration</h2>
            <p>This dashboard is powered by the OpenWeatherMap API. The following features are integrated:</p>

            <ul className="feature-list">
                <li>
                    <strong>Current Weather Data</strong>:
                    <p>Access current weather data for any location including over 200,000 cities.</p>
                    <code className="api-endpoint">GET /data/2.5/weather</code>
                </li>
                <li>
                    <strong>5 Day / 3 Hour Forecast</strong>:
                    <p>5 day forecast is available at any location or city.</p>
                    <code className="api-endpoint">GET /data/2.5/forecast</code>
                </li>
                <li>
                    <strong>Geocoding API</strong> (Implicit):
                    <p>We use the built-in city search functionality to resolve locations.</p>
                </li>
            </ul>

            <div className="api-status">
                <span className="status-indicator online"></span> API Status: Online
            </div>
        </div>
    );
};

export default ApiFeatures;
