var cityHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

console.log(searchHistory);

$("#btn").on("click", function(event) {
  event.preventDefault();

  var cityDiv = $("<div>");
  var cityInput = $("#input")
    .val()
    .trim();

  cityDiv.text(cityInput);

  cityHistory.push(cityInput);

  localStorage.setItem("cityHistory", JSON.stringify(cityHistory));

  cityDiv.prependTo(lastCities);
  getCurrentWeather();
});
