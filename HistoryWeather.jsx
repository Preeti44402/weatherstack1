import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const HistoryWeather = ({ data, unit }) => {
    if (!data || !data.list) return null;

    // Filter to get daily forecast (approx every 24h) or show every 3h
    // Showing every 8th item (24h) for a 5-day view
    const dailyForecast = data.list.filter((_, index) => index % 8 === 0);

    const getTemp = (t) => {
        if (unit === 'imperial') {
            return Math.round((t * 9) / 5 + 32);
        }
        return Math.round(t);
    };

    const tempUnit = unit === 'metric' ? '°C' : '°F';

    return (
        <div className="history-container">
            <h3>5-Day Forecast</h3>
            <div className="forecast-grid">
                {dailyForecast.map((item) => (
                    <div key={item.dt} className="weather-card forecast-card">
                        <p className="day">{format(new Date(item.dt * 1000), 'EEEE')}</p>
                        <p className="date-small">{format(new Date(item.dt * 1000), 'MMM d')}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                        />
                        <p className="temp-small">{getTemp(item.main.temp)}{tempUnit}</p>
                        <p className="desc-small">{item.weather[0].main}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

HistoryWeather.propTypes = {
    data: PropTypes.shape({
        list: PropTypes.arrayOf(
            PropTypes.shape({
                dt: PropTypes.number,
                main: PropTypes.shape({
                    temp: PropTypes.number,
                }),
                weather: PropTypes.arrayOf(
                    PropTypes.shape({
                        icon: PropTypes.string,
                        description: PropTypes.string,
                        main: PropTypes.string,
                    })
                ),
            })
        ),
    }),
    unit: PropTypes.string.isRequired,
};

export default HistoryWeather;
