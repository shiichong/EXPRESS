
const attends = require('./model/attends');
const wrap = fn => (...args) => fn (...args).catch(args[2])
module.exports = function(app){
    app.get('/', (req,res)=>{
        res.setHeader('Content-Type', 'text/plain')
        res.write('WELCOME TO APIs PROBOOKINGCENTER')
        res.end()
    })

    app.post('/register',attends.registration)
}