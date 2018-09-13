
require('dotenv').config({path: __dirname + '/.env'})
const mysql = require('mysql');
module.exports  = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    DATABASE:process.env.DB_NAME,
    pool:3  
})