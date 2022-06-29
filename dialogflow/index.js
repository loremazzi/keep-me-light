const { dialogflow } = require('actions-on-google');
const db = require("../db/database")
const dialogIntent = dialogflow({ debug: false });
const sq = require("../db/queries");
const { Agent } = require('http');
/* dialogIntent.intent('cibiSalvati', (conv, param, context) => {
    console.log(param);
    console.log(conv);
    conv.ask(`funziona`);
}); */
const connection = require("../db/mysql2connect")


require('dotenv').config();
var mysql = require('mysql2');

// CONNECTION EXAMPLE WITH CONSOLE LOG CONNECTED
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query(
    'SELECT * FROM `test-table`',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
//nuovo metodo => https://cheatcode.co/tutorials/how-to-use-sqlite-with-node-js
const query = (command, method = 'all') => {
  return new Promise((resolve, reject) => {
    db[method](command, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

function sqlToday(){
  db.run(sq.today, [], (err, rows) => {
    if (err) {
      // return console.error(err.message);
      reject(err)
    }

    console.log("prime rows");
    console.log(rows);
    var day_id = rows[0].day_id;
    console.log(day_id);
    return day_id;
  })
}

function addIntake(quantity, fk_food, fk_day) {

  var query = `INSERT INTO daily_intake_food (quantity, fk_food, fk_day)
  VALUES (${quantity},${fk_food},${fk_day},);`

  db.all(query, [], (err, rows) => {
    if (err) {
      // return console.error(err.message);
      reject(err)
    }
    console.log("done");
var done="done"
  return done;
  })


 


  return query
};

function foodData(foodName){

  var query = `SELECT food_id, name, calories_hundred, calories_piece, um, fk_class 
  FROM food where name==${foodName};`
      
  db.all(query, [], (err, rows) => {
    if (err) {
      // return console.error(err.message);
      reject(err)
    }
    var food = rows[0];
    console.log(food);
    return food
  //  resolve(savedRiga);
  })




}

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
function dateDiff(d1, d2) {
  return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0);
}
//user_id, name, bithday, sport
function calculateAge(birthday) { // birthday is a date
  var today = new Date();
  var ageDate = new Date(birthday); // miliseconds from epoch
  return dateDiff(ageDate, today)
}
var User = {};
db.all(sq.defineUser, [], (err, rows) => {
  if (err) {
    return console.error(err.message);
  }
  appUser = rows[0];
  console.error(`the user is ${appUser.name}`)
  User.user_id = appUser.user_id;
  User.name = appUser.name;
  User.bithday = appUser.bithday;
  console.log(appUser.bithday);
  User.sport = appUser.sport;
  var age = calculateAge(User.bithday);
  console.log(age + " anni");
  User.age = age;
  User.weightkg = appUser.kg;
  User.heightcm = appUser.heightcm;
});

function calcBRM(sex, weightkg, heightcm, ageyrs) {
  if (sex == 'M') {
    MBMR = 66.47 + (13.75 * weightkg) + (5.003 * heightcm) - (6.755 * ageyrs);
    return MBMR;
  } else {
    FBMR = 655.1 + (9.563 * weightkg) + (1.850 * heightcm) - (4.676 * ageyrs)
    return FBMR;
  }
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
      //day_id, date, Kcal_total
      conv.ask(`nel database ho trovato  ${result.name}`);
    }, function (err) {
      console.error(err.message);
    });
})
// Quanto ho mangiato oggi?
dialogIntent.intent('ciboMangiato', conv => {
  return new Promise(function (resolve, reject) {
    db.all(sq.today, [], (err, rows) => {
      if (err) {
        // return console.error(err.message);
        reject(err)
      }
      savedRiga = rows[0];
      console.log(savedRiga);
      resolve(savedRiga);
    })
  })
    .then(function (result) {
      var UserBRM = calcBRM('M', parseFloat(User.weightkg), parseInt(User.heightcm), parseInt(User.age))
      var UserAMR = UserBRM * 1.2;
      console.log("UserBRM");
      console.log(UserBRM);
      console.log("result");
      console.log(result);
      // conv.ask(new SimpleResponse("..."));
      conv.ask(`Oggi hai mangiato  ${result.Kcal_total} Kcal, puoi mangiarne ancora ${(UserAMR - result.Kcal_total).toFixed(0)} Kcal`);
    }, function (err) {
      console.error(err.message);
    });
})

dialogIntent.intent('hoMangiato',  (conv, param, context) => {
console.log("conv");
console.log(conv);
console.log("param");
console.log(param);
console.log("context");
  return new Promise(function (resolve, reject) {
    var day_id;
    var food={};
    var quantity;
    var food_name=param.food;
    var quantity=param.number;
    var what=param.list_of_what;
    //GET DI DAY ID
    db.serialize(function() {
      day_id = sqlToday();
      food=foodData(food_name);
      console.log("right place day_id");
      console.log(day_id);
      console.log("right place food");
      console.log(food);
      food_id=food.food_id;
      addIntake(quantity,food_id,day_id)
    })
    //GET DI FOOD OBJ PER ID E KAL


    //ADD INTAKE FOOD IN DATABASE 
 


  })
    .then(function () {
      
    
      conv.ask(`Credo di aver aggiunto`);
    }, function (err) {
      console.error(err.message);
    });

})


/* dialogIntent.intent('hoMangiato', (conv, param, context) => {
  let result={};
  console.log("conv");
  console.log(conv);
  console.log("param");
  console.log(param);
  console.log("context");
  console.log(context);

  try{
    db.all(sq.today, [], (err, rows) => {
      if (err) {
       return console.error(err.message);
       }
     
      // console.log(savedRiga);

      result= rows[0];

      console.log("QUI RESULT DENTRO DB");
      console.log(result);
    })
  }catch(error){
    console.warn("QUI error RESULT");

    console.error(error.message);
  }finally {

    var UserBRM = calcBRM('M',parseFloat(User.weightkg),parseInt(User.heightcm),parseInt(User.age))
    var UserAMR = UserBRM * 1.2;
    console.log("UserBRM");
    console.log(UserBRM);
    console.log("QUI FINALLY RESULT");
    console.log(result);
    conv.ask(`Oggi hai mangiato  ${result.Kcal_total} Kcal, puoi mangiarne ancora ${(UserAMR-result.Kcal_total).toFixed(0)} Kcal`);
  }  
})
 */



//  TEMPLATE RISPOSTA CON PROMISE PER TROVARE I DATI DAL DATABASE
/*
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

