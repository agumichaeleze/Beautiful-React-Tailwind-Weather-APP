import { useState } from 'react'
import SearchBar from './Components/SearchBar'
import axios from 'axios';
import WeatherCard from './Components/WeatherCard';
import video from './assets/video.mp4';
function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "http://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");

    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await  axios.get(url);
      console.log(response.data);
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
  }

  return (
   <div className='bg-green-100 min-h-screen flex flex-col items-center justify-center relative overflow-hidden'>
      <video className='absolute top-0 left-0 object-cover w-full h-full' autoPlay loop muted playsInline>
        <source src={video} type='video/mp4'/>
        Your browser does not support the video tag
      </video>
      <div className='absolute top-0 left-0 w-full h-full bg-black/20 z-1'></div>
      <div className='bg-black/70 text-white rounded-md p-8 shadow-lg max-w-md z-10'>
        <h1 className='text-4xl font-bold text-center'>Weather App</h1>
        <SearchBar fetchWeather={fetchWeather}/>
        {error && <p className='text-center text-red-600 mt-4'>{error}</p>}
        {loading && <p className='text-center mt-4'>Loading...</p>}
        {weather &&  <WeatherCard weather={weather}/>}
      </div>
   </div>
  )
}

export default App
