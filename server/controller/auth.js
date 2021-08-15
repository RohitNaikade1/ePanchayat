const User = require('../models/userSchema');
const Villager = require('../models/villagerSchema');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const key = require('../config/keys')
const { errorHandler } = require('../services/dbErrorHandeling');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(key.EmailKey);
const { validationResult } = require('express-validator');

exports.signup = (req, res) => {
    const { name, email, password, UID } = req.body;
    const errors = validationResult(req);
    var role = "user";
    if(email===key.adminEmail){
        role="admin";
    }
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        Villager.findOne({
            UID: req.body.UID,name:req.body.name,email:req.body.email
        }, (err, user) => {
            // console.log(user)
            if (!user) {
                return res.status(400).json({
                    error: 'User Details are not present in villager database!'
                });
            } else {
                User.findOne({
                    UID: req.body.UID
                }, (err, user) => {
                    if (user) {
                        return res.status(400).json({
                            error: 'User with this UID is already exists!'
                        });
                    } else {
                        User.findOne({
                            email
                        }).exec((err, user) => {
                            if (user) {
                                return res.status(400).json({
                                    error: 'Email is already exists!'
                                });
                            } else {
                                if (req.body.role) {
                                    role = req.body.role;
                                }
                                const token = jwt.sign(
                                    {
                                        name,
                                        email,
                                        password,
                                        role,
                                        UID
                                    },
                                    key.SECRET_KEY,
                                    {
                                        expiresIn: '1d'
                                    }
                                );
                                const emailData = {
                                    from: key.EMAIL_FROM,
                                    to: email,
                                    subject: 'Account activation link',
                                    html: `
                                        <h1>Please use the following to activate your account</h1>
                                        <p>${key.clientURL}/activate/${token}</p>
                                        <hr />
                                        <p>This email may contain sensetive information</p>
                                        <p>${key.clientURL}</p>
                                    `
                                };
                                sgMail
                                    .send(emailData)
                                    .then(sent => {
                                        return res.status(200).json({
                                            message: `Email has been sent to ${email}`
                                        });
                                    })
                                    .catch(err => {
                                        return res.status(400).json({
                                            success: false,
                                            errors: errorHandler(err)
                                        });
                                    });
                            }
                        });
                    }
                })
            }
        })
    }
}

exports.activate = (req, res) => {
    const { token } = req.body;
    // console.log(token)
    if (token) {
        jwt.verify(token, key.SECRET_KEY, (err, decoded) => {
            if (err) {
                // console.log('Activation error');
                return res.status(401).json({
                    errors: 'Expired link. Signup again'
                });
            } else {
                const { name, email, password, UID,role } = jwt.decode(token);
                // var role="user";
                // if(email===key.adminEmail){
                //     role="admin";
                // }
                const username = new Date() + (Math.random()).toString()
                const user = new User({
                    email,
                    name,
                    password,
                    UID,
                    username,
                    role
                });
                user.save((err, user) => {
                    console.log(err)
                    if (err) {
                        console.log('Save error', err);
                        return res.status(401).json({
                            errors: err
                        });
                    } else {
                        return res.json({
                            success: true,
                            message: user,
                            message: 'Signup successful!'
                        });
                    }
                });
            }
        });
    } else {
        return res.json({
            message: 'error happening please try again'
        });
    }
}
exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        // check if user exist
        User.findOne({
            email
        }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    errors: 'User with that email does not exist'
                });
            }
            // authenticate
            if (!user.authenticate(password)) {
                return res.status(400).json({
                    errors: 'Email and password do not match'
                });
            } else {
                const token = jwt.sign(
                    {
                        _id: user._id
                    },
                    key.SECRET_KEY,
                    {
                        expiresIn: '1d'
                    }
                );
                const { _id, name, email, role } = user;

                return res.json({
                    token,
                    user: {
                        _id,
                        name,
                        email,
                        role
                    }
                });
            }
        });
    }
}

exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        User.findOne({
            email
        },
            (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'User with that email does not exist'
                    });
                }
                const token = jwt.sign(
                    {
                        _id: user._id
                    },
                    key.ResetPassword,
                    {
                        expiresIn: '10m'
                    }
                );

                const emailData = {
                    from: key.EMAIL_FROM,
                    to: email,
                    subject: `Password Reset link`,
                    html: `
                      <h1>Please use the following link to reset your password</h1>
                      <p>${key.clientURL}/resetPassword/${token}</p>
                      <hr />
                      <p>This email may contain sensetive information</p>
                      <p>${key.clientURL}</p>
                  `
                };

                return user.updateOne(
                    {
                        resetPasswordLink: token
                    },
                    (err, success) => {
                        if (err) {
                            console.log('RESET PASSWORD LINK ERROR', err);
                            return res.status(400).json({
                                error:
                                    'Database connection error on user password forgot request.'
                            });
                        } else {
                            sgMail
                                .send(emailData)
                                .then(sent => {
                                    // console.log('SIGNUP EMAIL SENT', sent)
                                    return res.json({
                                        message: `Email has been sent to ${email}.`
                                    });
                                })
                                .catch(err => {
                                    // console.log('SIGNUP EMAIL SENT ERROR', err)
                                    return res.json({
                                        message: err.message
                                    });
                                });
                        }
                    }
                );
            }
        );
    }
};

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        if (resetPasswordLink) {
            jwt.verify(resetPasswordLink, key.ResetPassword, function (
                err,
                decoded
            ) {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        error: 'Expired link. Try again'
                    });
                }

                User.findOne(
                    {
                        resetPasswordLink
                    },
                    (err, user) => {
                        if (err || !user) {
                            console.log(err)
                            return res.status(400).json({
                                error: 'Something went wrong. Try later'
                            });
                        }

                        const updatedFields = {
                            password: newPassword,
                            resetPasswordLink: ''
                        };

                        user = _.extend(user, updatedFields);

                        user.save((err, result) => {
                            if (err) {
                                console.log(err)
                                return res.status(400).json({
                                    error: 'Error resetting user password'
                                });
                            }
                            res.json({
                                message: `Password updated successfully! `
                            });
                        });
                    }
                );
            });
        }
    }
};

const client = new OAuth2Client(key.GoogleClientID);
// Google Login
exports.google = (req, res) => {
    const { idToken } = req.body;
    const username = new Date() + (Math.random()).toString()
    client
        .verifyIdToken({ idToken, audience: key.GoogleClientID })
        .then(response => {
            // console.log('GOOGLE LOGIN RESPONSE',response)
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({ email:email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, key.SECRET_KEY, {
                            expiresIn: '1d'
                        });
                        var { _id, email, name, role } = user;
                        if(email===key.adminEmail){
                            role="admin";
                        }else{
                            role="user";
                        }
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        });
                    } else {
                        // let password = email + key.SECRET_KEY;
                        // var role="user";
                        // if(email===key.adminEmail){
                        //     role="admin";
                        // }
                        // user = new User({ name, email, password,username,role });
                        // user.save((err, data) => {
                        //     if (err) {
                        //         console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                        //         return res.status(400).json({
                        //             error: 'User signup failed with google'
                        //         });
                        //     } else {
                        //         const token = jwt.sign(
                        //             { _id: data._id },
                        //             key.SECRET_KEY,
                        //             { expiresIn: '1d' }
                        //         );
                        //         const { _id, email, name, role } = data;
                        //         return res.json({
                        //             token,
                        //             user: { _id, email, name, role }
                        //         });
                        //     }
                        // });
                        return res.status(400).json({
                            error: "failed"
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    error: 'Google login failed. Try again'
                });
            }
        });
};

exports.facebook = (req, res) => {
    // console.log('FACEBOOK LOGIN REQ BODY', req.body);
    const username = new Date() + (Math.random()).toString()
    const { userID, accessToken } = req.body;

    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    return (
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => {
                const { email, name } = response;
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, key.SECRET_KEY, {
                            expiresIn: '1d'
                        });
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        });
                    } else {
                        // let password = email + key.SECRET_KEY;
                        // user = new User({ name, email, password,username });
                        // user.save((err, data) => {
                        //     if (err) {
                        //         // console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                        //         return res.status(400).json({
                        //             error: 'User signup failed with facebook'
                        //         });
                        //     } else {
                        //         const token = jwt.sign(
                        //             { _id: data._id },
                        //             key.SECRET_KEY,
                        //             { expiresIn: '1d' }
                        //         );
                        //         const { _id, email, name, role } = data;
                        //         return res.json({
                        //             token,
                        //             user: { _id, email, name, role }
                        //         });
                        //     }
                        // });
                        return res.status(400).json({
                            error: "failed"
                        });
                    }
                });
            })
            .catch(error => {
                res.json({
                    error: 'Facebook login failed. Try later'
                });
            })
    );
};
