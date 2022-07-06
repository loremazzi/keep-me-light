const express = require("express")
const router = express.Router()
//#region IMPORT

const sq = require("../db/queries");
const { Agent } = require("http");
const connection = require("../db/mysql2connect");
const ConnConfig = {
  host: "localhost",
  user: process.env.USER,
  password: process.env.MySQL,
  database: process.env.DATABASE,
}
// const AsyncConn = require("../db/mysql2await");
const mysql = require('mysql2/promise');

require("dotenv").config();

async function querySelect(mquery) {
  const mysql = require('mysql2/promise');
  const conn = await mysql.createConnection(ConnConfig);
  const [rows, fields] = await conn.query(mquery);
  await conn.end();
  return rows;
}
let dayid;
async function getDayID() {
  const results = await querySelect('SELECT * FROM `daily-intake` WHERE date = CURDATE();').then((rows) => {
    console.log("rows", rows);
    dayid =rows[0].day_id;
    return rows;
  });
}
getDayID();

router.get('/home', async function (req, res) {
  var tempToday = await querySelect('SELECT * FROM `daily-intake` WHERE date = CURDATE();');
  res.send(tempToday)
  console.log(tempToday);
});
router.get('/today', async function (req, res) {
  var tempIntFood = await querySelect('SELECT * FROM keep_me_light.`intake-food` as intake join keep_me_light.food as food on intake.fk_food = food.food_id  where' + ` fk_day = ${dayid}`).then(() => res.send(tempIntFood))
  res.send(tempIntFood)
});
router.get('/food', async function (req, res) {
  var tempFood = await querySelect("SELECT * FROM food");
  res.send(tempFood);
  console.log("food");
  console.log(tempFood);
});

router.post("test", (req, res, next) => {
  res.send("Test");
  res.json({ "message": "ciao" })
});

module.exports = router;

