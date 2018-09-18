const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('dotenv');
// app.use(db.getConnection())
// const db = require('db')

const routes = require('./routes');
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({type:'*/*'}));
// app.use(connection)
routes(app);

 
app.listen(process.env.PORT, ()=>{
    console.log(`
**********************************************************************************#
# PROBOOKINGCENTER EVENTS LISTEN ON.                                         #
# Make Wish to Hello world.                                                    #
# ********************************************************************************#
    `)
    console.log(`SERVERING STARTED on port ${process.env.PORT}`)
})