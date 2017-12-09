/*global $ APIKEY navigator*/

//Variables
var lat, long;
var tempUnit = 'C';
var x = navigator.geolocation;

$(document).ready(function() {
    if (navigator.geolocation) {
        x.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            $('#lat').html(lat);
            $('#long').html(lon);
            getWeather(lat, lon);
        });
    }
    else {
        $('#lat').html("<p> Position coordinates not available </p> ")
    }

})

function getWeather(lat, lon) {
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: {
            lat: lat,
            lon: lon,
            apiKey: APIKEY
        },
        success: function(response) {
            console.log(response);
            $('#city').html(response.name);
            $('#country').html(response.sys.country);
                        // $('#temp').html(response.weather[0].main);
            // $('#type').html(response.weather[0].main);
            // $('#icon').html(response.weather[0].main);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus, errorThrown)
        }
    })
};
