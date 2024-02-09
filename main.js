
// fonction pour afficher une nouvelle tache rentrée dans le input et l'afficher dans le html..ne fonctionne pas pour l'instant

// document.addEventListener('submit', () => {
//     function ajouTache () {
//     const àFaire = document.querySelector("#taskTitle").value;
//     let newDiv = document.createElement("div");
//     newDiv.classList.add("newTache");
//     newDiv.textContent = àFaire;
//     const zoneReponse = document.querySelector("tasks");
//     zoneReponse.appendChild.àFaire;
// }
// })

// je veu aller chercher les taches qui sont dans la base de données et les afficher dans le html

fetch("http://localhost:3000/tache")
.then(response => response.json())
.then(body => console.log(body))
