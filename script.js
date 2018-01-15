/*global $ APIKEY navigator*/

/*NOTES
Currently No element available to update zipcode, use weather.zip(zip)
example: weather.zip('02909') in console to try search method.
using this method will update the weather icon to the zipcode*/

var lat, lon;
var zipCode = false;
var lastZip = '';
var x = navigator.geolocation;

$(document).ready(function() {
    if (x) {
        x.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            weather.geoLocation(lat, lon);
            $('#convert').click(function() {
                weather.changeUnit();
            });
        });
    }
    else {
        alert('input zip')
    }
})

var weather = {
    unitType: 'imperial', //unit set to 'imperial' by default
    unitSymbol: '&#8457',
    geoLocation: function() {
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather",
            data: {
                lat: lat,
                lon: lon,
                units: weather.unitType,
                apiKey: APIKEY
            },
            success: function(response) {
                console.log(response)
                $('#city').html(`${response.name}, ${response.sys.country}`);
                $('#localTemp').html(`${Math.round(response.main.temp)}`);
                $('#unitSymbol').html(`${weather.unitSymbol}`);
                $('#condition').html(`<img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png"></img><br><p>${response.weather[0].main.toUpperCase()}</p>`);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus, errorThrown)
            }
        })
    },
    zip: function(zip) { //API call based on zip provided
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather",
            data: {
                zip: zip,
                units: weather.unitType,
                apiKey: APIKEY
            },
            success: function(response) {
                console.log(response);
                zipCode = true;
                lastZip = zip;
                $('#city').html(`${response.name}, ${response.sys.country}`);
                $('#localTemp').html(`${Math.round(response.main.temp)}`);
                $('#unitSymbol').html(`${weather.unitSymbol}`);
                $('#condition').html(`<p>${response.weather[0].main.toUpperCase()}</p><img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png"></img>`);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus, errorThrown)
            }
        })
    },
    changeUnit: function() { //Unit conversion
        if (this.unitType === 'imperial') {
            this.unitType = 'metric';
            this.unitSymbol = '&#8451';
        }
        else {
            this.unitType = 'imperial';
            this.unitSymbol = '&#8457';
        }
        this.update();
    },
    update: function() {
        if (zipCode === true) {
            weather.zip(lastZip);
        }
        else {
            weather.geoLocation();
        }
    }
}
