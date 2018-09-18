
require('dotenv').config({path: __dirname + '/.env'});
const Sequelize = require('sequelize');
const mysql = require('mysql');
const attends = require('./src/models/registration');
var env = process.env.NODE_ENV || 'development';
var fs = require('fs');
var path = require('path');
const Op = Sequelize.Op
// Ensure environment variables are read.
var db = {};
var sequelize = new Sequelize({
              database: process.env.DB_NAME,
              dialect: 'mysql',
              username: process.env.DB_USER,
              password: process.env.DB_PASS,
              host: process.env.DB_HOST,    
              define:{
                  freezeTableName:true,
                  paranoid:false,
                  timestamps:false,

              }
            })

fs
.readdirSync(`${__dirname}/src/models`)
.filter(file => {
   console.log((file.indexOf('.') !== 0)  && (file.slice(-3) === '.js'))
    return (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js');
})
.forEach(file => {
    var model = sequelize['import'](path.join(`${__dirname}/src/models`, file));
    db[model.name] = model;
    
});

Object.keys(db).forEach(modelName => {
if (db[modelName].associate) {
    db[modelName].associate(db);
}
});
 db.op = Op


module.exports = db;
// const lookup = ()=> {
   

// }
// class models {
//   static lookup = lookup
 
// }

// export default class Database {
//     constructor() {
        
//         this.sequelize = Sequelize({
//           database: process.env.DB_NAME,
//           dialect: 'mysql',
//           username: process.env.DB_USER,
//           password: process.env.DB_PASS,
//           host: process.env.DB_NAME,
//           modelPaths: [__dirname + `/src/models/${models}`]
//         })
//         console.log([__dirname + `/src/models/${models}`])
//         this.sequelize.authenticate().then(() => {
//             console.log('Connection has been established successfully.');
//           })
//           .catch(err => {
//             console.error('Unable to connect to the database:', err);
//           });
          
//       }
      
      
//       sync() {
//         this.sequelize.authenticate().then(() => {
//             this.sequelize.sync()
//           })
//     }

    
// }

// module.exports = mysql.createPool({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASS,
//     DATABASE:process.env.DB_NAME,
//     pool:3  
// })
