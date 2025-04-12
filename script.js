// ✅ Your OpenWeatherMap API key
const apiKey = "c32929872dab1ac423b5234524944de3";

// ✅ Base URL for the weather API (using metric units)
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// ✅ Select the input box and search button from the DOM
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// ✅ Select the weather icon element
const weatherIcon = document.querySelector(".weather-icon");

// ✅ Main async function to fetch and display weather data
async function checkWeather(city) {
    console.log("Fetching weather data for city:", city); // Debug log

    // 🔁 Fetch weather data from the API using fetch()
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    console.log("API Response status:", response.status); // Debug log

    // ❌ If city not found or API error
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        console.error("City not found!"); // Log error to console
    }
    else {
        // ✅ If city found, convert response to JSON
        var data = await response.json();
        console.log("Weather Data:", data); // Log the whole weather object

        // 🌆 Update city name
        document.querySelector(".city").innerHTML = data.name;

        // 🌡️ Update temperature and round it to the nearest integer
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";

        // 💧 Update humidity
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

        // 💨 Update wind speed
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        console.log("Weather Condition:", data.weather[0].main); // Log weather condition

        // 🖼️ Update weather icon based on condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "assets/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "assets/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "assets/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "assets/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "assets/mist.png";
        }

        // ✅ Show weather info and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// ✅ When the user clicks the search button
searchBtn.addEventListener("click", () => {
    const userInput = searchBox.value;
    console.log("User searched for:", userInput); // Log user input
    checkWeather(userInput);
});

