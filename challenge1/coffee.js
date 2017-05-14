var defaultList = [22, 14, 3, 4, 37, 6, 7, 81, 9, 10];
var average;


/*I did some online reading on the best way to shuffle an array, and looked at
 the Fisher-Yates shuffle method, and the Durstenfeld shuffle method, and decided 
 on the Durstenfeld method
*/
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//Here's the function to do the averaging
function baseballStats () {
	var sum = 0;
	for( var i = 0; i < defaultList.length; i++ ){
	    sum += parseInt( defaultList[i], 10 );

	};

	average = sum/defaultList.length;
};

//function for the button click to display the reandomized set
function letsDoThis() {
	shuffleArray(defaultList);
	document.getElementById("resultsBit").innerHTML = defaultList;
};

function displayAverage() {
	baseballStats();
	document.getElementById("averageResults").innerHTML = average;
	console.log(average);
};

// Here is the little bit to get the JSON file
var tableInfo;
var request = new XMLHttpRequest();
request.open('GET', 'http://bptest.net/devtest/data.php', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    console.log("Success!");
    tableInfo = JSON.parse(request.responseText);
  } 
  else {
    console.log("We reached our target server, but it returned an error");
  }
};

request.onerror = function() {
  console.log("There was a connection error of some sort");
};

//Here's where we'll build the table
function tableBuildingTime (){
	var tableHeading = document.getElementById("yeOldeTable");
	for (var key in tableInfo) {
		//define the keys we'll use
		var tableRow = document.createElement("tr");
		var myFirstName = document.createElement("td");
		var myLastName = document.createElement("td");
		var myEmail = document.createElement("td");
		var myGender = document.createElement("td");
		//apply text to dom elements
		myFirstName.textContent = tableInfo[key].firstname;
		myLastName.textContent = tableInfo[key].lastname;
		myEmail.textContent = tableInfo[key].email;
		myGender.textContent = tableInfo[key].gender;
		//build it
		tableRow.appendChild(myFirstName);
		tableRow.appendChild(myLastName);
		tableRow.appendChild(myEmail);
		tableRow.appendChild(myGender);

		tableHeading.appendChild(tableRow);

		console.log(tableInfo[key].firstname);
	};
};



//gets the JSON file
request.send();

