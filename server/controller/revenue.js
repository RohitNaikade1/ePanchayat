const Revenue = require('../models/revenueSchema');
const path = require("path");
const pdf = require('html-pdf')
const fs = require('fs')
const pdfTemplate = require('../documents/Revenue taxes/index')
const key = require('../config/keys')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(key.EmailKey);
const Villager = require('../models/villagerSchema');

exports.create = (req, res) => {

    const name = req.body.name;
    const uid = req.body.UID;
    const number = req.body.number;
    const email = req.body.email;
    const display = req.body.display;
    const picture = `http://localhost:5001/revenue/${req.files.picture.name}`;
    const filename = req.files.picture.name;
    const file = req.files.picture;

    Villager.findOne({
        UID: req.body.UID
    }, (err, user) => {
        if (!user) {
            return res.status(400).json({
                error: 'Adhar Number is not present in villager database!'
            });
        } else {
            Revenue.findOne({ UID: req.body.UID })
                .then((data, err) => {
                    if (data) {
                        fs.unlinkSync(path.join(__dirname, 'images/Revenue tax receipt', data.filename));
                        file.mv(path.join(__dirname, 'images/Revenue tax receipt', file.name), (err) => {
                            if (err) {
                            } else {

                            }
                        });
                        Revenue.findOneAndUpdate({ UID: req.body.UID },
                            {
                                $set: {
                                    name: req.body.name,
                                    picture: picture,
                                    number:number,
                                    filename: filename,
                                    display: display
                                }
                            }
                            , function (err, data) {
                                if (err) {
                                    return res.status(400).json({
                                        error: "Error while updating an application!"
                                    })
                                } else if (data) {
                                    return res.status(200).json({
                                        message: "Your previous application is updated!"
                                    })
                                }
                            }
                        );
                    } else {
                        file.mv(path.join(__dirname, 'images/Revenue tax receipt', file.name), (err) => {
                            if (err) {
                            } else {

                            }
                        });
                        const data = new Revenue({
                            name,
                            UID: uid,
                            picture,
                            number,
                            filename,
                            email
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

exports.approve = (req, res) => {
    Revenue.findOne({ UID: req.body.UID })
        .then((response, err) => {
            if (response.home_tax) {
                var previous = {};

                Revenue.findOne({ UID: req.body.UID }, (err, response) => {
                    previous = {
                        home_tax: response.home_tax,
                        light_tax: response.light_tax,
                        health_tax: response.health_tax,
                        water_tax: response.water_tax,
                        penalty_tax: response.penalty_tax,
                        warrant_tax: response.warrant_tax,
                        total: response.total
                    }
                    Revenue.findOneAndUpdate({ UID: req.body.UID },
                        {
                            $set: {
                                home_tax: req.body.home_tax,
                                light_tax: req.body.light_tax,
                                health_tax: req.body.health_tax,
                                water_tax: req.body.water_tax,
                                penalty_tax: req.body.penalty_tax,
                                warrant_tax: req.body.warrant_tax,
                                total:previous.total+req.body.home_tax+req.body.light_tax+req.body.health_tax+req.body.water_tax+req.body.penalty_tax+req.body.warrant_tax
                            }
                        }
                        , function (err, data) {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                })
                            } else if (data) {
                                pdf.create(pdfTemplate(req.body, previous), {}).toFile(path.join(__dirname, 'images/Revenue tax receipt/Certificates', req.body.name) + '.pdf', (error, success) => {
                                    if (error) {
                                        return res.status(400).json({
                                            error: "Error while creating a PDF!"
                                        })
                                    } else {
                                        pathToAttachment = `${__dirname}/images/Revenue tax receipt/Certificates/${req.body.name}.pdf`;
                                        attachment = fs.readFileSync(pathToAttachment).toString("base64");
                                        sgMail.send({
                                            from: key.EMAIL_FROM,
                                            to: req.body.email,
                                            subject: 'Your Revenue tax receipt gennerated Successfully!',
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
                                                // fs.unlinkSync(`${__dirname}/images/Revenue tax receipt/Certificates/${req.body.name}.pdf`);
                                                return res.status(200).json({
                                                    message: `Your PDF has been sent to ${req.body.email}`
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            });
                                    }
                                })
                            }
                        }
                    );
                })

            } else {

                const previous = {
                    home_tax: 0,
                    light_tax: 0,
                    health_tax: 0,
                    water_tax: 0,
                    penalty_tax: 0,
                    warrant_tax: 0
                }

                Revenue.findOneAndUpdate({ UID: req.body.UID },
                    {
                        $set: {
                            home_tax: req.body.home_tax,
                            light_tax: req.body.light_tax,
                            health_tax: req.body.health_tax,
                            water_tax: req.body.water_tax,
                            penalty_tax: req.body.penalty_tax,
                            warrant_tax: req.body.warrant_tax,
                            total:req.body.home_tax+req.body.light_tax+req.body.health_tax+req.body.water_tax+req.body.penalty_tax+req.body.warrant_tax
                        }
                    }
                    , function (err, data) {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else if (data) {
                            pdf.create(pdfTemplate(req.body, previous), {}).toFile(path.join(__dirname, 'images/Revenue tax receipt/Certificates', req.body.name) + '.pdf', (error, success) => {
                                if (error) {
                                    return res.status(400).json({
                                        error: "Error while creating a PDF!"
                                    })
                                } else {
                                    pathToAttachment = `${__dirname}/images/Revenue tax receipt/Certificates/${req.body.name}.pdf`;
                                    attachment = fs.readFileSync(pathToAttachment).toString("base64");
                                    sgMail.send({
                                        from: key.EMAIL_FROM,
                                        to: req.body.email,
                                        subject: 'Your Revenue tax receipt gennerated Successfully!',
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
                                            fs.unlinkSync(`${__dirname}/images/Revenue tax receipt/Certificates/${req.body.name}.pdf`);
                                            return res.status(200).json({
                                                message: `Your PDF has been sent to ${req.body.email}`
                                            });
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                            })
                        }
                    }
                );
            }
        })

}

exports.reject = (req, res) => {
    Revenue.findOne({ UID: req.body.UID }, function (error, user) {
        if (!user) {
            return res.status(400).json({
                error: "User does not not exist!"
            });
        } else {
            fs.unlinkSync(path.join(__dirname, 'images/Revenue tax receipt', user.filename));
            Revenue.deleteOne({ UID: req.body.UID })
                .then(data => {
                    sgMail.send({
                        from: key.EMAIL_FROM,
                        to: req.body.email,
                        subject: 'Your Revenue tax receipt Application is rejected by gram panchayat officer!',
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
exports.remove = (req, res) => {
    Revenue.findOne({ UID: req.body.UID }, function (error, user) {
        if (!user) {
            return res.status(400).json({
                error: "User does not exist!"
            });
        } else {
            Revenue.findOneAndUpdate({ UID: req.body.UID },
                {
                    $set: {
                        display: false
                    }
                }
                , function (err, data) {
                    if (err) {
                        return res.status(400).json({
                            error: "Error while removing an application!"
                        })
                    } else if (data) {
                        sgMail.send({
                            from: key.EMAIL_FROM,
                            to: req.body.email,
                            subject: 'Your Revenue tax receipt Application is from watchlist!',
                            text: `if you haven't received approve/reject mail by gram panchayat,Kindly contact to gram panchayat or email us on ${key.EMAIL_FROM} for more information.`
                        })
                            .then(sent => {
                                return res.status(200).json({
                                    message: "Application removed successfully from watchlist!"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
            );
        }
    })
}

exports.readData = (req, res) => {
    Revenue.find({}).sort({ updatedAt: -1 })
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




