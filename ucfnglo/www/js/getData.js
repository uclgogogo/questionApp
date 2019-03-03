var client; // the global variable that holds the request
function getData(postString) {
    client = new XMLHttpRequest();
    postString = postString + "&port_id=" + httpPortNumber;
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadQuestion";
    client.open('GET', url, true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = dataUploaded;
    client.send(postString);
}

// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
// change the DIV to show the response
        document.getElementById("question").innerHTML = client.responseText;
    }
}