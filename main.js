const àFaire = document.querySelector("#tasks");

// fetch("http://localhost:3000/tache")
//     .then(userFetch => userFetch.text())
//     .then(body => console.log(body))
fetch("http://localhost:3000/tache")
.then(response => response.json())
.then(response => alert(JSON.stringify(response)))
.catch(error => alert("Erreur : " + error));