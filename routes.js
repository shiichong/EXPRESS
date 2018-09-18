

const Database = require('./db')
const moment = require('moment')
moment.locale('th')

module.exports = function(app){
    app.get('/', (req,res)=>{
        res.setHeader('Content-Type', 'application/json')
        let arr =[]
        res.write("WELCOMETO APIS JSON APPLICATION")

       
        res.end()
    })
    //REQUEST URL sites_path/registration/params->id/
    app.get('/registration/:id', (req,res,next)=>{
        const {params} = req
          // CHECK params id == integer ?
            if(parseInt(params.id)){
                Database.registration.findAll({where:{registration_id:params.id}}).then(results=>{
                    res.send(results);
                }).catch(err=>{
                     res.status(500).send({status:failed,message:err}) 
                })
            }
 
    })
    //REQUEST URL sites_path/registration?limit=
    app.get('/registration', (req,res)=>{  
        const {query} = req
        const option = {}
        if(parseInt(query.limit)){
            option.limit = parseInt(query.limit)
        }
        if(query.order){
          //do some stuff
        }
        if(query.term){

        }
        Database
            .registration
            .findAll({...option})
            .then((results)=>{
                res.send({payload:results})
            }).catch((err)=>{
                res.send(err) 
        
        })
    })
    app.post('/registration', async(req,res,next)=>{
        const {body} = req
       
        if (!body.event_id){
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.send({message:'missing event id field!'})
            // res.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' });
            
        }
        if (!body.first_name){
            res.status(404).send({message:'missing first name field!'})
        }
        
        if (!body.last_name){
            res.status(404).send({message:'missing last_name field!'})
        }
        
        if (!body.nickname){
            res.status(404).send({message:'missing nickname  field!'})
        }
        if(!body.email){
            res.status(404).send({message:'missing email field!'})
        }else if(body.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(body.email)){
            res.status(404).send({message:'wrong format email'})
        }
        if(!body.line_id){
            res.status(404).send({message:'missing line id field!'})
        }
        if(!body.phone_num){
            res.status(404).send({message:'missing phone number field!'})
        }
        if(!body.company_id){
            res.status(404).send({message:'missing company id field!'})
       }
        if(!body.company_name){
             res.status(404).send({message:'missing company name field!'})
        }     
        //  PREPEARE DATA INTO INSERT 
        let data = {
            ...body,
            ref:makeReference(),
            created_stamp:moment().format("YYYY-MM-DD HH:mm")
        } 
      const extis_email =  await Database.registration.findAll({where:{email:data.email}})
        if(extis_email.length >0){
            console.log(extis_email)
                res.status(404).send({message:'already exits you\'re email'})
        }else{
            Database.registration.create(data).then(results=>{
                res.status(200).send({status:'successfully'})
                
            }).catch(err=>{
                res.status(500).send({status:'failed', message:err})
            })
        }
           

    })
    app.delete('/registration/:id',(req,res)=>{
        const {params} = req
        if(parseInt(params.id)){
            Database.registration.destroy({where:{registration_id:parseInt(params.id)}}).then(results=>{
                res.send({status:'successfully',message:results})
            }).catch(err=>{
                console.log(err)
                res.status(500).send({status:'failed', message:'critical error database is offline'})
            })
        }else{
            res.status(500).send({status:'failed', message:'error you\'re parameter please inpiut youre params'})
        }
       
    })
    app.put('/registration/:id',(req,res,next)=>{
        Database.registration.findAll({where:{registration_id}})
    })
    
   
    
}

function makeReference(){
    let text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (var i=0; i<5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text

}
