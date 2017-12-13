 var config = {
    apiKey: "AIzaSyAh8v2ig-c3AfH_2nQ9WNhXw4wXMoQ_w2M",
    authDomain: "fir-hw-3443b.firebaseapp.com",
    databaseURL: "https://fir-hw-3443b.firebaseio.com",
    projectId: "fir-hw-3443b",
    storageBucket: "fir-hw-3443b.appspot.com",
    messagingSenderId: "573400959912"
  };
  firebase.initializeApp(config);

//linking firebase database
var database = firebase.database();

//making an on click event for submit
$("#submit").on("click", function(){
	event.preventDefault();

	var trainName = $("#f-name").val().trim();
	var trainDestination = $("#f-destination").val().trim();
	var trainTime = $("#f-time").val().trim();
	var trainFrequency = $("#f-frequency").val().trim();
	
	//trouble line
	var nextTrain = moment($("#f-time").val().trim(), "HH:mm").subtract(10, "years").format("X");

	database.ref().push({
		trainName: trainName,
		trainDestination: trainDestination,
		trainFirstTime: trainTime,
		trainFrequency: trainFrequency,

	});
});

database.ref().on("child_added", function (childSnapShot){
		var tableRow = $("<tr>");
		
		var tdName = $("<td>");
		tdName.text(childSnapShot.val().trainName);
		
		var tdDestination = $("<td>");
		tdDestination.text(childSnapShot.val().trainDestination);

		var tdTime = $ ("<td>");
		tdTime.text(childSnapShot.val().trainFrequency);

		var tdFrequency = $("<td>");
		tdFrequency.text(childSnapShot.val().trainFirstTime);

		//need help with this line
		var timeOne = moment().diff(moment.unix(tdFrequency), "minutes");
		var timeTwo = moment().diff(moment.unix(tdFrequency), "minutes") % tdTime;
		var timeThree = tdTime - tdFrequency;

		//also this line
		var arrival = moment().add(timeThree, "m").format("hh:mm A");


		// tableRow.append(arrival);
		tableRow.append(tdName);
		tableRow.append(tdDestination);
		tableRow.append(tdTime);
		// tableRow.append(tdFrequency);
		$("#train-table").prepend(tableRow);
});

