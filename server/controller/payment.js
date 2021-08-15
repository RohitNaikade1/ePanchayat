const Record = require("../models/paymentSchema");
const ResidenceRecord = require("../models/residenceSchema");
const RevenueRecord = require("../models/revenueSchema");
const pdf = require('html-pdf')
const pdfTemplate = require('../documents/payment/index')
const Razorpay = require('razorpay')
const shortid = require("shortid")
const path = require("path");
const fs = require('fs')
const crypto = require("crypto")
const key = require('../config/keys')
const sgMail = require('@sendgrid/mail');
const { userInfo } = require("os");
sgMail.setApiKey(key.EmailKey);

const razorpay = new Razorpay({
    key_id: 'rzp_test_Y179EKf01voYPw',
    key_secret: 'azajU71KY1gEhtihUKe3340L'
})

exports.razorpay = async (req, res) => {
    const payment_capture = 1
    const currency = 'INR';
    const number = req.body.number;
    const forReason = req.body.forReason;
    const name = req.body.name;
    const email = req.body.email;
    const userid = req.body.userid;
    if (forReason == "Residence Certificate") {
        ResidenceRecord.findOne({ number: number }, (err, success) => {
            if (!success) {
                msgs = {
                    error: "No application found on Residence desk!",
                    sub: "Firstly apply for residence certificate!"
                }
                res.status(401).json({
                    error: msgs
                })
            } else {
                const amount = 50 * 100;
                Record.findOne({ number: number, forReason: forReason, isPaid: true }, async (err, user) => {
                    if (!user) {
                        const options = {
                            currency,
                            receipt: shortid.generate(),
                            payment_capture,
                            amount: amount
                        }
                        const response = await razorpay.orders.create(options)
                        const orderid = response.id;
                        Record.findOne({ number: number, forReason: forReason }, (err, response) => {
                            console.log(response)
                            if (response) {
                                console.log(name,email, forReason, number,amount / 100,orderid )
                                Record.findOneAndUpdate({ number: number, forReason: forReason },
                                    { $set: { name: name, email: email, forReason: forReason, number: number, amount: amount / 100, order_id: orderid } },
                                    {new:true}, (err, resp) => {
                                        console.log(resp)
                                        if (resp) {
                                            const data = new Record({
                                                name,
                                                email,
                                                forReason,
                                                number,
                                                amount: amount / 100,
                                                order_id: orderid
                                            });
                                            res.status(200).json({
                                                data: {
                                                    resp,
                                                    id: orderid,
                                                    currency: response.currency,
                                                    amount: response.amount
                                                }
                                            })
                                        } else {
                                            msgs = {
                                                error: "Error while hosting a payment!",
                                                sub: "Please try again later!"
                                            }
                                            res.status(401).json({
                                                error: msgs
                                            })
                                        }
                                    })
                            } else {
                                const data = new Record({
                                    name,
                                    email,
                                    forReason,
                                    number,
                                    amount: amount / 100,
                                    order_id: orderid
                                });
                                const options = {
                                    currency,
                                    receipt: shortid.generate(),
                                    payment_capture,
                                    amount: amount
                                }
                                data.save((err, data) => {
                                    if (data) {
                                        res.status(200).json({
                                            data: {
                                                data,
                                                id: orderid,
                                                currency: options.currency,
                                                amount: options.amount
                                            }
                                        })
                                    }
                                })
                            }
                        })

                    } else {
                        msgs = {
                            error: "Payment Record with this number already exists!",
                            sub: "Kindly contact to gram panchayat officer!"
                        }
                        res.status(401).json({
                            error: msgs
                        })
                    }
                })
            }
        })
    } else {
        RevenueRecord.findOne({ name: name, number: number }, (err, data) => {
            if (!data) {
                msgs = {
                    error: "No application found on revenue desk!",
                    sub: "Firstly apply for revenue tax receipt!"
                }  
                res.status(401).json({
                    error: msgs
                })
            } else {
                const amount = data.total * 100;
                Record.findOne({ number: number, forReason: forReason, isPaid: true }, async (err, user) => {
                    if (!user) {
                        const options = {
                            currency,
                            receipt: shortid.generate(),
                            payment_capture,
                            amount: amount
                        }
                        const response = await razorpay.orders.create(options)
                        const orderid = response.id;
                        Record.findOne({ number: number, forReason: forReason }, (err, response) => {
                            console.log(response)
                            if (response) {
                                console.log(name,email, forReason, number,amount / 100,orderid )
                                Record.findOneAndUpdate({ number: number, forReason: forReason },
                                    { $set: { name: name, email: email, forReason: forReason, number: number, amount: amount / 100, order_id: orderid } },
                                    {new:true}, (err, resp) => {
                                        console.log(resp)
                                        if (resp) {
                                            const data = new Record({
                                                name,
                                                email,
                                                forReason,
                                                number,
                                                amount: amount / 100,
                                                order_id: orderid
                                            });
                                            res.status(200).json({
                                                data: {
                                                    resp,
                                                    id: orderid,
                                                    currency: response.currency,
                                                    amount: response.amount
                                                }
                                            })
                                        } else {
                                            msgs = {
                                                error: "Error while hosting a payment!",
                                                sub: "Please try again later!"
                                            }
                                            res.status(401).json({
                                                error: msgs
                                            })
                                        }
                                    })
                            } else {
                                 const data = new Record({
                                    name,
                                    email,
                                    forReason,
                                    number,
                                    amount: amount / 100,
                                    order_id: orderid
                                });
                                const options = {
                                    currency,
                                    receipt: shortid.generate(),
                                    payment_capture,
                                    amount: amount
                                }
                                data.save((err, data) => {
                                    if (data) {
                                        res.status(200).json({
                                            data: {
                                                data,
                                                id: orderid,
                                                currency: options.currency,
                                                amount: options.amount
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        msgs = {
                            error: "Payment Record with this number already exists!",
                            sub: "Kindly contact to gram panchayat officer!"
                        }
                        res.status(401).json({
                            error: msgs
                        })
                    }

                });
            }
        })
    }


}

exports.verification = (req, res) => {

    // console.log(req.body)
    if (req.body.response.razorpay_payment_id) {
        Record.findOneAndUpdate({ number: req.body.number,forReason:req.body.forReason},
            { $set: { isPaid: true, payment_id: req.body.response.razorpay_payment_id } },
            { new: false }, (err, success) => {
                if (success) {
                    // console.log(success)
                    const date = success.updatedAt;
                    const name = success.name;
                    const forReason = success.forReason;
                    const number = success.number;
                    const amount = success.amount;
                    const email = success.email;
                    const order_id = success.order_id;
                    pdf.create(pdfTemplate({ name, forReason, date, number, amount, order_id }), {}).toFile(path.join(__dirname, 'images/payment', name) + '.pdf', (error, success) => {
                        if (error) {
                            return res.status(400).json({
                                error: "Error while creating a PDF!"
                            })
                        } else {
                            pathToAttachment = `${__dirname}/images/payment/${name}.pdf`;
                            attachment = fs.readFileSync(pathToAttachment).toString("base64");
                            sgMail.send({
                                from: key.EMAIL_FROM,
                                to: email,
                                subject: 'Your Payment Receipt generated Successfully!',
                                text: 'Download Payment Receipt and use it!',
                                attachments: [
                                    {
                                        content: attachment,
                                        filename: `${name}.pdf`,
                                        type: "application/pdf",
                                        disposition: "attachment"
                                    }
                                ]
                            })
                                .then(sent => {
                                    fs.unlinkSync(`${__dirname}/images/payment/${name}.pdf`);
                                    return res.status(200).json({
                                        message: `Your PDF has been sent to ${email}`
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    })
                }
            })
    } else {
        Record.deleteOne({ number: req.body.number, forReason: req.body.forReason }, (err, success) => {
            if (success) {
                sgMail.send({
                    from: key.EMAIL_FROM,
                    to: email,
                    subject: 'Opps,Your Payment with eGram Panchayat failed!',
                    text: `Kindly contact to ${key.EMAIL_FROM} or try again!`
                })
                    .then(sent => {
                        return res.status(400).json({
                            message: `Payment status update has been sent to ${email}`
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
    }
}

exports.read = (req, res) => {
    Record.find()
        .exec((err, response) => {
            if (response) {
                return res.status(200).json({
                    data: response
                })
            }
        })
}