const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // middleware -> continue to look for specific end point below
})
.get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end("Will Save the dish");
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported!");
})
.delete((req, res, next) => {
    res.end("Deleting all dishes...");
});

module.exports = dishRouter;