/*global $ APIKEY navigator*/

//Variables
var lat, lon;
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

var unit = {
    measure: 'imperial',
    symbol: '&#8457',
    change: function() {
        if (this.measure === 'imperial') {
            this.measure = 'metric';
            this.symbol = '&#8451';
        }
        else {
            this.measure = 'imperial';
            this.symbol = '&#8457';
        }
        weather.geoLocation(lat, lon)
    }
}

var weather = {
    geoLocation: function(lat, lon) {
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather",
            data: {
                lat: lat,
                lon: lon,
                units: unit.measure,
                apiKey: APIKEY
            },
            success: function(response) {
                console.log(response);
                $('#city').html(response.name);
                $('#country').html(response.sys.country);
                $('#temp').html(Math.round(response.main.temp) + `${unit.symbol}`);
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
                units: unit.measure,
                apiKey: APIKEY
            },
            success: function(response) {
                console.log(response);
                $('#city').html(response.name);
                $('#country').html(response.sys.country);
                $('#temp').html(Math.round(response.main.temp));
                // getIcon();
                // setTempColor();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus, errorThrown)
            }
        })
    }
}



// getWeather by zip
// temp conversion api call
// icon generator
