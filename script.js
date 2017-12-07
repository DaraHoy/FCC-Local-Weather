/*global $ APIKEY navigator*/
$(document).ready(function() {
    //Variables
    var lat = document.getElementById("latitude");
    var long = document.getElementById("longitude");
    var x = navigator.geolocation;

    x.getCurrentPosition(success, failure);

    function success(position) {
        var myLat = position.coords.latitude;
        var myLong = position.coords.longitude;
        $('#lat').html(myLat);
        $('#long').html(myLong);
    }

    function failure() {
        $('#lat').html("<p> Position coordinates  not available </p> ")
    }


    //Geoloaction to gather lat, long, city data


    function showPosition(position) {
        lat.value = position.coords.latitude;
        long.value = position.coords.longitude;
    }


    $.ajax({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        data: {
            zip: '02907',
            apiKey: APIKEY
        },
        success: function(data) {
            console.log(data);
        },
        fail: function() {
            console.log(500)
        }
    })

})
