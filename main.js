
fetch("http://localhost:3000/tache")
.then(response => response.json())
.then(body => console.log(body))


function ajouTache () {
    const àFaire = document.querySelector("#taskTitle").value;

}
