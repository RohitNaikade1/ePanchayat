const ResData = require('../models/residenceSchema');
const Record = require("../models/paymentSchema");
const pdf = require('html-pdf')
const pdfTemplate = require('../documents/Residence Certificate/index')
const path = require("path");
const fs = require('fs')
const key = require('../config/keys')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(key.EmailKey);
const Villager = require('../models/villagerSchema');

exports.create = (req, res) => {
    const name = req.body.name;
    const UID = Number(req.body.UID);
    const email = req.body.email;
    const age = req.body.age;
    const noOfYears = req.body.years;
    const number = req.body.Number;
    const profession = req.body.profession;
    const picture = `http://localhost:5001/residence/${req.files.picture.name}`;
    const filename = req.files.picture.name;
    const file = req.files.picture;

    Villager.findOne({
        UID: req.body.UID
    }, (err, user) => {
        // console.log(user)
        if (!user) {
            return res.status(400).json({
                error: 'Adhar Number is not present in villager database!'
            });
        } else {
            ResData.findOne({ UID: req.body.UID })
                .then(data => {
                    if (data) {
                        return res.status(400).json({
                            error: "Application already submitted!"
                        })
                    } else {
                        file.mv(path.join(__dirname, 'images/Residence certificate', file.name), (err) => {
                            if (err) {
                                console.log(err)
                            } else {

                            }
                        });
                        const data = new ResData({
                            name,
                            UID,
                            picture,
                            filename,
                            email,
                            age,
                            number,
                            noOfYears,
                            profession
                        });
                        data.save((err, data) => {
                            if (data) {
                                return res.status(200).json({
                                    message: "Registration Successful!"
                                })
                            }
                        })
                    }
                })
        }
    })
}

exports.reject = (req, res) => {
    ResData.findOne({ UID: req.body.UID }, function (error, user) {
        if (!user) {
            return res.status(400).json({
                error: "User does not not exist!"
            });
        } else {
            // fs.unlinkSync(path.join(__dirname, 'images/Residence certificate', user.filename));
            ResData.deleteOne({ UID: req.body.UID })
                .then(data => {
                    sgMail.send({
                        from: key.EMAIL_FROM,
                        to: req.body.email,
                        subject: 'Your Residence certificate Application is rejected by gram panchayat officer!',
                        text: `Kindly contact to gram panchayat or email us on ${key.EMAIL_FROM} for more information.`
                    })
                        .then(sent => {
                            return res.status(200).json({
                                message: "Application Rejected successfully!"
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
        }
    })
}

exports.read = (req, res) => {
    ResData.find()
        .exec((err, response) => {
            if (response) {
                return res.status(200).json({
                    data: response
                })
                if (err) {
                    return res.status(500).json({
                        data: err
                    })
                }
            }
        })
}

exports.download = (req, res) => {
    // console.log(req.body)
    Record.findOne({ $and:[{isPaid: true},{number: req.body.number},{name: req.body.name},{forReason:"Residence Certificate"}] }, (err, user) => {
        if (!user) {
            return res.status(400).json({
                error: `No Payment Record found with provided details!`
            });
        } else {
            pdf.create(pdfTemplate(req.body), {}).toFile(path.join(__dirname, 'images/Residence certificate/Certificates', req.body.name) + '.pdf', (error, success) => {
                if (error) {
                    return res.status(400).json({
                        error: "Error while creating a PDF!"
                    })
                } else {
                    pathToAttachment = `${__dirname}/images/Residence certificate/Certificates/${req.body.name}.pdf`;
                    attachment = fs.readFileSync(pathToAttachment).toString("base64");
                    sgMail.send({
                        from: key.EMAIL_FROM,
                        to: req.body.email,
                        subject: 'Your Residence certificate generated Successfully!',
                        text: 'Download certificate file and use it!',
                        attachments: [
                            {
                                content: attachment,
                                filename: `${req.body.name}.pdf`,
                                type: "application/pdf",
                                disposition: "attachment"
                            }
                        ]
                    })
                        .then(sent => {
                            // fs.unlinkSync(`${__dirname}/images/Residence certificate/Certificates/${req.body.name}.pdf`);
                            ResData.findOne({ UID: req.body.UID }, function (error, user) {
                                if (user) {
                                    fs.unlinkSync(path.join(__dirname, 'images/Residence certificate', user.filename));
                                    ResData.deleteOne({ UID: req.body.UID })
                                        .then(data => {
                                            return res.status(200).json({
                                                message: `Your PDF has been sent to ${req.body.email}`
                                            });
                                        })
                                }
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
        }
    });
}


