const express = require('express');
const app = express();
const PORT = 5000;
// Using .env variable
require('dotenv').config();
// Import credentials
const credentials = require('./middleware/credentials');
// Import Cors 
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
// Import errorHandler
const errorHandler = require('./middleware/errorHandler');
// Connect to db
require('./db/conn');

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Handle cors
app.use(cors(corsOptions));

// Handle body parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/**
 * --------------Routes--------------------------------
 */
app.use('/smartCan', require('./routes/smartCan'));


// Handle errors
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Always love you in ' + PORT);
})