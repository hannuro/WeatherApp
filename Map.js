/**
 * Created by Hannu on 26.9.2016.
 */


var markers=[];
var contents = [];
var infowindows = [];
var map;
var closeIndex = [];

var image = {
    url: "bicycle.png"
};


var xmlhttp2 = new XMLHttpRequest();
var url2 = "http://api.citybik.es/v2/networks/citybikes-helsinki";

xmlhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr2 = JSON.parse(this.responseText);
        myFunction2(myArr2.network);
    }
};
xmlhttp2.open("GET", url2, true);
xmlhttp2.send();

function initMap() {
    var myLatLng = {lat: 60.171190, lng: 24.937892};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
    });
}


function myFunction2(arr2) {
    var i;

    for(i = 0; i < arr2.stations.length; i++) {
        var asemaLatLong = {lat: arr2.stations[i].latitude, lng: arr2.stations[i].longitude};
        markers[i] = new google.maps.Marker({
            position: asemaLatLong,
            map: map,
            icon: image,
            title: arr2.stations[i].name
        });

        closeIndex[i] = 0;
        markers[i].index = i; //add index property
        contents[i] = arr2.stations[i].name + "<br>"  +"Pyöriä vapaana: " + arr2.stations[i].free_bikes + "<br> " + "Pyöriä käytössä: " + arr2.stations[i].empty_slots

        infowindows[i] = new google.maps.InfoWindow({
            content: contents[i],
            maxWidth: 300
        });

        google.maps.event.addListener(markers[i], 'click', function() {
            if(closeIndex[this.index] == 0) {
                console.log(this.index); // this will give correct index
                console.log(i); //this will always give 10 for you
                infowindows[this.index].open(map, markers[this.index]);
                map.panTo(markers[this.index].getPosition());
                closeIndex[this.index] = 1;
            }
            else{
                infowindows[this.index].close();
                closeIndex[this.index] = 0;
            }

        });
    }
}