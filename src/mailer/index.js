var path = require('path');
require('dotenv').config({ path: path.resolve('.env') });
const nodemailer = require('nodemailer');
'usestrict'

// setup mail transporter service


//transporter.smtpConfig = smtpConfig;
module.exports = (message)=>{
  var smtpConfig = {
    pool: true,
    host: process.env.ELASTIC_SERV,
    port: process.env.ELASTIC_PORT,
    secure: false, // use SSL
    auth: {
      user: process.env.ELASTIC_USER,
      pass: process.env.ELASTIC_PASS
    }
  },
   transporter = nodemailer.createTransport({
    ...smtpConfig
  })
  let mailOptions = {
    from: 'noreply@proobookingcenter.com',              // sender
    to: message.recipient,              // list of receivers
    subject: message.subject,            // Mail subject
    html: `
    <!doctype html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Probookingcenter Thankyour party</title>
    <style media="all" type="text/css">
    @media only screen and (max-width: 620px) {
      table[class=body] h1,
      table[class=body] h2,
      table[class=body] h3,
      table[class=body] h4 {
        font-weight: 600 !important;
      }
      table[class=body] h1 {
        font-size: 22px !important;
      }
      table[class=body] h2 {
        font-size: 18px !important;
      }
      table[class=body] h3 {
        font-size: 16px !important;
      }
      table[class=body] .content,
      table[class=body] .wrapper {
        padding: 10px !important;
      }
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important;
      }
      table[class=body] .btn table,
      table[class=body] .btn a {
        width: 100% !important;
      }
    }
    </style>
    </head>
    
    <body style="margin: 0; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100% !important; line-height: 1.6em; -webkit-font-smoothing: antialiased; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100% !important; background-color: #f6f6f6;">
    
    <table class="body" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;" width="100%" bgcolor="#f6f6f6">
      <tr>
        <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top"></td>
        <td class="container" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto !important; max-width: 580px; padding: 10px; width: 580px;" width="580" valign="top">
          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
    
    
    <table class="main" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border: 1px solid #e9e9e9; border-radius: 3px;" width="100%">
      <tr>
        <div class="branding" style="box-sizing: border-box; margin-bottom: -7px;">
          <a href="http://www.probookingcenter.com" style="box-sizing: border-box; color: #348eda; text-decoration: underline;"><img src="https://s3-ap-southeast-1.amazonaws.com/probookingcenter/event/banner/probooking.png" alt="Probookingcenter" style="-ms-interpolation-mode: bicubic; max-width: 100%;"></a>
        </div>
      </tr>
      <tr>
        <td class="wrapper" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; padding: 30px;" valign="top">
          <table style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
            <tr>
              <td class="title" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                <h2 style="color: #0c0098 !important; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: 400; line-height: 1.4em; margin: 0; font-size: 24px;">Thankyou Party BKK 1/2018</h2>
                <br>
                <h4 style="color: #0c0098 !important; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: 500; line-height: 1.4em; margin: 0; font-size: 14px;"> 10 พฤษจิกายน 2561 2018 เวลา 17.00 - 22.00 น.</h4>
                <h4 style="color: #0c0098 !important; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: 500; line-height: 1.4em; margin: 0; font-size: 14px;">at Grand Hyatt Erawan Bangkok</h4>
                <br>
                <br>
                <h2 style="color: #0c0098 !important; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: 400; line-height: 1.4em; margin: 0; font-size: 24px;">${message.company}</h2>
                <h3 style="color: #0c0098 !important; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-weight: 400; line-height: 1.4em; margin: 0; font-size: 18px;">คุณ ${message.agency}</h3>
              </td>
            </tr>
    
            <tr>
              <td class="title" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                <img src="https://s3.ap-southeast-1.amazonaws.com/probookingcenter/event/qrcode/${message.ref}.png" style="-ms-interpolation-mode: bicubic; max-width: 100%;"> 
                <br>
                <img src="https://s3.ap-southeast-1.amazonaws.com/probookingcenter/event/barcode/${message.ref}.png" style="-ms-interpolation-mode: bicubic; max-width: 100%;">
              </td>
            </tr>
            <table class="divider-wrapper" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
              <tr>
                <td class="divider-spacer" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; padding: 20px 0;" valign="top">
                  <table class="divider divider- " cellpadding="0" cellspacing="0" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                    <tr>
                      <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; vertical-align: top; font-size: 0; border-top: 1px solid #ccc; line-height: 0; height: 1px; margin: 0; padding: 0;" valign="top"></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>        <tr>
               <td class="title" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center"> 
                 <strong>Office Hour:</strong> Mon. to Sat.<br>
                 9.00 - 18.00 <br>
                 <strong>Call:</strong> 02-9358550 <br>
                 <strong>E-mail:</strong> <a href="mailto:saleprobooking@gmail.com" style="box-sizing: border-box; color: #348eda; text-decoration: underline;">saleprobooking@gmail.com</a>
               </td>
            </tr>    
            <tr>
                <td class="title" style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center"> 
               
                <br>
                <div class="footer" style="box-sizing: border-box; clear: both; width: 100%;">
                  Probookingcenter co,.LTD 228 Ladprao-Wanghin Rd Bangkok Thailand 10230
                </div>
              </td>
            </tr>
    
          </table>
        </td>
    
      </tr>
      <tr>
        <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top"></td>
      </tr>
    </table></div>
        </td>
        <td style="box-sizing: border-box; font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top"></td>
      </tr>
    </table>
    
    </body>
    </html>
    
    ` 
  };
  
  var transpoter = nodemailer.createTransport({
    ...smtpConfig
  },)
  transporter.sendMail(mailOptions,(err, callback)=>{
    if(err) return err
    return callback
  })

  
  
  
}

// setup email data with unicode symbols



