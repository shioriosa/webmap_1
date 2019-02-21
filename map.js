'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpb3Jpb3NhIiwiYSI6ImNqb3hmam5rZjI4NXEzcHB0MHRja213azEifQ.0LM_5mPLzwG7yq6QHBJqxQ'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/shioriosa/cjsdnu40y1dty1fnpav7yo984',
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {
    console.log(event.coords)
})

geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

let marker = new mapboxgl.Marker()
marker.setLngLat([-73.958336, 40.810874])
marker.addTo(map)

let popup = new mapboxgl.Popup()
popup.setHTML('Max Caffè')
marker.setPopup(popup)

let data = [
    {
        location: [-73.988062, 40.745669],
        content: 'Stumptown Coffee Roasters at Ace Hotel'
    },
    {
        location: [-74.003432, 40.738060],
        content: 'Grounded Organic Coffee & Tea House'
    },


    {
        location: [-73.974415, 40.761717],
        content: 'The Polo Bar'
    },

    {
        location: [-74.005156, 40.741611],
        content: 'Starbucks Reserve Roastery'
    },
    ]

    data.forEach(function(d) {

    let marker = new mapboxgl.Marker()    
    marker.setLngLat(d.location)
    marker.addTo(map)  

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})