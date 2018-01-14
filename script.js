/*global $ APIKEY navigator*/
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
            $('#unitSymbol').click(function() {
                weather.changeUnit();
            });
        });
    }
    else {
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
                console.log(response)
                $('#localTemp').html(`${Math.round(response.main.temp)}`);
                $('#unitSymbol').html(`${weather.unitSymbol}`);
                $('#city').html(`${response.name}, ${response.sys.country}`);
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
                $('#localTemp').html(`${Math.round(response.main.temp)}${weather.unitSymbol}`);
                $('#city').html(`${response.name}, ${response.sys.country}`);
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

// icon generator
