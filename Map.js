/**
 * Created by Hannu on 26.9.2016.
 */


var markers=[];
var contents = [];
var infowindows = [];
var map;

var xmlhttp = new XMLHttpRequest();
var url = "http://api.citybik.es/v2/networks/citybikes-helsinki";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr.network);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function initMap() {
    var myLatLng = {lat: 60.171190, lng: 24.937892};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
    });
}

function myFunction(arr) {
    var i;

    for(i = 0; i < arr.stations.length; i++) {
        var asemaLatLong = {lat: arr.stations[i].latitude, lng: arr.stations[i].longitude};
        markers[i] = new google.maps.Marker({
            position: asemaLatLong,
            map: map,
            title: 'samplemarker'
        });

        markers[i].index = i; //add index property
        contents[i] = arr.stations[i].name + "<br>"  +"Pyöriä vapaana: " + arr.stations[i].free_bikes + "<br> " + "Pyöriä käytössä: " + arr.stations[i].empty_slots

        infowindows[i] = new google.maps.InfoWindow({
            content: contents[i],
            maxWidth: 300
        });

        google.maps.event.addListener(markers[i], 'click', function() {
            console.log(this.index); // this will give correct index
            console.log(i); //this will always give 10 for you
            infowindows[this.index].open(map,markers[this.index]);
            map.panTo(markers[this.index].getPosition());

        });



    }
}