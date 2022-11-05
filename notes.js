const fs = require("fs");
const path = require("path");

function newNote(body, messageArray) {
    const note =body
    messageArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, 'db/db.json'),
        JSON.stringify({notes: messageArray}, null,2),
    )
    return note
}



module.exports = {
    newNote
}