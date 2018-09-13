const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('dotenv');

var connection = require('./db');
const routes = require('./routes');
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:'*/*'}));
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