import React, {useState, useEffect} from "react";


function SearchBar ({fetchWeather}) {
        // const [city, setCity] = useState("");
        const [city, setCity] = useState(() => {
            return localStorage.getItem("city") || "";
        });

        useEffect(() => {
            localStorage.setItem("city", city)
        }, [city]);

        const handleSubmit = (e) => {
            e.preventDefault();
            if (city.trim()) {
                fetchWeather(city);
                // setCity("");
            }
        }

        const handleUseLocation = () => {
            if (navigator.geolocation) 
                {navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                fetchWeatherByCoords(latitude, longitude);
                },
                (err) => {
                alert("Unable to fetch your location. Please allow location access.");
                console.error(err);
                }
            );
            } else {
            alert("Geolocation is not supported by your browser.");
            }
        };


    return(
        <div className="flex flex-col gap-3">
            <form className="flex" onSubmit={handleSubmit}>
            <input type="text"
            placeholder="Type City Name...."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-l-md outline-0 border border-gray-300 p-2 mt-5 flex-1"/>
            <button type="submit"
            className="rounded-r-md border border-gray-300 p-2 mt-5 bg-blue-500 hover:bg-blue-600 cursor-pointer">
                Search
            </button>
        </form>
            {/* Location button */}
        <button onClick={handleUseLocation}
        className="w-full rounded-md p-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white">
            Use My Location
        </button>
        </div>
    );
}

export default SearchBar