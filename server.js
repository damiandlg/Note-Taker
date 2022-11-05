const express = require ("express");
const fs = require ('fs');
const path = require('path');
require {notes} = require ('./db/db.json');
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
    path.join(__dirname,'./db/db.son'),
    JSON.stringify({notes: messageArray}, null, 2),
  )
  return note
}
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log("API server now on https;//localhost/" + PORT );
  });