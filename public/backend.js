// Set the configuration for your app
var firebaseConfig = {
    apiKey: "AIzaSyCtFjJt-cITgKBmX9yFTJPMbcxZtZsU-ks",
    authDomain: "senior-prank19.firebaseapp.com",
    projectId: 'senior-prank19'
};

firebase.initializeApp(firebaseConfig);

var store = firebase.firestore().collection("data").doc("cards");

// get index
var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

// getting cardsLeft from database
store.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        var holder = doc.data()['cardsLeft'];
        var ts = doc.data()['timeOfUpdate'];
        var tsCurrent = Date();
        if (url.searchParams.get("id") == 20190604) {
            // if current time is more than 7 seconds greater than last timestamp
            if (tsCurrent.getTime() > ts.toDate().getTime() + 7000) {
                holder = holder - 1;
                store.update({cardsLeft: holder});
                store.update({timeOfUpdate: fromDate(tsCurrent)});
            }
        }
        document.getElementById("cl").innerHTML = holder;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
        
