const express = require('express');
const http = require('http');
const { homedir } = require('os');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

// execute for every call
app.all('dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // middleware -> continue to look for specific end point below
});

app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
    res.end("Will Save the dish");
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported!");
});

app.delete('/dishes', (req, res, next) => {
    res.end("Deleting all dishes...");
});


app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send details of the dish: ' + req.params.dishId);
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported!");
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.end("Saving Dish: " + req.body.name + " with Details " + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end("Deleting dish: " + req.params.dishId);
});

// tells to express to look into this folder for static html will serve
app.use(express.static(__dirname + '/public'));

//next is used to call middle ware
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});