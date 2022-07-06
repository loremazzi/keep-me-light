const express=require("express")
const router=express.Router()

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

router.post("/tena",(req,res,next)=>{
    res.send("This is the login request");
	res.json({"message":"ciao"})
})
module.exports=router

