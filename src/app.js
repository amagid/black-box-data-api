// DISCLAIMER: I built this server in about 8 hours. It is not meant to show
// good practice, though it is loosely based on my template application which
// I use for builting production applications. Please read the comments before
// copying any of this, as they will say where I cut corners for speed's sake.
// ============================================================================


// Disable some of the more obscure and risky features of Javascript
'use strict';

// Module imports go at the top of your file. Store them in -const-
// variables to stop any accidental modifications

// This is a common pattern - Import built-in modules first
const http = require('http');
const request = require('request');

// Then import downloaded dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ws = require('ws');

// Finally, import modules from our application
const config = require('../config').get();
const logger = require('./services/logger');
const routes = require('./routes');

// Create our Express application instance - will be configured later
const app = express();

// Configure Express application routes
setUpAPI();


// Create a native Node.js webserver and tell it to forward all requests
// it receives directly to our Express application for processing.
// You can also put a custom function where "app" is
const server = http.Server(app);

// Create a websocket server and configure it. The difference between this
// and the Express server is that this one manages persistent multi-message
// connections with clients, while the Express application only manages
// one-off API calls
setUpSocket(new ws.Server(config.ws));

// Tell the HTTP server to listen on the port number in our config file
server.listen(process.env.PORT || config.app.port);
logger.info(`Server listening on port ${process.env.PORT || config.app.port}`);


function setUpAPI() {
    // General middlewares which will make your life easier.
    // HTTP requests go through your middlewares in the order in which they
    // were attached using the app.use() function, which is why we attach
    // our API routes last. That way, other request processing happens first.

    // Morgan automatically logs every HTTP request to the console
    app.use(morgan('dev'));
    // HTTP request body data comes in as a string by default.
    // BodyParser will parse that string into JSON live objects which you can
    // then modify or use as you want. This data will be available on request.body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // Add our API route structure and handlers to the application
    // Express Routers represent sections of your API with a shared URL prefix
    // That is, if I said app.use('/hereIsA', router) and the router
    // defined a route at '/CustomAPIEndpoint', then that route would be
    // available at http://your.website.com/hereIsA/CustomAPIEndpoint
    const router = express.Router();

    // Assign the routes we imported from src/routes/index.js to the Router
    routes(router);

    // Set the Router to be called on the root of our API (all routes)
    app.use('/', router);
}

// This function is DEFINITELY NOT GOOD PRACTICE! I built this because
// I realized last-minute that this thing should support persistent websocket
// connections, so it just defines an RPC-like language and forwards all
// messages directly to the Express API.
function setUpSocket(wsServer) {
    // Listen for new connections. Every time a new connection is made, this
    // function will be called automatically with the connection data in -socket-
    wsServer.on('connection', socket => {
        // New connection has been received
        console.log('Connection Received');

        // Tell the client on the other end of this new connection we hear them
        socket.emit('connected', 'connected');

        // Register this function to run when this connection breaks for any reason
        socket.on('disconnect', () => {
            console.log('Connection Terminated');
        });

        // Just defining a dictionary for converting requested actions to the
        // required HTTP request verbs (GET, POST, PATCH, or DELETE)
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

        // Register this function to run whenever a new message is received from this client
        socket.on('message', msg => {
            // The message is required to be JSON. Parse it into a live object
            let message = JSON.parse(msg);

            // If the entityType field in the message was "user"
            if (message.entityType === 'user') {
                // Use Node's built-in Request library to send an HTTP message
                // To our Express server, and return the result to our client
                return request({
                    // We are sending JSON, need to specify that in the message
                    headers: {'content-type' : 'application/json'},
                    // Send it to our Express API & generate the relevant URL
                    url: 'http://localhost:' + config.app.port + '/api/users/' + (message.userId || ''),
                    // Get the HTTP verb from our dictionary
                    method: httpActions.user[message.action],
                    // Put the request data into the HTTP message body as a string
                    body: JSON.stringify(message.data)
                }, (val, raw, result) => {
                    // This function runs when we get a result from the express server.
                    // Send the result back to the client.
                    socket.send(JSON.stringify({ type: 'userActionResponse', result: JSON.parse(result)}));
                });
            // If this request wanted to deal with Project entities
            } else {
                // Generate the request, send it to the Express API and send back to the client
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