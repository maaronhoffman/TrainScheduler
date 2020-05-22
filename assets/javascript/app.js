$( document ).ready(function() {
// Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyChMAej19CkM4wroA_Vf5eifATV1Caoxns",
    authDomain: "train-scheduler-1c33e.firebaseapp.com",
    databaseURL: "https://train-scheduler-1c33e.firebaseio.com",
    projectId: "train-scheduler-1c33e",
    storageBucket: "train-scheduler-1c33e.appspot.com",
    messagingSenderId: "365131649671",
    appId: "1:365131649671:web:1f3e8474833f327ca19e22",
    measurementId: "G-7K0CLZ2PB9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var $trainName = "";
    var $trainDest = "";
    var $firstTime = "";
    var $trainFreq = "";
    var $nextArrival = "";
    var $minAway = "";

    //On Click Event on Submit to do math and store data
    $('#submitButton').on('click', function() {
    
    event.preventDefault();
    $trainName = $('#trainName').val().trim();
    $trainDest = $('#trainDest').val().trim();
    $firstTime = $('#firstTime').val().trim();
    $trainFreq = $('#trainFreq').val().trim();


    var convertTime = moment($firstTime, "HH:mm").subtract(1, "years");  	 
    var tDif = moment().diff(moment(convertTime), 'minutes'); 	
    var remainder = tDif % $trainFreq; 	 
    $minAway = $trainFreq - remainder; 	
    $nextArrival = moment().add($minAway, "m").format("hh:mm A"); 
            
    //Pushing Data to FireBase     
    database.ref().push({

    name: $trainName,
    destination: $trainDest,
    firstTime: $firstTime,
    freq: $trainFreq,
    mins: $minAway,
    arrival: $nextArrival,      

    });
    $('#trainform').trigger("reset");
    });

    //After Data is added push to that table from the FireBase
    database.ref().on("child_added", function(childSnapshot) {

    
    $("#train-form").append("<tr><td class='text-center'>" + childSnapshot.val().name +  "</td><td class='text-center'>" + childSnapshot.val().arrival +  "</td><td class='text-center'>" + childSnapshot.val().mins +  "</td></tr>")
    
    });

});