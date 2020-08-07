var startAddress = [-75.1327, 40.0115];

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZy1hIiwiYSI6ImNrYzZkemU2YzA4ZWsyc21vYTR6NThyYWwifQ.VcryYXrvjlwWwsnO-TcbRg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: startAddress,
    zoom: 13
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));