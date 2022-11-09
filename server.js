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

app.get("/api/notes", (req, res) => {
  res.json(notesList.notes);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

// Create Note Function

function createNewNote(body){
  const note = body;
  notesList.notes.push(note)
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesList)
  )
}

//Post Function

app.post('/api/notes', (req, res) => {
  console.log(req.body)
  createNewNote(req.body)
  res.send(200)
});




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!` );
  });