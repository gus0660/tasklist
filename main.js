// fonction pour afficher une nouvelle tache rentrée dans le input et l'afficher dans le html..ne fonctionne pas pour l'instant

const { response } = require("express");

const formEL = document.querySelector("#taskForm");
formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  ajouTache();
});

// function ajouTache() {
//   const titreAfaire = document.querySelector("#taskTitle").value;
//   const contentAfaire = document.querySelector("#taskContent").value;
//   const zoneReponse = document.querySelector("#tasks");
//   let newDiv = document.createElement("div");
//   let newHtrois = document.createElement("h3");
//   let newP = document.createElement("p");
//   newDiv.classList.add("newTache");
//   newHtrois.textContent = titreAfaire;
//   newP.textContent = contentAfaire;
//   newDiv.appendChild(newHtrois);
//   newDiv.appendChild(newP);
//   zoneReponse.appendChild(newDiv);
// }

// je veu aller chercher les taches qui sont dans la base de données et les afficher dans le html
// pour cela je dois d'abord faire une fonction "loadTache" qui va aller chercher les taches dans la Base de Données
// cette fonction sera appelée quand je ferrais une fonction d'affichage pour afficher les taches de la BD
function loadTache(response) {
// connection à la base de données avec un fetch  
  fetch("http://localhost:3000/tache")
  // quand tu as fini(.then) la réponse(response) ensuite tu me fait une fonction(=>) une response en json(response.json)
  .then((response) => response.json())
  // quand tu as fini(.then) cette response, ensuite tu me fait une fonction(=>) la fonction viewTache de response que je vais concevoir après
  .then(response => viewTache(response))
  // tu "catch" l'erreur(error) ensuite tu me fait une fonction alert avec le texte "erreur : " vuivi du code de error
  .catch(error => alert("erreur : " + error))
}



//1) quand tu as fini tu met en place une fonction "affichTache"
.then(affichTache => {
    const zoneReponse = document.querySelector("#tasks");
//2) Parcourir les tâches récupérées
response.forEach(element => {
    let newDiv = document.createElement("div");
});
} )   


//3) Créer un élément div pour chaque tâche
//4) Créer des éléments pour afficher les détails de la tâche
//5) Ajouter les éléments à la div de la tâche
//6) Ajouter la div de la tâche à la div des tâches
//   .then((response) => console.log(response))
