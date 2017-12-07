const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
 const apiRouter = require('./api');


const app = express();

 app.set("view engine","ejs");


app.set("views",path.resolve(__dirname,"website"));


// path to client side Javascript
const assetsPath = path.resolve(__dirname,"website/assets");
app.use(express.static(assetsPath));

app.get('/', (req,res)=> {
    res.render('index')
})

 app.use('/api',apiRouter);

app.listen(8080);
console.log('Listening on 8080:');
