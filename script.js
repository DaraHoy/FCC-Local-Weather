/*global $ APIKEY navigator*/

//Variables
var lat, lon;
var zipCode = false; // zipCode causing bad request error
var lastZip = '';
var x = navigator.geolocation;

// Get weather based on location
$(document).ready(function() {
    if (x) {
        x.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            weather.geoLocation(lat, lon);
        });
    }
    else { //alert to input zip
        alert('input zip')
    }
})

var weather = {
    unitType: 'imperial',
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
                $('#temp').html(Math.round(response.main.temp) + `${weather.unitSymbol} in ${response.name}`);
                // getIcon();
                // setTempColor();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus, errorThrown)
            }
        })
    },
    zip: function(zip) {
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
                $('#temp').html(Math.round(response.main.temp) + `${weather.unitSymbol} in ${response.name}`);
                // getIcon();
                // setTempColor();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus, errorThrown)
            }
        })
    },
    changeUnit: function() {
        if (this.unitType === 'imperial') {
            this.unitType = 'metric';
            this.unitSymbol = '&#8451';
        }
        else {
            this.unitType = 'imperial';
            this.unitSymbol = '&#8457';
        }
        weather.update();
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



// getWeather by zip
// temp conversion api call
// icon generator
