const apiKey = "688a6305adf69c31b3e7baa0c37dc4d3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&appid="; // appid moved here

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${apiKey}&q=${city}`); // Correct URL construction
        if (!response.ok) {
            // Handle HTTP errors (e.g., 404 Not Found)
            const message = `HTTP error! status: ${response.status}`;
            throw new Error(message);  
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Display an error message to the user
        document.querySelector(".city").innerHTML = "Error fetching weather data"; // Or a more specific message
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});