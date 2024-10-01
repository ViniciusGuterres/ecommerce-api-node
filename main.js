//libs
const express = require('express');
const app = express();

//db initialization
const db = require('./db');
const alterTableToApplyDataStructure = require('./db/alterTableToApplyDataStructure');
alterTableToApplyDataStructure(db);

// Routes initialization
const routes = require('./routes');
routes(app);

app.listen('8080', () => {
    console.log('Server running on port 8080');
});