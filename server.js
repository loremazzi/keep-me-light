require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3003;

app.use(express.json());
app.get("/", (req, res) => res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>You did it!</h1>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`));

app.get("/example", (req, res) => res.send(
  example = {
    id: 12,
    field1: "aaa",
    field2: "bbb",
    field3: {
      name: "field3",
      phone: "333 123 2211"
    }
  }
));

//SQL NOW
var sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db_name = path.join(__dirname, "./db", "sample.db");
const db_keep = path.join(__dirname, "./db", "keep-data-light.db");

const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'sample.db'");
});

/* 
const sql_create = `CREATE TABLE IF NOT EXISTS Books (
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

app.use((error, req, res, next) => {
  res.status(500)
  res.send({ error: error })
  console.error(error.stack)
  next(error)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
