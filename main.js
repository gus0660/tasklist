// fonction pour afficher une nouvelle tache rentrée dans le input et l'afficher dans le html

// const { response } = require("express");

// comme il faut commencer notre programme par une détection du click "submit", cela démarrera par un addEventListener au submit
// comme cet evenement doit se produire sur un element javascript, il faut transformer l'element html ou se trouve le bouton
// en variable javascript. donc ce bouton se trouve dans la div "taskForm" donc on commence par établir la variable formEl de "taskForm"
const formEL = document.querySelector("#taskForm");
formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  postTache();
});
//bon faut tout refaire pour envoyer la nouvelle tache dans la base de données

function postTache() {
  const titreAfaire = document.querySelector("#taskTitle").value;
  const contentAfaire = document.querySelector("#taskContent").value;
  // après les 2 premieres const il faut créer une const qui sera en json donc entre accolades{} regroupant les objets à envoyer
  // ces objets se composent comme suit : (colonne de la table BD) (:) (const définie avec .value)
  const tacheData = {
    tacheTitre: titreAfaire,
    tacheContent: contentAfaire,
  };
  // connection à la base de données avec un fetch et une fonction
  fetch("http://localhost:3000/tache", {
    // on précise d'abord la méthode : 'POST'
    method: "POST",
    // on décrit ensuite le type du header (en json {})
    //  'Content-Type': 'application/json' est une ligne qui indique au serveur que les données que vous envoyez sont au format JSON.
    headers: {
      "Content-Type": "application/json",
    },
    // JSON.stringify() prend un objet JavaScript et le transforme en une chaîne de texte JSON pour faciliter le partage ou le stockage des données.
    body: JSON.stringify(tacheData),
  })
    // dés que la promesse est faite(.then de response) tu me fait la(ou les) fonctions :
    .then((response) => {
      // SI la response est ok alors tu console.log
      if (response.ok) {
        console.log("Tâche ajoutée avec succès !");
        // MAIS SURTOUT la div #tasks donc zoneReponse doit être vidée cela donne innerHTML = ""
        zoneReponse.innerHTML = "";
        // Réactualisation de l'affichage des tâches depuis la base de données
        loadTache();
      } else {
        // sinon un log dans la console pour dire "Erreur lors de ect..."
        console.error("Erreur lors de l'ajout de la tâche.");
      }
    })
    // si le FETCH échoue on peut attrapper(catch) l'erreur(error) générée et on peut console.log ou alert...
    .catch((error) => {
      console.error("Erreur lors de la requête:", error);
    });
}

loadTache();
// je veu aller chercher les taches qui sont dans la base de données et les afficher dans le html
// pour cela je dois faire une fonction "loadTache" qui va aller chercher les taches dans la Base de Données
const zoneReponse = document.querySelector("#tasks");
function loadTache() {
  // connection à la base de données avec un fetch

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
        const deleteBouton = document.createElement("button");
        const afaireBouton = document.createElement("button");
        deleteBouton.textContent = "suprimer";
        deleteBouton.addEventListener("click", function () {
          deleteTache(tache.idTache);
        });
        afaireBouton.textContent = "A faire";
        afaireBouton.className = "boutonAfaire";
        afaireBouton.addEventListener('click', () => {
          gotoDoing(newDiv)
        })
        newHtrois.textContent = tache.tacheTitre;
        newP.textContent = tache.tacheContent;
        newDiv.appendChild(newHtrois);
        newDiv.appendChild(newP);
        newDiv.appendChild(deleteBouton);
        newDiv.appendChild(afaireBouton);
        zoneReponse.appendChild(newDiv);
      });
    });
}

function deleteTache(idTache) {
  fetch(`http://localhost:3000/tache/${idTache}`, { 
    method: "DELETE",
    
  })
    .then((response) => {
      if (response.ok) {
        console.log("Tâche supprimée avec succès !");
        // Recharger les tâches après la suppression
        loadTache();
      } else {
        console.log("Erreur lors de la suppression de la tâche.");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête:", error);
    });
}
// faire une fonction d'affichage 'gotoDoing' pour pouvoir déplacer une tache de la div "#tasks" à la div "#tasksDoing"
// en cliquant sur le bouton 'A faire'
function gotoDoing(newDiv) {
  // Supprimer la tâche de la div "#tasks"
  newDiv.remove();
  const boutAf = newDiv.querySelector(".boutonAfaire");
  boutAf.remove();
  // Ajouter la tâche à la div "#tasksDoing"
  const tasksDoing = document.querySelector("#tasksDoing");
  tasksDoing.appendChild(newDiv);
}