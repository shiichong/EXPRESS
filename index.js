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


 const main = async()=>{
    console.log(`....Starting server`)
    await sleep(1000);
    app.listen(process.env.PORT, ()=>{
        console.log(`@remove-on-eject-begin`)
        console.log(`Copyright (c) 2018-present, Probooking, Inc.`)
        console.log(`SERVERING STARTED on port ${process.env.PORT}`)
        console.log(`@remove-on-eject-end`)
    })
}
main();



function sleep(ms){
    return new Promise((resolve, rejecteds)=>{
        setTimeout(resolve, ms)
    })
}