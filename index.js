const express = require('express');
const http = require('http');
const { homedir } = require('os');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promoRouter = require('./routes/promoRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use('/dishes', dishRouter);
app.use('/dishes/:dishId', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/leaders/:leaderId', leaderRouter);
app.use('/promos', promoRouter);
app.use('/promos/:promoId', promoRouter);

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