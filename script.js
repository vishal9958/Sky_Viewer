const apiKey = "7e2e69cbfa794aa788381009250906"; // 🔁 Replace with your actual WeatherAPI key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const dateElem = document.getElementById("date");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const themeToggle = document.getElementById("themeToggle");
const uv = document.getElementById("uv");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feelsLike");


// Convert WeatherAPI icon URL to emoji fallback
function getWeatherEmoji(text) {
  const map = {
    Sunny: "☀️",
    Clear: "🌕",
    Overcast: "☁️",
    Cloudy: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Mist: "🌫️",
  };
  for (let key in map) {
    if (text.includes(key)) return map[key];
  }
  return "🌤️";
}

function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
  const weather = data.current;
  const location = data.location;

  cityName.textContent = `${location.name.toLowerCase()}`;
  dateElem.textContent = new Date(location.localtime).toDateString();
  condition.textContent = weather.condition.text;
  temperature.textContent = `${Math.round(weather.temp_c)}°`;
  document.getElementById("feelsLike").textContent = `${Math.round(weather.feelslike_c)}°`;
  humidity.textContent = `${weather.humidity}%`;
  wind.textContent = `${weather.wind_kph} km/h`;
  pressure.textContent = `${weather.pressure_mb} hPa`;
  weatherIcon.textContent = getWeatherEmoji(weather.condition.text);
  uv.textContent = `${weather.uv} ${weather.uv >= 6 ? '(High)' : weather.uv >= 3 ? '(Moderate)' : '(Low)'}`;
})

    .catch((err) => {
      alert("❌ Error: " + err.message);
    });
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});



