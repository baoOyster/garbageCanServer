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
// Import cookie parser
const cookieParser = require('cookie-parser');
// Import verifyJWT handler
const verifyJWT = require('./middleware/verifyJWT');
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

// Handle cookies
app.use(cookieParser());

/**
 * --------------Routes--------------------------------
 */
// dev api 
app.use(require('./routes/index'));
app.use('/smartCan', require('./routes/smartCan'));
// User api
app.use(verifyJWT);
app.use('/user', require('./routes/api/userSmartCan'));

// Handle errors
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Always love you in ' + PORT);
})