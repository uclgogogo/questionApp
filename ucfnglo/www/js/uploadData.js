function startDataUpload() {

    //get the textbox values
    var question_title = document.getElementById("question_title").value;
    var question_text = document.getElementById("question_text").value;
    var answer_1 = document.getElementById("answer_1").value;
    var answer_2 = document.getElementById("answer_2").value;
    var answer_3 = document.getElementById("answer_3").value;
    var answer_4 = document.getElementById("answer_4").value;
    var postString = "question_title=" + question_title + "&question_text=" + question_text;
    postString = postString + "&answer_1=" + answer_1 + "&answer_2=" + answer_2;
    postString = postString + "&answer_3=" + answer_3 + "&answer_4=" + answer_4;


    // now get the radio button values
    if (document.getElementById("choose_1").checked) {
        postString = postString + "&correct_answer="+1;
    }

    if (document.getElementById("choose_2").checked) {
        postString = postString + "&correct_answer="+2;
    }

    if (document.getElementById("choose_3").checked) {
        postString = postString + "&correct_answer="+3;
    }

    if (document.getElementById("choose_4").checked) {
        postString = postString + "&correct_answer="+4;
    }


    // now get the geometry values
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;


    //call the function
    if (!question_text || !question_title || !answer_1 || !answer_2 || !answer_3 || !answer_4  || !longitude || !latitude) {
        alert('Required field cannot be empty')
    } else {
        processData(postString)
    }
}

var client; // the global variable that holds the request
function processData(postString) {
    client = new XMLHttpRequest();
    postString = postString + "&port_id=" + httpPortNumber;
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadQuestion";
    client.open('POST', url, true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = dataUploaded;
    client.send(postString);
}

// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
    if (client.readyState == 4) {
// change the DIV to show the response
        document.getElementById("dataUploadResult").innerHTML = client.responseText;
    }
}


