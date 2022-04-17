
  var firebaseConfig = {
    apiKey: "AIzaSyBDqOpXL6ESTIzrNRgXoKaYP_1JY1-TUn4",
    authDomain: "relaycontrol11.firebaseapp.com",
    databaseURL: "https://relaycontrol11-default-rtdb.firebaseio.com",
    projectId: "relaycontrol11",
    storageBucket: "relaycontrol11.appspot.com",
    messagingSenderId: "202308184833",
    appId: "1:202308184833:web:a297eb60185bd8fc80c900"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

$(document).ready(function(){
    var database = firebase.database();
	var Relay1Status;
	var Relay2Status;

	database.ref().on("value", function(snap){
		Relay1Status = snap.val().Relay1Status;
		Relay2Status = snap.val().Relay2Status;
		if(Relay1Status == "1"){    // check from the firebase
			//$(".Light1Status").text("The light is off");
			document.getElementById("unact").style.display = "none";
			document.getElementById("act").style.display = "block";
		} else {
			//$(".Light1Status").text("The light is on");
			document.getElementById("unact").style.display = "block";
			document.getElementById("act").style.display = "none";
		}
		if(Relay2Status == "1"){
			document.getElementById("unact1").style.display = "none";
			document.getElementById("act1").style.display = "block";
		} else {
			document.getElementById("unact1").style.display = "block";
			document.getElementById("act1").style.display = "none";
		}
	});

    $(".toggle-btn").click(function(){
		var firebaseRef = firebase.database().ref().child("Relay1Status");

		if(Relay1Status == "1"){    // post to firebase
			firebaseRef.set("0");
			Led1Status = "0";
		} else {
			firebaseRef.set("1");
			Relay1Status = "1";
		}
	})
	$(".toggle-btn1").click(function(){
		var firebaseRef = firebase.database().ref().child("Relay2Status");
		if(Relay2Status == "1"){
			firebaseRef.set("0");
			Relay2Status = "0";
		} else {
			firebaseRef.set("1");
			Relay2Status = "1";
		}
	})
});