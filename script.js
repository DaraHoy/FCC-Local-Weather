/*global $ APIKEY navigator*/

//Variables
var lat, lon;
var unit = $("#unitSelect").val();
var x = navigator.geolocation;

$(document).ready(function() {
    if (navigator.geolocation) {
        x.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            $('#lat').html(lat);
            $('#long').html(lon);
            getWeather(lat, lon, unit);
        });
    }
    else {
        $('#lat').html("<p> Position coordinates not available </p> ")
    }

})

function getWeather(lat, lon, unit) {
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: {
            lat: lat,
            lon: lon,
            units: unit,
            apiKey: APIKEY
        },
        success: function(response) {
            console.log(response);
            $('#city').html(response.name);
            $('#country').html(response.sys.country);
            $('#temp').html(response.main.temp);
            $('#type').html(`${response.weather[0].main}`);
            // getIcon();
            // setTempColor();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus, errorThrown)
        }
    })
};

// getWeather by zip
// temp conversion api call
// icon generator
