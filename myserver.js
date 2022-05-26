
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
var sqlite3 = require("sqlite3").verbose();
const path = require("path");
const db_keep = path.join(__dirname, "./db", "keep-data-light.db");


/* const db = new sqlite3.Database(db_keep, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'keep-data-light.db'");
});
 */

//---------CORS OPTIONS--------------------------------------------------------
const corsOptions = {
    origin: '*',
};
//---------DB CONNECTION AND CONFIGURATION-------------------------------------
const db = new sqlite3.Database(db_keep).then(() => {
    console.log("Successful connection to the database 'keep-data-light.db'");
    newday();
}).catch((err) => {
    console.error('Connection error', err);
    process.exit();
})

//Initialization of a new day, should been invoke automatically every day
function newday() {
    db.run(sq.newDay, err => {
        if (err) {
            return console.error(err.message);
        }
        console.warn("What a wonderful day bro!")
    })
}
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