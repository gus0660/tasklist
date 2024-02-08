const àFaire = document.querySelector("#tasks");

// fetch("http://localhost:3000/tache")
//     .then(userFetch => userFetch.text())
//     .then(body => console.log(body))
fetch("http://localhost:3000/tache")
.then(response => response.json())
.then(body => console.log(body))
// .catch(error => alert("Erreur : " + error));