const express = require('express');
const api = express.Router();

const fs = require('fs');

let contactID = 1;

api.post('/', (req, res) => {
    const contact = req.body;
    console.log(contact);


    const newContact = {
        id: contactID++,
        name: req.body.fullname,
        email: req.body.email,
        phonenum: req.body.phonenum
    }

    console.log(JSON.stringify(newContact));
    
    filePath = __dirname+'/data.json';
      
    var obj = { table:[]};
   
    var json = JSON.stringify(obj);
    
    fs.readFile('data.json', function readFileCallback(err, data) {
        if(err) {
            console.log(err);
        }  else {

            if (!isEmpty(data)&& data !== null) {
                obj = JSON.parse(data); // now it is an object
            }

            
            obj.table.push(newContact);
            json = JSON.stringify(obj);
            fs.writeFile('data.json',json);
        }
    })



   
    res.json(newContact);

    

});




function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}
module.exports = api;