//libs
const express = require('express');
const app = express();
const cors = require('cors');

//db initialization
const db = require('./db');
const alterTableToApplyDataStructure = require('./db/alterTableToApplyDataStructure');
alterTableToApplyDataStructure(db);

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow sending credentials such as cookies
}));

app.use(express.json());

// Routes initialization
const routes = require('./routes');
routes(app);

app.listen('8080', () => {
    console.log('Server running on port 8080');
});