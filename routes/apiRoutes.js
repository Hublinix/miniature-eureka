const path = require('path')
const fs = require('fs')
const app = require('express').Router()

// module.exports = (app) => {

    app.get('/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        res.status(200).json(JSON.parse(db))
    });

    app.post('/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);

        let userNote = {
            title: req.body.title,
            text: req.body.text,
        };
        
        db.push(userNote)
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);
    });

    app.delete('/notes/:id', (req, res) => {
        let db = JSON.parse(fs.readFileSync('db/db.json'))
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);

    });
// };

module.exports = app;