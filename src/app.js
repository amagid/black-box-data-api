'use strict';
const http = require('http');
const request = require('request');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ws = require('ws');

const config = require('../config').get();
const logger = require('./services/logger');
const routes = require('./routes');

const app = express();

setUpAPI();

const server = http.Server(app);

setUpSocket(new ws.Server(config.ws));

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


function setUpSocket(wsServer) {
    wsServer.on('connection', socket => {
        console.log('Connection Received');
        socket.emit('connected', 'connected');

        socket.on('disconnect', () => {
            console.log('Connection Terminated');
        });

        const httpActions = {
            user: {
                getAll: 'get',
                getById: 'get',
                create: 'post',
                update: 'patch',
                delete: 'delete'
            },
            project: {
                getAll: 'get',
                getById: 'get',
                getByUserId: 'get',
                create: 'post',
                update: 'patch',
                delete: 'delete'
            }
        }

        socket.on('message', message => {
            message = JSON.parse(message);
            if (message.entityType === 'user') {
                return request({
                    headers: {'content-type' : 'application/json'},
                    url: 'http://localhost:' + config.app.port + '/api/users/' + (message.userId || ''),
                    method: httpActions.user[message.action],
                    body: JSON.stringify(message.data)
                }, (val, raw, result) => {
                    socket.send(JSON.stringify({ type: 'userActionResponse', result: JSON.parse(result)}));
                });
            } else {
                return request({
                    headers: {'content-type' : 'application/json'},
                    url: 'http://localhost:' + config.app.port + '/api/projects/' + (message.action == 'getByUserId' ? `by-user/${message.userId}` : (message.projectId || '')),
                    method: httpActions.project[message.action],
                    body: JSON.stringify(message.data)
                }, (val, raw, result) => {
                    socket.send(JSON.stringify({ type: 'projectActionResponse', result: JSON.parse(result)}));
                });
            }
        });
    });
}