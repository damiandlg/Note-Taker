const express = require ("express");
const fs = require ('fs');
const path = require('path');
const {notes} = require ('./db/db.json');
const lib = require ('./notes')

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

function newNote(body, messageArray){
  const note = body
  messageArray.push(note)
  fs.writeFileSync(
    path.join(__dirname,"db/db.json"),
    JSON.stringify({notes: messageArray}, null, 2),
  )
  return note
}

app.get('/api/notes', (req, res) => {
  let results = notes
  if(req.query){
    results = lib.filterByQuery(req.query, results)
  }
  res.json(results)
})

app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString()
  const note = newNote(req.body, notes)
  res.json(note)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})


app.listen(PORT, () => {
    console.log("API server now on https;//localhost/" + PORT );
  });