/**
 * Created by Hannu on 22.9.2016.
 */

var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?q=Helsinki%2Cfi&units=metric&appid=114332134ea7ed53cb7a0e88a863eb5d";
var imageUrl = "http://openweathermap.org/img/w/";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var cityName = arr.name;
    var country = arr.sys.country;

    var temp = arr.main.temp;
    temp = Math.round(temp); // pyöristetään lämpötila
    temp += " &#8451"; // lisätään lämpötilaan celsius merkki

    var clouds = arr.weather[0].description;
    clouds = clouds.charAt(0).toUpperCase() + clouds.slice(1); // tehdään ensimmäisestä kirjaimesta iso

    var humidity = arr.main.humidity;
    humidity += " %";

    var pressure = arr.main.pressure;
    pressure += " hpa";

    var coords = {lon: arr.coord.lon, lat: arr.coord.lat};
    var wind = {speed: arr.wind.speed, deg: arr.wind.deg};

    imageUrl += arr.weather[0].icon + ".png"; // liitetään img urliin iconin tunnus

    img = document.getElementById("image"); // haetaan image
    img.src = imageUrl; // lisätään imagelle lähde


    var outOtsikko = "Weather in " + cityName + ", " + country;

    var outTable = '<tr><th>Wind</th>' + '<th>Cloudiness</th>' + '<th>Pressure</th>' + '<th>Humidity</th>' +
        '<th>Geo coords</th></tr>';

    outTable += '<tr><th>' + wind.speed + " m/s, " + wind.deg + '</th><th>' + clouds + '</th><th>' + pressure + '</th><th>' + humidity + '</th><th>' +
        coords.lat + ", " + coords.lon + '</th></tr>';

    document.getElementById("otsikko").innerHTML = outOtsikko;
    document.getElementById("info").innerHTML = outTable;
    document.getElementById("saa").innerHTML += temp;

}