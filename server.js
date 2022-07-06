//*--------MODULES IMPORT-------------------------------------------------------
const express = require('express'); //import express
require("dotenv").config();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const sq = require("./db/queries")

const connection = require("./db/mysql2connect")

//*----------IMPORT OF ROUTES---------------------------------------------------
/* const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const machineRoutes = require('./routes/machineRoute'); */
const dialogRoutes = require("./routes/dialogRoute");
const appRoutes = require("./routes/appRoute");
//----------IMPORT OF CONFIGS---------------------------------------
const PORT = process.env.PORT || 3003;

//---------CORS OPTIONS--------------------------------------------------------
const corsOptions = {
  origin: '*',
};
//---------DB CONNECTION AND CONFIGURATION-------------------------------------

//Initialization of a new day, should been invoke automatically every day

//----------SERVER--------------------------------------------------------------
const app = express();
app.listen(PORT, () => console.log('Listening on port ' + PORT)); //listen accetta due param, il primo specifica la potra su cui ascolta il secondo può essere una funzione
app.use(cors(corsOptions)); //Passing cors options to cors and app
app.use(express.json({ limit: '1mb' })); //Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing.
app.use('/api/dialog', dialogRoutes);
app.use('/api/app',appRoutes);