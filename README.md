# SkyCast - Find My Weather
## Date:
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
### Home.jsx:
```jsx
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
```

### Weather.jsx:
```jsx
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
```

### App.jsx:
```jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
}

export default App;

```
## Output:
<img width="871" height="411" alt="image" src="https://github.com/user-attachments/assets/00ede542-2702-4621-b901-5087f2165f3b" />
<img width="693" height="474" alt="image" src="https://github.com/user-attachments/assets/9089085d-c126-4d7f-b777-e3a2e0fe3018" />

## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
