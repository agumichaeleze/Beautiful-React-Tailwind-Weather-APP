import React, {useState} from "react";


function SearchBar ({fetchWeather}) {
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
            setCity("");
        }
    }
    return(
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
    );
}

export default SearchBar