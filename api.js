const express = require('express');
const api = express.Router();

let contactID = 1;

api.post('/user', (req, res) => {
    const contact = req.body;
    console.log(contact);


    const newContact = {
        id: contactID++,

    }
})

module.exports = api;