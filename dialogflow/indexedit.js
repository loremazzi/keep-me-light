const { dialogflow } = require("actions-on-google");
const dialogIntent = dialogflow({ debug: false });
const sq = require("../db/queries");
const { Agent } = require("http");
const connection = require("../db/mysql2connect");
const { mquery } = require("mongoose");

require("dotenv").config();


// CONNECTION EXAMPLE WITH CONSOLE LOG CONNECTED
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("sono su edit");
  console.log("connected as id " + connection.threadId);
});


async function example(mquery) {
  const mysql = require('mysql2/promise');
  const conn = await mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.MySQL,
    database: process.env.DATABASE,
  });
  
  const [rows, fields] = await conn.query(mquery);
  return rows;
  await conn.end();

}




//nuovo metodo => https://cheatcode.co/tutorials/how-to-use-sqlite-with-node-js
/*
! const query = (command, method = "all") => {
!  return new Promise((resolve, reject) => {
!    db[method](command, (error, result) => {
!      if (error) {
!        reject(error);
!      } else {
!        resolve(result);
!      }
!    });
! });
!};
 */



dialogIntent.intent('Test', async (conv) => {
var mquery="SELECT * FROM `test-table`"
  const weather =await example(mquery).then((rows)=>{
   return rows;
  
  });

  console.log("weather");
  console.log(weather);
  conv.ask('How are you?');
  conv.ask(`Today's weather is ${weather[0].name}.`);
});

dialogIntent.fallback((conv) => {
  conv.ask(`I couldn't understand. Can you say that again?`);
});

dialogIntent.catch((conv, error) => {
  console.error(error);
  conv.ask('I encountered a glitch. Can you say that again?');
});








/* 
  ? function sqlToday(){
  ? db.run(sq.today, [], (err, rows) => {
  ?  if (err) {
  ?    // return console.error(err.message);
  ?   reject(err)
  ?  }

   ? console.log("prime rows");
   ? console.log(rows);
   ? var day_id = rows[0].day_id;
   ? console.log(day_id);
   ? return day_id;
  ? })
? }
 */




module.exports = {
  dialogIntent,
};










