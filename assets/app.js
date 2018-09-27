$(document).ready(function() {

// Initialize Firebase
var config = {
apiKey: "AIzaSyCpd7nHBpRZiErhHe7FlsesnxD30107beA",
authDomain: "train-scheduler-4af97.firebaseapp.com",
databaseURL: "https://train-scheduler-4af97.firebaseio.com",
projectId: "train-scheduler-4af97",
storageBucket: "train-scheduler-4af97.appspot.com",
messagingSenderId: "802800378133"
};
firebase.initializeApp(config);


var trains = ["B&O", "Reading Railroad", "Pennsylvania Railroad", "Short Line"];

var dataRef = firebase.database();

var train = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$("#add-train").on("click", function(event) {
    event.preventDefault();

    train = $("#trainName-id").val().trim();
    destination = $("#destination-id").val().trim();
    firstTrain = $("#firstTrain-id").val().trim();
    frequency = $("#frequency-id").val().trim();

    dataRef.ref().push({

        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

var counter = 0;

dataRef.ref().on("child_added", function(childSnapshot) {
    console.log('child added', counter++)

    // store value of firstTrain into a variable
    tTime = childSnapshot.val().firstTrain;

    // convert the first time string into a moment object
    firstTrainTime = moment(tTime, "HH:mm").subtract(1, "years");

    // take current time and store in object
    now = moment().format("HH:mm");

    // find the time, in minutes, between now and when the first train left
    timeDif = moment().diff(moment(firstTrainTime), "minutes");

    // find the number of minutes until the next train
    timeRemaining = timeDif % frequency;



    //until the moment time is < than the current time; add interval to the moment time
    

    $("#train-list").append("<tr class='well'><td class='train-name'> " +
    childSnapshot.val().train +
    // Use <tr> instead of <span>
    " </td><td class='train-destination'> " + childSnapshot.val().destination +
    " </td><td class='frequency'> " + childSnapshot.val().frequency + 
    " </td></tr>");


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

});