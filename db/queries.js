
const sq = {}

 sq.foodList = `SELECT food_id, name, calories_hundred, calories_piece, um, fk_class 
FROM food;`;

 sq.whatList = `SELECT what_id, name, fk_class, equivalent
FROM list_of_what;`;

 sq.today = `SELECT day_id, date, Kcal_total
FROM daily_intake WHERE date == date();`;

 sq.dailyIntake = `SELECT day_id, date, Kcal_total
FROM daily_intake`;

 sq.dailyIntakeFoodList = `SELECT intake_food_id, quantity, fk_food, fk_day
FROM daily_intake_food;`

 sq.todayIntakeFoodList = `SELECT intake_food_id, quantity, fk_food, fk_day
FROM daily_intake_food;`

 sq.defineUser=`SELECT user_id, name, bithday, sport
FROM user where user_id==1;`

 sq.newDay = `INSERT INTO daily_intake ( date )
VALUES (date());`;

module.exports = sq;