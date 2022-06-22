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

connection.on('error', function(err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR'
});


let dayid;


connection.query( 'INSERT INTO `daily-intake` (date) VALUES (CURDATE());', function (error, results, fields) {
  if (error){
    console.log("error.sqlMessage");
    console.log(error.sqlMessage);
  }else{
  console.log(results.insertId);
  dayid = results.insertId;
  }
});



connection.query( 'SELECT * FROM `daily-intake` WHERE date = CURDATE();', function (error, results, fields) {
  if (error){
    console.log("error.sqlMessage");
    console.log(error.sqlMessage);
  }else{
  console.log("select day results");
  console.log(results[0].day_id);
  dayid = results[0].day_id;
  }
});


async function querySelect(mquery) {
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

// ? nuovo metodo => https://cheatcode.co/tutorials/how-to-use-sqlite-with-node-js
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
  var mquery = "SELECT * FROM `test-table`"

  console.log("dayid" +dayid);
  const risultato = await querySelect(mquery).then((rows) => {
    return rows;

  });


  conv.ask(`ciao ${risultato[1].name}.`);
});

dialogIntent.intent('hoMangiato', (conv, param, context) => {
  console.log("conv");
  console.log(conv);
  console.log("param");
  console.log(param);
  console.log("context");
  conv.ask(`Intento ho mangiato`);
})

//!DEFAULT INTENT WHEN NO INTENT MATCH OR WHEN AN ERROR OCCOUR
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










