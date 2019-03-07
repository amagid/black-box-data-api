'use strict';
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const socketIO = require('socket.io');

const config = require('../config').get();
const logger = require('./services/logger');
const routes = require('./routes');

const app = express();

setUpAPI();

const server = http.Server(app);

//Set up SocketIO server for realtime services
const io = socketIO(server);

setUpSocket();

server.listen(process.env.PORT || config.app.port);
logger.info(`Server listening on port ${process.env.PORT || config.app.port}`);


function setUpAPI() {
    //General middlewares
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    //Mount routes
    const router = express.Router();
    routes(router);
    app.use('/', router);
}


function setUpSocket() {
    io.on('connection', socket => {
        console.log('Connection Received');
        socket.emit('connected', 'connected');

        socket.on('disconnect', () => {
            console.log('Connection Terminated');
        });
    });
}