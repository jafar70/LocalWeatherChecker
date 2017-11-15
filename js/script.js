var lat, longD;

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var longD = position.coords.longitude;
      getURLLink(lat, longD);
    });
  }
  // Function that get the url
  function getURLLink(lat, LongD) {
    var URL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      LongD +
      "&units=metric&appid=9e0b617178c83958f80c183e975d46ec";

    $.getJSON(URL, function(x) {
      var roundNumber = Math.round(x.main.temp);
      $(".LocationName").append(x.name + " ," + x.sys.country);
      $(".Tempa").append(roundNumber + " &#8451;");
      $(".TypeofWeather").append(x.weather[0].main);
      $(".image").append(
        '<img src="https://openweathermap.org/img/w/' +
          x.weather[0].icon +
          '.png"' +
          "/>"
      );

      var action = 1;

      $(".link").on("click", viewSomething);

      function viewSomething() {
        if (action == 1) {
          var FahrenheitTemp = Math.round(x.main.temp * 9 / 5 + 32);
          $(".Tempa").html(FahrenheitTemp + " &#8457;");
          $("#newQuote").text("Convert to Celsius");
          action = 2;
        } else {
          $(".Tempa").html(roundNumber + " &#x2103;");
          $("#newQuote").text("Convert to Fahrenheit");
          action = 1;
        }
      }
    });
  }
});
