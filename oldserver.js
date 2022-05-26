require("dotenv").config();
const express = require("express");
//const axios = require("axios").default;

const app = express();
const port = 3003;
const {
  dialogflow
} = require('actions-on-google')

const intentCibiSalvati = dialogflow({
  debug: false
})

intentCibiSalvati.intent("cibiSalvati",)
app.use(express.json());
var sqlite3 = require("sqlite3").verbose();
const path = require("path");
const db_keep = path.join(__dirname, "./db", "keep-data-light.db");

const db = new sqlite3.Database(db_keep, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'keep-data-light.db'");
});

/* TODO CHECK THIS CODE FROM THE INTERNET

app.get('/tag/:id', async function(req, res) {
    
    // Retrieve the tag from our URL path
    var id = req.params.id;

    let articles = await Article.findAll({tag: id}).exec();

    res.render('tag', {
        articles: articles
    });
});
*/

///CONST SQL=> QUERY
///SELECT

const sql_foodList = `SELECT food_id, name, calories_hundred, calories_piece, um, fk_class 
FROM food;`;

const sql_whatList = `SELECT what_id, name, fk_class, equivalent
FROM list_of_what;`;

const sql_today = `SELECT day_id, date, Kcal_total
FROM daily_intake WHERE date == date();`;

const sql_dailyIntake = `SELECT day_id, date, Kcal_total
FROM daily_intake`;

const sql_dailyIntakeFoodList = `SELECT intake_food_id, quantity, fk_food, fk_day
FROM daily_intake_food;`

const sql_todayIntakeFoodList = `SELECT intake_food_id, quantity, fk_food, fk_day
FROM daily_intake_food;`

const sql_defineUser = `SELECT user_id, name, bithday, sport
FROM user where user_id==1;`
//INSERT
const sql_newDay = `INSERT INTO daily_intake ( date )
VALUES (date());`;

//RUN
//CREO NUOVO GIORNO
db.run(sql_newDay, err => {
  if (err) {
    return console.error(err.message);
  }
  console.error("What a wonderful day bro!")
})

var appUser;
db.all(sql_defineUser, [], (err, rows) => {
  if (err) {
    return console.error(err.message);
  }
  appUser = rows.at(0);
  console.error(`the user is ${appUser.name}`)
});


//PATH
app.post("/", () => {
  intentCibiSalvati.intent('cibiSalvati', (conv, param, context) => {
    console.log("conv: ")
    console.log(conv);
    console.log("param: ");
    console.log(param);
    console.log("context: " + context);
    conv.ask("Hai chiesto lo status");
  });
});

app.post("/colpost", async function (req, res) {
  db.all(sql_today, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});


app.post("/example", (req, res) => {
  res.send(
    appUser

  )

  console.log(req.body);
});

app.get("/foods", (req, res) => {

  db.all(sql_foodList, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

app.get("/what", (req, res) => {

  db.all(sql_whatList, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.get("/daily_intake_food", (req, res) => {

  db.all(sql_dailyIntakeFoodList, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

app.get("/intake", (req, res) => {

  db.all(sql_dailyIntakeFoodList, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});


app.use((error, req, res, next) => {
  res.status(500)
  res.send({ error: error })
  console.error(error.stack)
  next(error)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

//DB RUN
/*   db.run(sql_foodList, err => {
    if (err) {
      return console.error(err.message);
    }
    console.error("Successful get of the 'food' table")
  }) */
//APP.GET
//APP.POST
/* const sql_create = `CREATE TABLE IF NOT EXISTS Books (
        Bokk_ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        Title VARCHAR(100) NOT NULL, 
        Author VARCHAR(100) NOT NULL, 
        Comments TEXT);`;

db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.error("Successful creation of the 'Books' table")
})

app.get("/album", (req, res) => {
  const sql = "SELECT * FROM albums ORDER BY Title"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});
 */
/* app.post("/github", (req, res) => {
  const content = ":wave: Hi mom!";
  const avatarUrl = "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif";
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    .then((discordResponse) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});
 */