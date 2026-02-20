import React from 'react';
import PropTypes from 'prop-types';
import { Wind, Droplets, MapPin, CloudSun, Star } from 'lucide-react';

const CurrentWeather = ({ data, unit, favorites, toggleFavorite }) => {
    if (!data) return null;

    const {
        name,
        main: { temp, humidity, feels_like, temp_min, temp_max, pressure },
        wind: { speed },
        weather,
    } = data;

    const weatherCondition = weather[0];
    const isFavorite = favorites.includes(name);

    const getTemp = (t) => {
        if (unit === 'imperial') {
            return Math.round((t * 9) / 5 + 32);
        }
        return Math.round(t);
    };

    const getSpeed = (s) => {
        if (unit === 'imperial') {
            return Math.round(s * 2.237);
        }
        return s;
    };

    const tempUnit = unit === 'metric' ? '°C' : '°F';
    const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

    return (
        <div className="weather-card current-weather">
            <div className="header">
                <h2>
                    <MapPin className="inline-icon" size={24} /> {name}
                </h2>
                <div className="header-actions">
                    <button
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={() => toggleFavorite(name)}
                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Star size={24} fill={isFavorite ? 'gold' : 'none'} color={isFavorite ? 'gold' : '#fff'} />
                    </button>
                    <span className="date">{new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <div className="main-info">
                <div className="temp-container">
                    <h1 className="temp">{getTemp(temp)}{tempUnit}</h1>
                    <p className="condition">{weatherCondition.description}</p>
                    <p className="feels-like">Feels like {getTemp(feels_like)}{tempUnit}</p>
                </div>
                <div className="icon-container">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@4x.png`}
                        alt={weatherCondition.description}
                        className="weather-icon-lg"
                    />
                </div>
            </div>

            <div className="details-grid">
                <div className="detail-item">
                    <Droplets size={20} />
                    <span>Humidity</span>
                    <strong>{humidity}%</strong>
                </div>
                <div className="detail-item">
                    <Wind size={20} />
                    <span>Wind Speed</span>
                    <strong>{getSpeed(speed)} {speedUnit}</strong>
                </div>
                <div className="detail-item">
                    <CloudSun size={20} />
                    <span>High / Low</span>
                    <strong>{getTemp(temp_max)}° / {getTemp(temp_min)}°</strong>
                </div>
                <div className="detail-item">
                    <span>Pressure</span>
                    <strong>{pressure} hPa</strong>
                </div>
            </div>
        </div>
    );
};

CurrentWeather.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        main: PropTypes.shape({
            temp: PropTypes.number,
            humidity: PropTypes.number,
            feels_like: PropTypes.number,
            temp_min: PropTypes.number,
            temp_max: PropTypes.number,
            pressure: PropTypes.number,
        }),
        wind: PropTypes.shape({
            speed: PropTypes.number,
        }),
        weather: PropTypes.arrayOf(
            PropTypes.shape({
                main: PropTypes.string,
                description: PropTypes.string,
                icon: PropTypes.string,
            })
        ),
    }),
    unit: PropTypes.string.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleFavorite: PropTypes.func.isRequired,
};

export default CurrentWeather;
