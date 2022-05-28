const { dialogflow } = require('actions-on-google');
const classModel = require('../models/classModel');
const foodModel = require('../models/foodModel');
const intakeFoodModel = require('../models/intakeFoodModel');
const IntakeModel = require('../models/IntakeModel');
const userModel = require('../models/userModel');
const whatModel = require('../models/whatModel');
const db = require("../db/database")
const dialogIntent = dialogflow({ debug: false });
const sq = require("../db/queries");
const { Agent } = require('http');
/* dialogIntent.intent('cibiSalvati', (conv, param, context) => {
    console.log(param);
    console.log(conv);
    conv.ask(`ohhhhh josh ti offro da bere domani`);
}); */

function saveFood(tempFood) {
  riga = tempFood;
  console.log(riga)
}
var savedRiga;
async function sqfoodlist() {
  db.all(sq.foodList, [], (err, rows) => {
    if (err) {
      return console.error(err.message);

    }

    savedRiga = rows.at(0);

    return rows.at(0);
  });
}
/*  dialogIntent.intent('cibiSalvati', async (conv, param, context)  => {
var resuuul =false;

resuuul =  db.all(sq.foodList, [], (err, rows) => {
    if (err) {
      conv.ask(`Errore nella lettura del dato dal database ${err}`);
      return err.message;
    }
    console.log("rows.at(zero)");
    console.log(rows.at(0));
    savedRiga = rows.at(0);
    console.log("savedRiga dentro all' if");
    console.log(savedRiga);
    return rows;
  } );

 if(resuuul){ console.log("resuuul");
 console.log(resuuul);
 conv.ask(`ciao questo è ${resuuul}`);}


 
}); */
/* var myResponse;

dialogIntent.intent('cibiSalvati', async (conv) => {
 
  var result = await sqfoodlist( (callback) => {
    // parse the record => here in the callback
    console.log("callback")
    console.log(callback)
    myResponse = callback;

  });
  conv.ask(myResponse);
});

 */
/* 
var myResponse;

dialogIntent.intent('cibiSalvati', async (conv) => {
  var result = false;
  return new Promise (sqfoodlist( (callback) => {
    // parse the record => here in the callback
    console.log("callback")
    console.log(callback)
    myResponse = callback;
    conv.ask(`ciao questo è `);
  }));
  if(result){ console.log("resuuul");
 console.log(resuuul);
 conv.ask(`ciao questo è ${resuuul}`);}


});
 */
dialogIntent.intent('cibiSalvati', conv => {
  // I - MUST HAVE PROMISE IN HERE
  return new Promise(function (resolve, reject) {
    db.all(sq.foodList, [], (err, rows) => {
      if (err) {
        // return console.error(err.message);
        reject(err)
      }

      savedRiga = rows.at(1);
      
      resolve(savedRiga);
    })
  })
    .then(function (result) {
      console.log("result");
      console.log(result);
      // conv.ask(new SimpleResponse("..."));
      conv.ask(`nel database ho trovato  ${result.name}`);
    }, function (err) {
      console.error(err.message);
    });
})

/* 
TEMPLATE RISPOSTA CON PROMISE PER TROVARE I DATI DAL DATABASE

app.intent('getCrypto', conv => {
    // I - MUST HAVE PROMISE IN HERE
    return new Promise(function (resolve, reject) {
        fetch('https://api.coinmarketcap.com/v1/ticker/')
            .then(res => {
                ...

                resolve();
            })
            .catch(error => {
                console.log(error);

                reject(error)
            });
    })
    .then(function (result) {
        console.log(result);

        // II - MUST HAVE THIS RESPONSE
        // conv.ask(new SimpleResponse("..."));
        conv.close(new SimpleResponse(texts.goodbye));
    }, function (error) {

    });
})
*/




module.exports = {
  dialogIntent
}
