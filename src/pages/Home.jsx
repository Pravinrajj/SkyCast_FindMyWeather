import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (city.trim() === '') {
        setError('City name cannot be empty');
        return;
        }
        localStorage.setItem('city', city.trim());
        navigate('/weather');
    }, [city, navigate]);

    return (
        <div className="container">
        <h2>Enter City Name</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={city}
            onChange={(e) => {
                setCity(e.target.value);
                setError('');
            }}
            placeholder="e.g., London"
            />
            <button type="submit">Get Weather</button>
        </form>
        {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Home;