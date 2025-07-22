import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Weather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const city = localStorage.getItem('city');
    const navigate = useNavigate();

    useEffect(() => {
        if (!city) {
            navigate('/');
            return;
        }

        const fetchWeather = async () => {
            try {
                const res = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=5c90715be5954158a5295453251107&q=${city}`
                );
                setWeather(res.data);
            } catch (err) {
                console.error('Failed to fetch weather:', err);
                setWeather(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city, navigate]);

    const tempF = useMemo(() => {
        return weather ? (weather.current.temp_c * 9) / 5 + 32 : null;
    }, [weather]);

    if (loading) return <p>Loading...</p>;
    if (!weather) return <p>Could not fetch weather. Try again.</p>;

    return (
        <div className="container">
            <h2>Weather in {weather.location.name}</h2>
            <div className="card">
                <p><strong>Condition:</strong> {weather.current.condition.text}</p>
                <p><strong>Temperature:</strong> {weather.current.temp_c} °C / {tempF.toFixed(2)} °F</p>
                <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
                <p><strong>Wind Speed:</strong> {weather.current.wind_kph} kph</p>
            </div>
        </div>
    );
}

export default Weather;