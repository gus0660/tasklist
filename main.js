// fonction pour afficher une nouvelle tache rentrée dans le input et l'afficher dans le html

// comme il faut commencer notre programme par une détection du click "submit", cela démarrera par un addEventListener au submit
// comme cet evenement doit se produire sur un element javascript, il faut transformer l'element html ou se trouve le bouton
// en variable javascript. donc ce bouton se trouve dans la div "taskForm" donc on commence par établir la variable formEl de "taskForm"
const formEL = document.querySelector("#taskForm");
formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  loadTache();
});
//bon faut tout refaire pour envoyer la nouvelle tache dans la base de données


function postTache() {
  const titreAfaire = document.querySelector("#taskTitle").value;
  const contentAfaire = document.querySelector("#taskContent").value;
  // après les 2 premieres const il faut créer une const qui sera en json donc entre acolades{} regroupant les objets à envoyer
// ces objets se composent comme suit : (colonne de la table BD) (:) (const définie avec .value)
  const tacheData = {
    tacheTitre: titreAfaire,
    tacheContent: contentAfaire
  };
  // connection à la base de données avec un fetch et une fonction
  fetch("http://localhost:3000/tache", {
// on précise d'abord la méthode : 'POST'
method: 'POST',
// on décrit ensuite le type du header (en json {}) et le body qui est un stringify de tacheData
  headers: {
    'Content-Type': 'application/json'
  },
  // JSON.stringify() prend un objet JavaScript et le transforme en une chaîne de texte JSON pour faciliter le partage ou le stockage des données.
  body:JSON.stringify(tacheData)
  })
  .then(response => {
    if (response.ok) {
      console.log('Tâche ajoutée avec succès !');
      // Réactualisation de l'affichage des tâches depuis la base de données
      loadTache();
    } else {
      console.error('Erreur lors de l\'ajout de la tâche.');
    }
  })
  .catch(error => {
    console.error('Erreur lors de la requête:', error);
  });

  // let newDiv = document.createElement("div");
  // newDiv.style.border = "1px solid black";
  // newDiv.style.borderRadius = "10px"; // Ajout du border-radius
  // newDiv.style.margin = "10px"; // Ajout du margin
  // newDiv.style.backgroundColor = "#42ecf5";
  // let newHtrois = document.createElement("h3");
  // let newP = document.createElement("p");
  // newDiv.classList.add("newTache");
  // newHtrois.textContent = titreAfaire;
  // newP.textContent = contentAfaire;
  // newDiv.appendChild(newHtrois);
  // newDiv.appendChild(newP);
  // zoneReponse.appendChild(newDiv);
}
loadTache();

// je veu aller chercher les taches qui sont dans la base de données et les afficher dans le html
// pour cela je dois faire une fonction "loadTache" qui va aller chercher les taches dans la Base de Données
const zoneReponse = document.querySelector("#tasks");
function loadTache() {
  // connection à la base de données avec un fetch
  // const url = "http://localhost:3000/tache";
  fetch("http://localhost:3000/tache")
    .then((response) => response.json())
    .then((response) => {
      response.forEach((tache) => {
        const newDiv = document.createElement("div");
        newDiv.style.border = "1px solid black";
        newDiv.style.borderRadius = "10px"; // Ajout du border-radius
        newDiv.style.margin = "10px"; // Ajout du margin
        newDiv.style.backgroundColor = "#42ecf5";
        const newHtrois = document.createElement("h3");
        const newP = document.createElement("p");
        newHtrois.textContent = tache.tacheTitre;
        newP.textContent = tache.tacheContent;
        newDiv.appendChild(newHtrois);
        newDiv.appendChild(newP);
        zoneReponse.appendChild(newDiv);

        console.log(tache.tacheContent);
      });
    });
}
