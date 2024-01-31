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
// selectionne tout les taches archivées avec leurs titres et la date d'archivage( A RECTIFIER !!)
app.get("/archived", (req, res) => {
  db.query("SELECT * FROM taskTitle, archivedat FROM tache JOIN archivedtache ON idTache = tache_idTache", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});