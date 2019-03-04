function trackAndCircle() {
	trackLocation();
	addPointLinePoly();
	getQuestions();
	getPort();
	loadW3HTML();
	getAll()
}

function startup() {
document.addEventListener('DOMContentLoaded', function() {
trackAndCircle ();
}, false);
}

function loadW3HTML() {
		w3.includeHTML();
	}