const { query } = require("express");
const fs = require("fs");
const path = require("path");

function createNewNote(body, messageArray) {
    const note =body
    messageArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, 'db/db.json'),
        JSON.stringify({notes: messageArray}, null,2),
    )
    return note
}

function findById(id, messageArray){
    const result = messageArray.filter(note => note.id === query.id)[0];
    return result
}
function findByQuery(query, messageArray){
    let filterResults = messageArray;
    if (query.title) {
        filterResults = filterResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filterResults = filterResults.filter(note => note.type === query.text);
    }
    return filterResults;
}



module.exports = {
    findByQuery,
    findById,
    createNewNote
}