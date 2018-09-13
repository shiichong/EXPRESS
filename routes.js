


module.exports = function(app){
    app.get('/', (req,res)=>{
        res.setHeader('Content-Type', 'text/plain')
        res.write('WELCOME TO APIs PROBOOKINGCENTER')
        res.end()
    })
}