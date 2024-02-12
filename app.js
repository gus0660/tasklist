const express = require("express");
var cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
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
app.get("/tache", (req, res) => {
  db.query("SELECT * FROM tache where status_idstatus = 1", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
// selectionne une tache en rapport à son id
app.get(`/tache/:id`, (req, res) => {
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
app.get(`/tache/status/:id`, (req, res) => {
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
  db.query(
    "SELECT tacheTitre, archiveDate FROM archivetache JOIN tache ON idTache = Tache_idTache",
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    }
  );
});

//je doit poster une nouvelle tache donc avec un titre et un descriptif qui doit être "à faire"
app.post("/tache", (req, res) => {
  //dans ma table (database) je demande une request"req" et une reponse"res"... je recois la "req" et j'emet une "res"
  const { tacheTitre, tacheContent } = req.body; //création de variable {tacheTitre et tacheContent} que je dois aller cherché dans le body de la request "req"? ENTRE {} veut dire que je veut du "json" et dans celui-ci je veu "tacheTitre et tacheContent"
  const status_idStatus = 1; //creation de variable"status_idStatus" et qui établit la valeur par défaut "2" qui correspond à "à faire" dans la table "status"
  const isFinished = 0; //création de la constante "isFinished" définie par défaut à 0
  const query =
    "INSERT INTO `tache` (`tacheTitre`, `tacheContent`, `tacheDate`, `tacheFinished`, `status_idStatus`) VALUE (?, ?, NOW(), ?, ?)";
  db.query(
    query,
    [tacheTitre, tacheContent, isFinished, status_idStatus],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error adding the Task" });
      } else {
        res
          .status(201)
          .json({ message: "Task successfully added (OK ToutVaBien)" });
      }
    }
  );
});
//  je veu supprimer une tache, par exemple la derniere que j'ai envoyé
app.delete("/tache/:id", (req, res) => {
  const suprim = req.params.id;
  db.query(`DELETE FROM tache WHERE idTache = ${suprim}`, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ message: "ok tache supprimé" });
    }
  });
});

// reponse de CHATGPT

// Dans votre code, vous avez défini une route DELETE à l'URL /tache, mais vous essayez d'extraire des paramètres de la requête
// en utilisant req.params, ce qui est incorrect pour une requête DELETE.
// Lorsque vous définissez une route comme app.delete("/tache", ...), cela signifie que vous attendez une requête DELETE à l'URL /tache,
//  mais vous n'avez pas défini de paramètres dans cette route.
// Pour supprimer la dernière tâche que vous avez envoyée, vous devez envoyer l'identifiant de la tâche à supprimer dans le corps de la
// requête DELETE ou dans les paramètres de l'URL. Ensuite, vous pouvez extraire cet identifiant de la requête et l'utiliser dans votre
// requête SQL pour supprimer la tâche correspondante.

// Voici comment vous pouvez le faire en utilisant les paramètres de l'URL :

// app.delete("/tache/:id", (req, res) => {
// const idTache = req.params.id;
// db.query(`DELETE FROM tache WHERE idTache = ${idTache}`, (err, results) => {
// if (err) {
// res.status(500).send(err);
// } else {
// res.status(201).json({ message: "ok tache supprimé" });
// }
// });
// });

// Avec cette modification, vous devez envoyer une requête DELETE à l'URL /tache/123, par exemple, où 123 est l'identifiant de la
// tâche que vous souhaitez supprimer. Ensuite, req.params.id sera égal à 123, et vous pouvez l'utiliser pour supprimer la tâche
// correspondante de votre base de données. Assurez-vous également que le nom de la colonne dans votre table de base de données
// correspond à idTache si c'est celui que vous utilisez dans votre requête DELETE.

// app.listen(port, () => {
// console.log(`Exemple app nlistening on port ${port}`);
// });
