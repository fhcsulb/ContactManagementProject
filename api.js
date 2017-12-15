const express = require('express');
const api = express.Router();

const fs = require('fs');

// HTTP DELETE
api.delete('/',(req,res) => {
       
        // read file and create JSON object
        var data = fs.readFileSync('data.json')    
        var json = JSON.parse(data);
       

        // remove the selected contact and update the file
       json.table.splice(req.body.index - 1,1);
        fs.writeFileSync('data.json', JSON.stringify(json));
        res.send();
})

// HTTP GET
api.get('/', (req,res) => {

    // read the JSON file and send the data back
    res.setHeader('content-type','application/javascript');
    fs.readFile('data.json', function(err,data) {
    
        res.send(data);
    })
})

// HTTP POST
api.post('/', (req, res) => {

    var temp;
    
    const contact = req.body;

    // create a contact object with the input data
    const newContact = {
       
        name: req.body.fullname,
        email: req.body.email,
        phonenum: req.body.phonenum
    }

    // file path to the JSON file
    filePath = __dirname+'/data.json';
    
    // create the object that will be written in to
    // it will hold the data for the contacts from the JSON file
    var obj = { table:[]};
    var json = JSON.stringify(obj);
    
    fs.readFile('data.json', function(err, data) {
        if(err) {
            console.log(err);
        }  else {

            // if the file isn't empty, create a tempJSON from the data that is read
            if (!isEmpty(data)&& data !== null) {
                temp = JSON.parse(data);
                var tempJSON = JSON.stringify(temp);

            } 

            if (!isEmpty(data)&& data !== null) {
                obj = JSON.parse(data); // now it is an object
            }

            // push the new contact into the table
            obj.table.push(newContact);
            json = JSON.stringify(obj);
            // write the contact into the JSON file. 
            fs.writeFile('data.json',json);
        }
    })



   
    res.json(newContact);

    

});

// HTTP PUT
api.put('/',(req,res) => {


    // read the JSON file
     var data = fs.readFileSync('data.json')    
     var json = JSON.parse(data);

     // update the index that was selcted by the user
     json.table[req.body.index - 1].name = req.body.fullname;
     json.table[req.body.index - 1].email = req.body.email;
     json.table[req.body.index - 1].phonenum = req.body.phonenum;

     // write the changes to the JSON file
     var obj = JSON.stringify(json)
     fs.writeFile('data.json',obj);
     

     res.send();
})


// function to check if file is empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}
module.exports = api;