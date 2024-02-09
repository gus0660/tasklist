// fonction pour afficher une nouvelle tache rentrée dans le input et l'afficher dans le html..ne fonctionne pas pour l'instant

const formEL = document.querySelector("#taskForm");
formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  ajouTache();
});

function ajouTache() {
  const titreAfaire = document.querySelector("#taskTitle").value;
  const contentAfaire = document.querySelector("#taskContent").value;
  const zoneReponse = document.querySelector("#tasks");
  let newDiv = document.createElement("div");
  let newHtrois = document.createElement("h3");
  let newP = document.createElement("p");
  newDiv.classList.add("newTache");
  newHtrois.textContent = titreAfaire;
  newP.textContent = contentAfaire;
  newDiv.appendChild(newHtrois);
  newDiv.appendChild(newP);
  zoneReponse.appendChild(newDiv);
}

// je veu aller chercher les taches qui sont dans la base de données et les afficher dans le html
// connection à la base de données avec un fetch
fetch("http://localhost:3000/tache")
// quand tu as fini(.then) la réponse(response) je fait(=>) une response en json(response.json)
  .then((response) => response.json())
  //1) Parcourir les tâches récupérées
  //2) Créer un élément div pour chaque tâche
  //3) Créer des éléments pour afficher les détails de la tâche
  //4) Ajouter les éléments à la div de la tâche
  //5) Ajouter la div de la tâche à la div des tâches
//   .then((response) => console.log(response))
