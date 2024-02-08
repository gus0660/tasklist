const àFaire = document.querySelector("#tasks");

fetch('http://localhost:3000/tache')
.then (response => response.json())
.then (response => {
    response.forEach(rep => {
        
    });
})