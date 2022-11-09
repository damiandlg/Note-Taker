const express = require ("express");
const fs = require ('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

const notesList = require('./db/db.json')

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('public'));

//GET Function

app.get('/api/notes', (req, res) => {
  let results = notes
  if(req.query){
    results = lib.filterByQuery(req.query, results)
  }
  res.json(results)
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

// Create Note Function

function createNewNote(body, messageArray){
  const note = body;
  if (!Array.isArray(notesArrayElements)) notesArrayElements = [];

  if (notesArrayElements.length === 0) notesArrayElements.push(0);

  body.id = notesArrayElements[0];
  notesArrayElements[0]++;

  notesArrayElements.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArrayElements, null, 2)
  );
  return note;
}

//Post Function

app.post('/api/notes', (req, res) => {
  const note = newNote(req.body, notesList);
  res.json(note);
});




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!` );
  });