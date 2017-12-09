const express = require('express');
const api = express.Router();

const fs = require('fs');

/*
filePath = __dirname+'/data.json';
var object = {table:[]};

fs.readFile('data.json', function(err,data){
    if(err) {
        console.log(err);
    }  else {

        if (!isEmpty(data)&& data !== null) {
            object = JSON.parse(data);
            console.log(object[object.table.length-1]);
           //contactID = object[object.lenth-1].id+1;
        }  else {
            contactID = 1;
        }
        

    }

});

*/


api.get('/', (req,res) => {
    console.log("2. Here");
    res.setHeader('content-type','application/javascript');
    fs.readFile('data.json', function(err,data) {
    
        res.send(data);
    })
})

// create a variable for the contact ID value.
var contactID;



api.post('/', (req, res) => {

    var temp;
    

    
    const contact = req.body;


    const newContact = {
        id: 0,
        name: req.body.fullname,
        email: req.body.email,
        phonenum: req.body.phonenum
    }

    console.log("1."+ JSON.stringify(newContact));
    
    filePath = __dirname+'/data.json';
      
    var obj = { table:[]};
   
    var json = JSON.stringify(obj);
    
    fs.readFile('data.json', function(err, data) {
        if(err) {
            console.log(err);
        }  else {


            if (!isEmpty(data)&& data !== null) {
                temp = JSON.parse(data);
                var tempJSON = JSON.stringify(temp);
                console.log("4."+temp.table);
                console.log("2. last id is "+temp.table[temp.table.length-1].id);
                newContact.id = Number((temp.table[temp.table.length-1].id) ) + 1;
                
            } 

            else {
                console.log("3. contactID = 1");
                newContact.id= 1;
            }




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