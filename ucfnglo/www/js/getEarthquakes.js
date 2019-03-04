// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable
var client;
// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on
var earthquakes;

// create the code to get the Earthquakes data using an XMLHttpRequest
function getQuestions() {
    client = new XMLHttpRequest();
    client.open('GET', 'http://developer.cege.ucl.ac.uk:30292/getQuizPoints/30292');
    client.onreadystatechange = earthquakeResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
    client.send();
}

// create the code to wait for the response from the data server, and process the response once it is received
function earthquakeResponse() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
        // once the data is ready, process the data
        var earthquakedata = client.responseText;
        loadEarthquakelayer(earthquakedata);
    }
}

// convert the received data - which is text - to JSON format and add it to the map
function loadEarthquakelayer(earthquakedata) {
    // convert the text received from server to JSON
    var earthquakejson = JSON.parse(earthquakedata);

    earthquakes = earthquakejson;

    // load the geoJSON layer using custom icon
    earthquakelayer = L.geoJson(earthquakejson,
        {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
                // also include a pop-up that shows the place value of the earthquakes
                return L.marker(latlng, {icon: testMarkerRed}).bindPopup("<b>" + feature.properties.place + "</b>")
                    .bindPopup("<b>Title: </b>"+feature.properties.question_title+"<br /><b>Question: </b>"+feature.properties.question_text).openPopup();
            },
        }).addTo(mymap);
}

//add custom icon
var testMarkerRed = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'red'
});

// change the map zoom so that all the data is shown
function getAll() {
    mymap.fitBounds(earthquakelayer.getBounds());
}