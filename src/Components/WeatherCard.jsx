

function WeatherCard({ weather }) {
        return (
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mt-6 text-center">
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p className="text-lg">{weather.weather[0].description}</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="mx-auto"
            />
            <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p className="font-bold">Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>
        );
}

export default WeatherCard;
