import { useState, useEffect } from 'react'
import SearchBar from './Components/SearchBar'
import axios from 'axios';
import WeatherCard from './Components/WeatherCard';
import video from './assets/video.mp4';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");

    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      console.log("Weather data:", response.data);
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found.");
      } else {
        setError("An error occurred, Please type in correct city");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };



  // ✅ Fetch by latitude & longitude (Geolocation)
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const url = `${API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      console.log("Weather data by coords:", response.data);
      setWeather(response.data);
    } catch (err) {
      setError("Unable to fetch weather for your location.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

    // ✅ Get user location on first load
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            fetchWeatherByCoords(latitude, longitude);
          },
          (err) => {
            console.error(err);
            setError("Location access denied. Please search by city.");
          }
        );
      } else {
        setError("Geolocation not supported by your browser.");
      }
    }, []);

  return (
        <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
          {/* Background video */}
          <video
            className="absolute top-0 left-0 object-cover w-full h-full"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag
          </video>

          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-[1]"></div>

          {/* Content */}
          <div className="bg-black/70 text-white rounded-md p-8 shadow-lg max-w-md z-10">
            <h1 className="text-4xl font-bold text-center">Weather App</h1>
            <SearchBar fetchWeather={fetchWeather} />
            {error && <p className="text-center text-red-600 mt-4">{error}</p>}
            {loading && <p className="text-center mt-4">Loading...</p>}
            {weather && <WeatherCard weather={weather} />}
          </div>
        </div>
  );
}

export default App;
