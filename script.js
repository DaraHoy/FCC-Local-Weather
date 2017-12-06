/*global $ APIKEY navigator*/
$(document).ready(function() {
    //Variables
    var lat = "";
    var long = "";
    var id = "";

    //Geoloaction to gather lat, long, city data
    function getLocation() {
        console.log(navigator.Geolocation.getCurrentPosition(showPosition))
    }
    getLocation()


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
