const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  uuid,
  writeToFile,
} = require("../helpers/utils");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes.`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    console.log(newNote);

    readAndAppend(newNote, "./db/db.json");
    res.json(newNote);
  } else {
    res.error("Error in adding note");
  }
});

notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);

  const requestedId = req.params.id.toLowerCase();

  readFromFile("./db/db.json").then((data) => {
    if (requestedId) {
      let notes = JSON.parse(data);
      for (let i = 0; i < notes.length; ++i) {
        if (requestedId === notes[i].id) {
          notes.splice(i, 1);

          writeToFile("./db/db.json", notes);
          res.json("Success deleting note.");
        }
      }
    }
  });
});

module.exports = notes;
