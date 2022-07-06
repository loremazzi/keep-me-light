
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
const dialogRoutes = require("./routes/dialogRoute");
const appRoute = require("./routes/appRoute");
//----------IMPORT OF CONFIGS ANF MODELS---------------------------------------
const PORT = process.env.PORT || 3003;

//----------SERVER--------------------------------------------------------------
const app = express();
app.use(express.json());
app.use(cors(corsOptions)); //Passing cors options to cors and app
app.listen(PORT, () => console.log('Listening on port ' + PORT)); //listen accetta due param, il primo specifica la potra su cui ascolta il secondo può essere una funzione
/// TODO CHIEDERE app.use(express.static(path.join("/var/www/html/PlastTec_client", 'build')));

// app.use(express.static('public')); //Per gestire i file statici, quali immagini, file CSS e file JavaScript, utilizzare la funzione middleware integrata express.static in Express.
 //Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing.
/* app.use(bodyparser.json()); //per convertire direttamente l'input in JSON cosi non besetemmio a salvare i dati nel db
app.use(bodyparser.urlencoded({ extended: true })); */
/* app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/machine', machineRoutes);
app.use('/api/user', userRoutes); */
app.use('/api/app', appRoute);
app.use('/api/dialog', dialogRoutes);

app.get('/*', function (req, res) {
  
});
