const express = require('express');
const api = express.Router();

let contactID = 1;

api.post('/', (req, res) => {
    const contact = req.body;
    console.log(contact);


    const newContact = {
        id: contactID++,

    }
    res.json(newContact);

    // write to a file here? 

})

module.exports = api;