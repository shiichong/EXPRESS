
require('dotenv').config({ path: __dirname + '/.env' });
const Db = require('./db')
const stream = require('stream');
// Decare database module to name Db
const moment = require('moment')
const fs = require('fs')
var qr = require('qr-image')
var jsBarcode = require('jsbarcode');
var Canvas = require('canvas'),
    Canvas = new Canvas(400, 200)
var AWS = require('aws-sdk'),
transporter = require('./src/mailer');
moment.locale('th')

// @remove-on-eject-begin
/**
 * Copyright (c) 2018-present, Probooking, Inc.
 */
// @remove-on-eject-end

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        let arr = []
        res.write("WELCOMETO APIS JSON APPLICATION")
        res.end()
    })

    //REQUEST URL sites_path/registration/params->id/
    app.get('/registration/:id', (req, res, next) => {
        const { params } = req
        // CHECK params id == integer ?
        if (parseInt(params.id)) {
            Db.registration.findAll({ where: { registration_id: params.id } }).then(results => {
                res.send(results);
            }).catch(err => {
                res.status(500).send({ status: failed, message: err })
            })
        }

    })

    //REQUEST URL sites_path/registration?limit=
    app.get('/registration', (req, res) => {
        const { query } = req
        let option = {}
        if (parseInt(query.limit)) {
            option.limit = parseInt(query.limit)
        }
        if (query.order) {
            //do some stuff
        }
        if (query.term) {
            option = {
                ...option,
                where: { [db.op.or]: [{ nickname: query.term }, { email: query.term }] }
            }
        }

        // if REQUST HAS QUERY = qr // Purge all option
        if (query.qr) {
            option.where = { ref: query.qr }
        }
        Db
            .registration
            .findAll({ ...option })
            .then((results) => {
                res.send({ payload: results })
            }).catch((err) => {
                res.send(err)

            })
    })

    app.post('/registration', async (req, res, next) => {
        const { body } = req


        if (!body.event_id) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.send({ message: 'missing event id field!' })
        }
        if (!body.first_name) {
            res.status(404).send({ message: 'missing first name field!' })
        }

        if (!body.last_name) {
            res.status(404).send({ message: 'missing last_name field!' })
        }

        if (!body.nickname) {
            res.status(404).send({ message: 'missing nickname  field!' })
        }
        if (!body.email) {
            res.status(404).send({ message: 'missing email field!' })
        } else if (body.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(body.email)) {
            res.status(404).send({ message: 'wrong format email' })
        }
        if (!body.line_id) {
            res.status(404).send({ message: 'missing line id field!' })
        }
        if (!body.phone_num) {
            res.status(404).send({ message: 'missing phone number field!' })
        }
        if (!body.company_id) {
            res.status(404).send({ message: 'missing company id field!' })
        }
        if (!body.company_name) {
            res.status(404).send({ message: 'missing company name field!' })
        }
        //  PREPEARE DATA INTO INSERT 
        let data = {
            ...body,
            ref: makeReference(),
            created_stamp: moment().format("YYYY-MM-DD HH:mm")
        }
        const extis_email = await Db.registration.findAll({ where: { email: data.email } })
        if (extis_email.length > 0) {
            res.status(404).send({ message: 'already exits you\'re email' })
        } else {
            let insert = await insertRegistration(data)
            var s3 = new AWS.S3()
            await jsBarcode(Canvas, insert.ref, { format: "CODE128" });
            var bar_code = await  Canvas.pngStream(),
             qr_code = await qr.imageSync(insert.ref, { type: 'png' }),
             params1 = { Bucket: 'probookingcenter/event/qrcode', Key: `${insert.ref}.png`, Body: qr_code, ContentType: 'image/png',ACL:'public-read' },
             params2 = { Bucket: 'probookingcenter/event/barcode', Key: `${insert.ref}.png`, Body: bar_code.canvas.toBuffer(), ContentType: 'image/png',ACL:'public-read' },
             messageEmail = {subject: 'PROBOOKINGCENTER Thank you event', ref:insert.ref, recipient:insert.email, company:insert.company_name, agency:`${insert.first_name} ${insert.last_name}`}
          await  s3.putObject(params1, function (err, data) {
                if (err) {
                    res.status(500).send({status:"failed", message:"Could not upload qrcode to middleware" })
                } else {
                    console.log(`Successfully uploaded data qrcode`);
                }

            });
           await s3.putObject(params2, function (err, data) {
                if (err) {
                    res.status(500).send({status:"failed", message:"Could not upload barcode to middleware" })
                }else{
                    console.log(`Successfully uploaded data barcode`);
                }

            });
            transporter.sendMail(messageEmail,(error, success)=> {
                if (error) {
                     console.log(error);
                } else {
                    res.send({message:"Sucessfully registration"})
                }
             });
         
        }
    })

    app.delete('/registration/:id', (req, res) => {
        const { params } = req
        if (parseInt(params.id)) {
            Db.registration.destroy({ where: { registration_id: params.id } }).then(results => {
                res.send({ status: 'suc\cessfully', message: results })
            }).catch(err => {

                res.status(500).send({ status: 'failed', message: 'critical error Db is offline' })
            })
        } else {
            res.status(500).send({ status: 'failed', message: 'error you\'re parameter please inpiut youre params' })
        }

    })

    app.put('/registration/:id', async (req, res, next) => {
        const { body, params } = req
        if (!params.id && !parseInt(params.id)) {
            res.status(404).send({ status: 'failed', message: 'cannot put ' })
        }
        params.id = parseInt(params.id)
        if (!body.event_id) {
            res.status(404).send({ message: 'missing event id field!' })
        }
        if (!body.first_name) {
            res.status(404).send({ message: 'missing first name field!' })
        }

        if (!body.last_name) {
            res.status(404).send({ message: 'missing last_name field!' })
        }

        if (!body.nickname) {
            res.status(404).send({ message: 'missing nickname  field!' })
        }
        if (!body.email) {
            res.status(404).send({ message: 'missing email field!' })
        } else if (body.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(body.email)) {
            res.status(404).send({ message: 'wrong format email' })
        }
        if (!body.line_id) {
            res.status(404).send({ message: 'missing line id field!' })
        }
        if (!body.phone_num) {
            res.status(404).send({ message: 'missing phone number field!' })
        }
        if (!body.company_id) {
            res.status(404).send({ message: 'missing company id field!' })
        }
        if (!body.company_name) {
            res.status(404).send({ message: 'missing company name field!' })
        }
        //      เตรียมข้อมูลก่อนตรงนี้  ข้อมูลจะออกมาหน้าตาประมาณนี้ {
        //         email: body.email
        //         username:body.username
        //        สามารถต่อข้อมูลโดยใช้ comma ได้เลย
        //    }
        let data = {
            ...body,
        }
        // หาความซ้ำซ้อนของอีเมล 
        let extis_email = await Db.registration.findAll({
            where: {
                email: data.email,
                registration_id: {
                    [Db.op.ne]: [params.id]
                }
            }
        }).then(function (results) {
            return results
        }).catch(err => {
            res.status(500).send({ message: err })
        })

        if (extis_email.length === 0) {
            Db.registration.update({
                ...data
            }, {
                    where: {
                        registration_id: params.id
                    }
                })
                .then(_results => {
                    res.status(200).send({ status: 'sucessfully' })
                }).catch(err => {
                    res.status(500).send({ status: 'failed', message: err })
                })
        } else {
            res.status(404).send({ message: 'already exits you\'re email' })
        }

    })
    app.get('/event', function (req, res) {
        const { query } = req
        let option = {}
        if (parseInt(query.limit)) {
            option.limit = parseInt(query.limit)
        }
        if (query.order) {
            //do some stuff
        }
        if (query.term) {
            option = {
                ...option,
                where: { [db.op.or]: [{ event_name: query.term }, { event_location: query.term }, { event_type: query.term }] }
            }
        }
        Db
            .event_info
            .findAll({ ...option })
            .then((results) => {
                res.send({ payload: results })
            }).catch((err) => {
                res.send(err)
            })
    })
    app.get('/event/:id', (req, res) => {
        const { params } = req
        if (!parseInt(params.id)) {
            res.status(404).send({ status: 'failed', message: "Error (URL) is unavailable resource Not Found" })
        }
        Db.event_info
            .findOne({
                where: {
                    event_id: params.id
                }
            }).then(results => {
                if (!results) return res.status(404).send({ status: 'sucessfully', message: "Error Data is not Found!" });
                res.send({ payload: results })
            }).catch(err => {
                res.status(500).send({ status: 'Failed REQUEST is Critical error', message: err })
            })
    })

    app.post('/event', (req, res) => {
        const { body } = req
        let data = { ...body, created_stamp: moment().format("YYYY-MM-DD HH:mm") }
        Db.event_info.create({ ...data }).then(results => {
            res.send({ status: 'sucessfully' })
        }).catch(err => {
            res.status(500).send({ status: 'failed', message: err })
        })
    })

    app.put('/event/:id', (req, res) => {
        const { body, params } = req
        if (!parseInt(params.id)) {
            res.status(404).send({ status: 'failed', message: "Error (URL) is unavailable resource Not Found" })
        }
        let data = { ...body, update_stamp: moment().format("YYYY-MM-DD HH:mm") }
        if (data.created_stamp) {
            delete (data.created_stamp);
        }
        Db.event_info.update({ ...data }, { where: { event_id: params.id } }).then(results => {
            res.send({ status: 'sucessfully' });
        }).catch(err => {
            res.status(500).send({ status: "failed", message: 'Error catches databse connection' })
        })

    })

    app.delete('/event/:id', (req, res) => {
        const { params } = req;
        if (!parseInt(params.id)) {
            res.status(404).send({ status: "failed", message: "Error not Found your id parameter of integer" })
        }
        Db.event_info.destroy({ where: { event_id: params.id } }).then(results => {
            res.send({ status: "sucessfully" })
        }).catch(err => {
            res.status(500).send({ status: "failed", message: err })
        })
    })

   
   

}



function makeReference() {
    let text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text

}
function insertRegistration(body) {
  
    return new Promise(function (resolve, rejected) {
        Db.registration.create(body).then(function (results) {
            resolve(results)
        }).catch(function (err) {
            rejected(err)
        })
    })
}

