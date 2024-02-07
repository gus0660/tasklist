const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
app.use(express.json());

// informations de connexion databases
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
  port: "3306",
});
// connexion
db.connect((err) => {
  if (err) {
    console.log("Erreur de connexion à la base données" + err);
    return;
  }
  console.log("connecté à la base de données");
});
// selectionne toute les taches
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tache", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
// selectionne une tache en rapport à son id
app.get(`/tasks/:id`, (req, res) => {
  let id = req.params.id;
  db.query(`SELECT * FROM tache WHERE idTache = ${id}`, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// selectionne les taches en rapport à leur status (idstatus)
app.get(`/tasks/status/:id`, (req, res) => {
  let id = req.params.id;
  db.query(
    `SELECT tacheTitre, tacheContent, labelStatus FROM tache JOIN status ON idstatus = status_idstatus WHERE idstatus = ${id}`,
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    }
  );
});
// selectionne tout les taches archivées avec leurs titres et la date d'archivage
app.get("/archivetache", (req, res) => {
  // db.query("SELECT * FROM tacheTitre, archivedat JOIN archivedtache ON idTache = idarchive", (err, results) => {
    db.query("SELECT tacheTitre, archiveDate FROM archivetache JOIN tache ON idTache = Tache_idTache",(err,results) => {
      
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//je doit poster une nouvelle tache donc avec un titre et un descriptif
app.post('/tache', (req, res) => {//dans ma table (database) je demande une request"req" et une reponse"res"
  const { tacheTitre, tacheContent } = req.body;//création de variable "tacheTitre et tacheContent" que je dois aller cherché dans le body de la request "req"
  const status_idStatus = 2;//creation de variable"status_idStatus" et qui établit la valeur par défaut "2" qui correspond à "à faire" dans la table "status"
  const isFinished = 0;
})