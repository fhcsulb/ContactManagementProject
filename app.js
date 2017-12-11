const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
 const apiRouter = require('./api');

const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;


const app = express();

 app.set("view engine","ejs");


app.set("views",path.resolve(__dirname,"website"));

// Serve up content from public directory
app.use(express.static(__dirname + '/website'));

// path to client side Javascript
const assetsPath = path.resolve(__dirname,"website/assets");
app.use(express.static(assetsPath));

// ! important: to parse request JSON as req.body
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/', (req,res)=> {
    res.render('index')
})

 app.use('/api',apiRouter);

app.listen(port);
console.log('Listening on 8080:');
