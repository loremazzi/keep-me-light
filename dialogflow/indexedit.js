//#region IMPORT
const { dialogflow } = require("actions-on-google");
const dialogIntent = dialogflow({ debug: false });
const sq = require("../db/queries");
const { Agent } = require("http");
const connection = require("../db/mysql2connect");
require("dotenv").config();
//#endregion 
// ? CONNECTION EXAMPLE WITH CONSOLE LOG CONNECTED

//#region Functions
function dateDiff(d1, d2) {
  return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0);
}
//user_id, name, bithday, sport
function calculateAge(birthday) { // birthday is a date
  var today = new Date();
  var ageDate = new Date(birthday); // miliseconds from epoch
  return dateDiff(ageDate, today)
}

function calcBRM(sex, weightkg, heightcm, ageyrs) {
  if (sex == 'M') {
    MBMR = 66.47 + (13.75 * weightkg) + (5.003 * heightcm) - (6.755 * ageyrs);
    return MBMR;
  } else {
    FBMR = 655.1 + (9.563 * weightkg) + (1.850 * heightcm) - (4.676 * ageyrs)
    return FBMR;
  }
}

//#endregion

//#region CONNECTION AND QUERY
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("sono su edit");
  console.log("connected as id " + connection.threadId);
});

connection.on('error', function (err) {
  console.warn("azzz");
  console.log(err.code); // 'ER_BAD_DB_ERROR'
});

let dayid;

//!QUERY SAMPLE
/*
! connection.query( 'QUERY', function (error, results, fields) {...});
*/
const utente = {
}
/* connection.query(`SELECT * FROM user where user_id = 1;`, function (error, results, fields) {
  if (error) {
    console.log("error getting user");
    throw error;
  } else {
    utente.user_id = results.at(0).user_id;
    utente.name = results.at(0).name;
    utente.birthday = results.at(0).birthday;
    utente.kg = results.at(0).kg;
    utente.heightcm = results.at(0).heightcm;
    utente.age = calculateAge(utente.birthday);
    utente.BRM = calcBRM('M', parseFloat(utente.kg), parseInt(utente.heightcm), parseInt(utente.age));
    utente.AMR = utente.BRM * 1.2;
  }
})
console.log("utente.AMR")
console.log(utente.BRM)
 */
//? Insert new day in the db



async function SelectUser() {
  mquery = "SELECT * FROM user where user_id = 1;";
  const results = await querySelect(mquery).then((rows) => {
    utente.user_id = rows.at(0).user_id;
    utente.name = rows.at(0).name;
    utente.birthday = rows.at(0).birthday;
    utente.kg = rows.at(0).kg;
    utente.heightcm = rows.at(0).heightcm;
    utente.age = calculateAge(utente.birthday);
    utente.BRM = calcBRM('M', parseFloat(utente.kg), parseInt(utente.heightcm), parseInt(utente.age));
    utente.AMR = utente.BRM * 1.2;
    console.log("STAMPO UTENTE");
    console.log("id "+utente.user_id);
    console.log("name "+utente.name);
    console.log("kg "+utente.kg);

    return rows;
  });
 
  
}

 SelectUser().then( ()=>{
  console.log("utente.AMR");
  console.log(utente.AMR);
  
  connection.query('INSERT INTO `daily-intake` (date, kcal_limit ) VALUES (CURDATE(),?)', [utente.AMR], function (error, results, fields) {
    console.log("stampo da insert UTENTE");
    console.log(utente);
    console.log("fine stampa UTENTE");
    if (error) {
      console.log("error.sqlMessage");
      console.log(error.sqlMessage);
    } else {
      console.log(results.insertId);
      dayid = results.insertId;
    }
  });
  
  //? get current day id as dayid
  connection.query('SELECT * FROM `daily-intake` WHERE date = CURDATE();', function (error, results, fields) {
    if (error) {
  
      console.log("error.sqlMessage");
      console.log(error.sqlMessage);
    } else {
      console.log("select day results");
      console.log(results);
      // console.log("res2");
      // console.log(results[0]);
      dayid = results[0].day_id;
    }
  });
}
) ;

//#region commentati
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
//#endregion

//#endregion
//#region FUNCTIONS QUERY
//* DO THE QUERY YOU PASS TO THE FUNCTION
async function querySelect(mquery) {
  const mysql = require('mysql2/promise');
  const conn = await mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.MySQL,
    database: process.env.DATABASE,
  });

  const [rows, fields] = await conn.query(mquery);
  await conn.end();
  return rows;
}

async function queryInsert(mquery) {
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
//#endregion
//#region DIALOGINTENT

dialogIntent.intent('Test', async (conv) => {
  var mquery = "SELECT * FROM `test-table`"

  console.log("dayid" + dayid);
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
//#endregion 

module.exports = {
  dialogIntent,
};