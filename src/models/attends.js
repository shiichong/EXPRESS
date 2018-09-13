const wrap = fn => (...args) => fn(...args).catch(args[2])


exports.create = wrap(async(req,res ,next) =>{
    const {body} = req
    
    try{
        let createConection = await req.connection
        let rows = createConection.query(`INSERT INTO registration`, [body])
        res.send({success:true,query:rows})
    }catch(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        res.render(500).send({message:err})
        next()
       
    }
  
   
})
