
///TODO
///CHIEDERE A JOSH COSA SONO : 
/// CORS
/// app.use(express.static(path.join("/var/www/html/PlastTec_client", 'build')));
/// 


//--------MODULES IMPORT-------------------------------------------------------
const express = require('express'); //import express
require("dotenv").config();
//TODO NON SO COSA SIA CORS 
const cors = require('cors');
const db = require("./db/database")

const path = require('path');
/* const https = require('https');
const fs = require('fs'); */
const sq = require("./db/queries")
//----------IMPORT OF ROUTES---------------------------------------------------
/* const taskRoutes = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const machineRoutes = require('./routes/machineRoute'); */
const dialogRoutes = require("./routes/dialogRoute");
//----------IMPORT OF CONFIGS ANF MODELS---------------------------------------
const PORT = process.env.PORT || 3003;
app.use(express.json());

//----------SERVER--------------------------------------------------------------
const app = express();
app.listen(PORT, () => console.log('Listening on port ' + PORT)); //listen accetta due param, il primo specifica la potra su cui ascolta il secondo può essere una funzione
app.use(cors(corsOptions)); //Passing cors options to cors and app
/// TODO CHIEDERE app.use(express.static(path.join("/var/www/html/PlastTec_client", 'build')));

//app.use(express.static('public')); //Per gestire i file statici, quali immagini, file CSS e file JavaScript, utilizzare la funzione middleware integrata express.static in Express.
app.use(express.json({ limit: '1mb' })); //Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing.
/* app.use(bodyparser.json()); //per convertire direttamente l'input in JSON cosi non besetemmio a salvare i dati nel db
app.use(bodyparser.urlencoded({ extended: true })); */
/* app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/machine', machineRoutes);
app.use('/api/user', userRoutes); */
app.use('/api/dialog', dialogRoutes);
app.get('/*', function (req, res) {
    res.sendFile(path.join("/"));
});
// require('./routes/authRoute')(app);
// require('./routes/userRoute')(app);

//--------HTTPS STUFF---------------------------------------------------------------
//da gestire con SSL di terze parti
// const options = {
// 	key: fs.readFileSync('./keys/client-key.pem'),
// 	cert: fs.readFileSync('./keys/client-cert.pem'),
// };
// const https = require('https');
// const fs = require('fs');
// ------------
// https
// 	.createServer(options, app)
// 	.listen(443, () => console.log('Listening on port 443'));
//------------