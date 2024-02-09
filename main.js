
fetch("http://localhost:3000/tache")
.then(response => response.json())
.then(body => console.log(body))

document.addEventListener('submit', () => {
    function ajouTache () {
    const àFaire = document.querySelector("#taskTitle").value;
    let newDiv = document.createElement("div");
    newDiv.classList.add("newTache");
    newDiv.textContent = àFaire;
    const zoneReponse = document.querySelector("tasks");
    zoneReponse.appendChild.àFaire;

}
})



