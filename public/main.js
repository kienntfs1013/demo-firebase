// Khai bao config cho Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCnF0wGC5O5TgZOSvgFz6xnti2tqasmMk8",
  authDomain: "fir-firebase-a06f6.firebaseapp.com",
  projectId: "fir-firebase-a06f6",
  storageBucket: "fir-firebase-a06f6.appspot.com",
  messagingSenderId: "483193622888",
  appId: "1:483193622888:web:523ee7037caaed122486dd",
  measurementId: "G-YKRTCEVE2R",
};

// Khoi tao firebase
firebase.initializeApp(firebaseConfig);

// Tao 1 Firestore db object
var db = firebase.firestore();

var getUsers = document.getElementById("usersList");
var usersList = [];
var btnAdd = document.getElementById("btnAdd");

btnAdd.addEventListener("click", addUser);
getUsers.addEventListener("click", onListClick);

function getData() {
  db.collection("users")
    .get()
    .then(function (querySnapshot) {
      usersList = querySnapshot.docs;
      render();
    });
}

getData();

function render() {
  var content = usersList.map(function (user) {
    var data1 = user.data();
    return (
      "<tr><td>" +
      user.id +
      "</td><td>" +
      data1.name +
      "</td><td>" +
      data1.age +
      "</td><td>" +
      data1.gender +
      "</td><td><button data-id='" +
      user.id +
      "'>Delete</button></td></tr>"
    );
  });

  getUsers.innerHTML = content.join("");
}

function getGender() {
  var gender = document.getElementsByName("gender");
  var isMale = gender[0].checked;
  var isFemale = gender[1].checked;

  if (isMale) {
    return "Male";
  }

  if (isFemale) {
    return "Female";
  }
}

function addUser() {
  var name = document.getElementById("name");
  var age = document.getElementById("age");

  if (name.value !== "") {
    var newUser = {
      name: name.value,
      age: age.value,
      gender: getGender(),
    };

    db.collection("users")
      .add(newUser)
      .then(function (docRef) {
        return docRef.get().then(function (querySnapshot) {
          name.value = "";
          age.value = "";
          usersList.push(querySnapshot);
          render();
        });
      });
  }
}

async function onListClick(event) {
  var btnDel = event.target;
  var userId = btnDel.dataset.id;
  const res = await db.collection("users").doc(userId).delete();
  getData();
}
