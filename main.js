
fetch("http://localhost:3000/tache")
.then(response => response.json())
.then(body => console.log(body))

const àFaire = document.querySelector("#tasks");