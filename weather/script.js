$(document).ready(function () {
  // Function to get weather by city name
  function getWeatherByCity(city) {
    const apiKey = "e6d368bd37bba75505ad8782ad7a8e5a"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        if (data.cod === 200) {
          displayWeatherInfo(data);
        } else {
          $("#weather-info").html(
            "<p>City not found. Please enter a valid city name.</p>"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching weather data:", error);
      },
    });
  }

  // Function to display weather information
  function displayWeatherInfo(data, defaultLocation = false) {
    const weatherInfo = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    if (defaultLocation) {
      $("#weather-info-default").html(weatherInfo);
    } else {
      $("#weather-info").html(weatherInfo);
    }
  }

  // Function to get weather by geolocation
  function getWeatherByGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiKey = "e6d368bd37bba75505ad8782ad7a8e5a"; // Replace with your OpenWeatherMap API key
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          $.ajax({
            url: apiUrl,
            type: "GET",
            success: function (data) {
              if (data.cod === 200) {
                displayWeatherInfo(data, true);
              } else {
                $("#weather-info").html(
                  "<p>Weather data not available for your location.</p>"
                );
              }
            },
            error: function (xhr, status, error) {
              console.error("Error fetching weather data:", error);
            },
          });
        },
        function (error) {
          console.error("Error getting geolocation:", error);
          $("#weather-info").html("<p>Geolocation data not available.</p>");
        }
      );
    } else {
      console.error("Geolocation not supported.");
      $("#weather-info").html(
        "<p>Geolocation not supported by your browser.</p>"
      );
    }
  }

  // Get weather by city name when button is clicked
  $("#get-weather").click(function () {
    const city = $("#city").val();
    getWeatherByCity(city);
  });

  // Get weather by geolocation when page loads
  getWeatherByGeolocation();
});
