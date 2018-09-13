const wrap = fn => (...args) => fn(...args).catch(args[2])


exports.create = wrap(async(req,res) =>{
    const {body} = req
    
    try{
        let rows = await req.connection.query(`INSERT INTO registration SET ?`[body])
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
       
    }
    res.send({success:true,query:rows})
})
