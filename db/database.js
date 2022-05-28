require("dotenv").config();
const express = require('express'); //import express

const cors = require('cors');
const path = require('path');
const sq = require("./queries")
var sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(express.json());

const db_keep = path.join(__dirname, "./", "keep-data-light.db");

//---------CORS OPTIONS--------------------------------------------------------
const corsOptions = {
    origin: '*',
};

const db = new sqlite3.Database(db_keep, err => {
    if (err) {
        console.error('Connection error', err);
        process.exit();
    } else {
        console.log("Successful connection to the database 'keep-data-light.db'");
        newday();
    }
  });


//Initialization of a new day, should been invoke automatically every day
function newday() {
    db.run(sq.newDay, err => {
        if (err) {
            return console.error(err.message);
        }
        console.warn("What a wonderful day bro!")
    })
}

module.exports = db;