// const wrap = fn => (...args) => fn(...args).catch(args[2])
'use strict';
module.exports = (sequelize, DataTypes) => {
    var registration = sequelize.define('registration', {
        event_id:DataTypes.STRING,
        registration_id: {autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        nickname: DataTypes.STRING,
        email: DataTypes.STRING,
        line_id:DataTypes.STRING,
        phone_num:DataTypes.STRING,
        company_id:DataTypes.INTEGER,
        company_name:DataTypes.STRING,
        ref:DataTypes.STRING,
        created_stamp:DataTypes.DATE

    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        
        
    });
    return registration;
};

// module.exports = {
//     up(queryInterface, Sequelize) {
//       return queryInterface.createTable('my-table', {
//         id: {
//           type: Sequelize.INTEGER,
//           primaryKey: true,
//           autoIncrement: true,
//         },
  
//         // Timestamps
//         createdAt: Sequelize.DATE,
//         updatedAt: Sequelize.DATE,
//       })
//     },
//     down(queryInterface, Sequelize) {
//       return queryInterface.dropTable('my-table');
//     },
//   }
// @Table({
//     timestamps: true,
//     version: true
//   })
//   export default class User extends Model<User> {
  
//     @Column
//     name: string
  
//     @Column
//     age: number
//   }

// exports.create = wrap(async(req,res ,next) =>{
//     const {body} = req
    
//     // Correctdata || Prepare infomation before pool connection
//     if(!body.agen_id){
//         res.status(404).send({message:"Error  \"Agen id field is missing\""})
//     }
//     if(!body.email){
//         res.status(404).send({message:"Error \"Email field is missing\""})
//     }
//     if(!body.first_name){
//         res.status(404).send({message:"Error \"First_name field is missing\""})
//     }
//     if(!body.last_name){
//         res.status(404).send({message:"Error \"Last_name field is missing\""})
//     }
    
//         const data = {
//             agen_id:body.id,
//             email:body.email,
//             first_name:body.first_name,
//             last_name:body.last_name,
//             ref:makeref()
//         }
//     for(var i=0; i<300; i++){
//           console.log(makeref())
//         }
//     try{
       
//         let rows = await db.query(`SELECT * FROM registration WHERE first_name = ?`[data])
//         //  rows = createConection.query(`INSERT INTO registration`, [body])
//         console.log(rows)
//         res.json({success:true,query:rows._results})
//     }catch(err){
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Database connection was closed.')
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has too many connections.')
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused.')
//         }
//         console.log(err)
//         res.status(500).send({message:err.message})

       
       
//     }
//     // next(rows.insertId);
   
// })
// exports.sendEmail = wrap(async(req,res,next)=>{
//     console.log(req)
// })



// function makeref() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     for (var i = 0; i < 5; i++)
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     return text;
//   }
  
  