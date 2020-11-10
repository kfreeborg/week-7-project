var newCasesEl = document.getElementById("newCases");
var totalCasesEl = document.getElementById("totalCases");
var newDeathsEl = document.getElementById("newDeaths");
var totalDeathsEl = document.getElementById("totalDeaths");
var selectCountryEl = document.getElementById("country");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

var apiSummary = "https://api.covid19api.com/summary"

function summaryData() {
  fetch(apiSummary)
    .then(response => {
      return response.json();
    })
    .then(json => {
      displaySummary(json);
    });
}

function displaySummary(json) {
  newCasesEl.textContent = json.Global.NewConfirmed.toLocaleString();
  totalCasesEl.textContent = json.Global.TotalConfirmed.toLocaleString();
  newDeathsEl.textContent = json.Global.NewDeaths.toLocaleString();
  totalDeathsEl.textContent = json.Global.TotalDeaths.toLocaleString();
}

summaryData();

let dropdown = $("#search");

dropdown.empty();

dropdown.append("<option selected='true' disabled>Select Country</option>");
dropdown.prop("selectedIndex", 0);

$.getJSON(apiSummary, function (data) {
  $.each(data.Countries, function (key, entry) {
    dropdown.append($("<option></option>").text(entry.Country).data(entry));
  })
});

$("#search").change(function () {
  var countryData = $(document.getElementById("search").selectedOptions[0]).data();

  document.getElementById("userInput").textContent = countryData.Country;
  document.getElementById("newCasesByCountry").textContent = countryData.NewConfirmed.toLocaleString();
  document.getElementById("newRecoveredByCountry").textContent = countryData.NewRecovered.toLocaleString();
  document.getElementById("newDeathsByCountry").textContent = countryData.NewDeaths.toLocaleString();
  document.getElementById("totalConfirmedByCountry").textContent = countryData.TotalConfirmed.toLocaleString();
  document.getElementById("totalRecoveredByCountry").textContent = countryData.TotalRecovered.toLocaleString();
  document.getElementById("totalDeathsByCountry").textContent = countryData.TotalDeaths.toLocaleString();

  $.ajax({
    type: "GET",
    url: "https://api.covid19api.com/country/" + countryData.Country + "?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z",
    dataType: "json",
    success: function (data) {
      // console.log(data);
    }
  })

  var zoomCountry = $(document.getElementById("search").selectedOptions[0]).data().Country;

  // add local storage here
  searchHistory.push(zoomCountry);
  localStorage.setItem("country", JSON.stringify(searchHistory));
  // console.log(zoomCountry);
  initMap();

});

let map;
var geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(0, 0);
  var mapOptions = {
    zoom: 1.5,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
  var address = document.getElementById('search').value;
  var geocoder = new google.maps.Geocoder();
  // console.log(address);
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
