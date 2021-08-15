const key = require('../config/keys')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(key.EmailKey);
const Villager = require('../models/villagerSchema');

exports.send = (req, res) => {
    const subject = req.body.subject;
    const description = req.body.description;

    Villager.find({},{email:1,_id:0}, (err, response) => {
        var emails=[];
        for (var i = 0; i < response.length; i++) { 
            emails.push(response[i].email); 
        }
        // console.log(emails)
        sgMail.send({
            from: key.EMAIL_FROM,
            to: emails,
            subject: subject,
            text: description
        })
            .then(sent => {
                return res.status(200).json({
                    message: "Notification sent successfully!"
                })
            })
            .catch(err => {
                console.log(err);
            });
    })
}
