const express = require('express');
const api = express.Router();

const fs = require('fs');


api.delete('/',(req,res) => {
        console.log(req.body.index);
        var data = fs.readFileSync('data.json')    
        var json = JSON.parse(data);
        console.log(json);

        var contacts = json.table;

       json.table.splice(req.body.index - 1,1);
        fs.writeFileSync('data.json', JSON.stringify(json));
        res.send();
})

api.get('/', (req,res) => {
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

api.put('/',(req,res) => {
    const contact = req.body;

 
     var data = fs.readFileSync('data.json')    
     var json = JSON.parse(data);

     json.table[req.body.index - 1].name = req.body.fullname;
     json.table[req.body.index - 1].email = req.body.email;
     json.table[req.body.index - 1].phonenum = req.body.phonenum;

     var obj = JSON.stringify(json)

     fs.writeFile('data.json',obj);
     

     res.send();
})




function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}
module.exports = api;