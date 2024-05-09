$(document).ready(function () {
  function getWeatherByCity(city) {
    const apiKey = "e6d368bd37bba75505ad8782ad7a8e5a"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        if (data.cod == "200") {
          var ShowLocation = `<h2>${data.name}</h2>
            <p>Temp : ${Math.round(data.main.temp)}°C</p>
            <p>Weather : ${data.weather[0].description}</p>
            <p>Visibility : ${data.visibility}</p>
            `;
          $("#weather-info").html(ShowLocation);
        } else {
          $("#weather-info").html(
            "<p>City not found. Please enter a valid city name.</p>"
          );
        }
      },
      error: function (error) {
        if (error.responseJSON.cod == "404") {
          $("#weather-info").html(
            "<p>City not found. Please enter a valid city name.</p>"
          );
        }
      },
    });
  }

  $(document).on("click", "#get-weather", function () {
    const city = $("#city").val();
    if (city) {
      getWeatherByCity(city);
    } else {
      $("#weather-info").html("");
    }
  });
  function getWeatherByGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiKey = "e6d368bd37bba75505ad8782ad7a8e5a"; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        $.ajax({
          url: apiUrl,
          type: "GET",
          success: function (data) {
            if (data.cod == "200") {
              var ShowLocation = `<h2>${data.name}</h2>
                  <p>Temp : ${Math.round(data.main.temp)}°C</p>
                  <p>Weather : ${data.weather[0].description}</p>
                  <p>Visibility : ${data.visibility}</p>
                  `;
              $("#weather-info-default").html(ShowLocation);
            } else {
              $("#weather-info-default").html(
                "<p>City not found. Please enter a valid city name.</p>"
              );
            }
          },
          error: function (error) {
            if (error.cod == "404") {
              $("#weather-info-default").html(
                "<p>City not found. Please enter a valid city name.</p>"
              );
            }
          },
        });
      });
    }
  }
  getWeatherByGeoLocation();
});
