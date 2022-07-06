//#region IMPORT
const {
  dialogflow,
  BasicCard,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse,
 } = require('actions-on-google');
const dialogIntent = dialogflow({ debug: false });
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
var utente = {
}
var today = {}
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

async function SetUpDay() {
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
    console.log("id " + utente.user_id);
    console.log("name " + utente.name);
    console.log("kg " + utente.kg);
    return rows;
  });
}

SetUpDay().then(() => {
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
);

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
//#region functions query
//* DO THE QUERY YOU PASS TO THE FUNCTION
async function querySelect(mquery) {
  const mysql = require('mysql2/promise');
  const conn = await mysql.createConnection(ConnConfig);
  const [rows, fields] = await conn.query(mquery);
  await conn.end();
  return rows;
}

async function queryFoodName(mquery) {
  console.log(mquery);
  const conn = await mysql.createConnection(ConnConfig);
  let [rows, fields] = await conn.query(mquery);
  console.log("query food");
  console.log(rows);
  await conn.end();
  return rows;
}

//  var queryFoodInsert = "INSERT INTO `intake-food` (quantity,fk_food,fk_day) VALUES( )"

async function queryAddIntaked(mquery) {
  console.log(mquery);
  const conn = await mysql.createConnection(ConnConfig);
  let [rows, fields] = await conn.query(mquery);
  console.log(rows);
  await conn.end();
  return rows;
}
/* async function queryFoodName(param){
  const conn = await mysql.createConnection(ConnConfig);
  let [rows, fields] = await conn.execute("SELECT * FROM `food` WHERE name LIKE '% ? %'", [param]);
  await conn.end();
  return rows;
} */


async function queryInsert(mquery) {
  const conn = await mysql.createConnection(ConnConfig);
  const [rows, fields] = await conn.query(mquery);
  await conn.end();
  return rows;
}
//#endregion
//#region DIALOGINTENT

dialogIntent.intent('Test', async (conv) => {
  var mquery = "SELECT * FROM `test-table`"

  console.log("dayid" + dayid);
  const risultato = await querySelect(mquery).then((rows) => {
    return rows;
  });
  conv.ask(`ciao ${risultato[2].name} ${risultato[2].surname}.`);
});

dialogIntent.intent('CosaHoMangiato', async (conv) => {
  var tempToday = await querySelect('SELECT * FROM `daily-intake` WHERE date = CURDATE();')
  var tempIntFood = await querySelect('SELECT * FROM keep_me_light.`intake-food` as intake join keep_me_light.food as food on intake.fk_food = food.food_id  where'+` fk_day = ${dayid}`)
//SELECT * FROM keep_me_light.`intake-food` as intake join keep_me_light.food as food on intake.fk_food = food.food_id  where fk_day = 154  ;
console.log("tempIntFood",tempIntFood);
var cibo ="";
  conv.ask(`Ecco quello che hai mangiato :`);
  tempIntFood.forEach(element => {
    console.log("element",element);
cibo = cibo+ `${element.quantity} ${element.name} `
   });
   if (!conv.screen) {
    conv.ask('Sorry, try this on a screen device or select the ' +
      'phone surface in the simulator.');
    conv.ask('Which response would you like to see next?');
    return;
  }
if(tempIntFood.length >0)
{  
  conv.ask(`${cibo}`)
  conv.ask(new BasicCard({
    text: `${cibo}`, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    subtitle: `Un totale di ${tempToday.Kcal_total} kcal`, //*TODO è UDEFINED
    title: 'Oggi hai mangiato',
   
    image: new Image({
      url: 'https://www.bergamonews.it/photogallery_new/images/2016/11/pancia-557106.large.jpg',
    }),
    display: 'CROPPED',
  }));
}else{
  conv.ask(new BasicCard({
    text: `Non hai mangiato niente!`, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    subtitle: 'Vedi di non esagerare dopo!',
    title: 'Oggi non hai mangiato ancora nulla!',
   
    image: new Image({
      url: 'https://www.greenme.it/wp-content/uploads/2021/06/pancia-piatta.jpg',
    }),
    display: 'CROPPED',
  }));


}

  // ${risultato[2].name} ${risultato[2].surname}
});

dialogIntent.intent('hoMangiato', async (conv, param, context) => {
  var parameters = [];
  var Found = 0;
  var notFound = 0;
  var foodNumbers = param.food.length;
  console.warn("param.food");
  console.warn(param.food);
  var tempToday = await querySelect('SELECT * FROM `daily-intake` WHERE date = CURDATE();')

  for (let index = 0; index < foodNumbers; index++) {
    /*    var replacedStr = param.food[index].replace("'", " ");
       console.log(replacedStr); */
    var foodobj = {
      food: param.food[index],
      number: param.number[index] > 1? param.number[index] : 1
    }
    var queryFoodSearch = `SELECT * FROM keep_me_light.food  WHERE name LIKE "%${param.food[index]}%"`;

    var foodname = await queryFoodName(queryFoodSearch)

    if (foodname.length) {
      foodobj.found = true;
      foodobj.id = foodname.at(0).food_id;
      foodobj.name = foodname.at(0).name;
      foodobj.hkcal = foodname.at(0).calories_hundred;
      foodobj.pkcal = foodname.at(0).calories_piece;
      var queryFoodInsert = "INSERT INTO `intake-food`" + ` (quantity,fk_food,fk_day) VALUES(${param.number[index]},${foodobj.id},${dayid})`
      var addKcal = foodobj.pkcal * foodobj.number;
      var newKcal = tempToday.at(0).Kcal_total + addKcal;
      var newLeftKcal = tempToday.at(0).Kcal_limit - addKcal;
      var queryUpdateDay = "UPDATE `daily-intake` " + ` SET Kcal_total = ${newKcal} WHERE (day_id = ${dayid});`
      await querySelect(queryFoodInsert);
      await querySelect(queryUpdateDay);
      conv.ask(`ho segnato ` + foodobj.number + " " + foodobj.name);
      Found++;
    } else {
      conv.ask(`non ho trovato ` + foodobj.food);
      foodobj.found = false;
      notFound++;
    }
    parameters.push(foodobj);
  }

  if (Found > 0 && notFound == 0) {
    //TROVATI TUTTI
conv.ask("Trovato tutto")
  } else if (Found == 0 && notFound > 0) {
    //NESSUNO 
    conv.ask("non ho capito, non conosco le calorie dell'alimento che mi hai detto.")
    conv.followup("AddFood?");
  } else if (Found > 0 && notFound > 0) {
    //ALCUNI TROVATI E ALTRI NO
    var buildResponse;
    for (let fobj in parameters) {
      if (fobj.found) {
        buildResponse =buildResponse + " " + fobj.name + ",";
        console.log(buildResponse);
      }
    }
    conv.ask(`ho segnato  ${buildResponse} ma non conosco le calorie degli altri alimenti`)
    conv.followup("AddFood?");

  }
  console.log(parameters);
  conv.ask(`Ti serve altro?`);
})

//!DEFAULT INTENT WHEN NO INTENT MATCH OR WHEN AN ERROR OCCOUR
dialogIntent.fallback((conv) => {
  console.log("ra");
  conv.ask(`I couldn't understand. Can you say that again?`);
});

dialogIntent.catch((conv, error) => {
  console.error(error);
  conv.ask('I encountered a glitch. Can you say that again?');
});

//#endregion 

module.exports = {
  dialogIntent,
};