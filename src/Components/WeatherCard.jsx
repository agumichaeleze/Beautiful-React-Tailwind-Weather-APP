

function WeatherCard({ weather }) {
        return (
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mt-6 text-center">
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p className="text-lg capitalize">{weather.weather[0].description}</p>
           <div className="flex items-center justify-center space-x-2 mt-2">
                <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-10 h-10"
                />
                <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
           </div>
            <div className="mt-4">
                <p>Humidity: {weather.main.humidity}%</p>
                <p className="mt-2">Wind: {weather.wind.speed} m/s</p>
            </div>
            </div>
        );
}

export default WeatherCard;
