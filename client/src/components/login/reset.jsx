import React, { useState, useEffect } from "react";
import loginImg from "./reset.jpg";
import './login.css';
import { FaSignInAlt } from "react-icons/fa";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Col, Card, Container, Button, Form } from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import axiosInstance from "../../helpers/axios";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import history from '../../helpers/history';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);

const Reset = ({ match }) => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        let token = match.params.token
        if (token) {
            setToken(token)
        }
    }, [])
    const handleSubmit = () => {
        console.log(password1, password2)
        if (password1 === password2) {
            axiosInstance
                .post("user/resetPassword", {
                    newPassword: password1,
                    resetPasswordLink: token
                })
                .then(res => {
                    console.log(res.data.message)
                    store.addNotification({
                        title: `${res.data.message}`,
                        message: 'Now you can login with your new password.',
                        type: "success",
                        container: 'top-right',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000,
                            showIcon: true
                        }
                    })
                    history.push('/login');
                    window.location.reload(false);
                })
                .catch(err => {
                    store.addNotification({
                        title: "Password Resetting unsuccessful!",
                        message: 'Try again.',
                        type: "success",
                        container: 'top-right',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000,
                            showIcon: true
                        }
                    })
                    history.push('/login');
                    window.location.reload(false);
                });
        } else {
            store.addNotification({
                title: "passwords are not matching!",
                message: 'Try again with ideantical passwords.',
                type: "danger",
                container: 'top-right',
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 3000,
                    showIcon: true
                }
            })
        }
    }
    return (
        <Container className="mb-3" fluid>
            <Row className="justify-content-md-center">
                <Col className='col-md-4 mt-3' >
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card className="frm">
                            <Card.Img varient="top" width="200" height="200" className="col-md-10 col-sm-10 mt-0 offset-md-1" src={loginImg}></Card.Img>
                            <Card.Body>
                                <LocalForm onSubmit={(values) => handleSubmit(values)}>
                                    <div className="form-group">
                                        <Row>
                                            <Col className="col-md-3 offset-md-1">
                                                <Form.Label>Password:</Form.Label></Col>
                                            <Col className="col-md-6">
                                                <Control.text
                                                    autoComplete="off"
                                                    model=".password1"
                                                    id="password1"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Enter Password"
                                                    value={password1}
                                                    onChange={e => setPassword1(e.target.value)}
                                                    validators={{
                                                        required, minLength
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".password1"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        minLength: 'Password should be atleast 8 characters!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div>
                                    <div className="form-group">
                                        <Row>
                                            <Col className="col-md-3 offset-md-1">
                                                <Form.Label>Confirm Password:</Form.Label></Col>
                                            <Col className="col-md-6">
                                                <Control.text
                                                    autoComplete="off"
                                                    model=".password2"
                                                    type="password"
                                                    id="password2"
                                                    className="form-control"
                                                    placeholder="confirm Password"
                                                    value={password2}
                                                    onChange={e => setPassword2(e.target.value)}
                                                    validators={{
                                                        required, minLength
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".password2"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        minLength: 'Password should be atleast 8 characters!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div>
                                    <div className="text-center mt-5">
                                        <Button variant="primary" type="submit">
                                            <FaSignInAlt className="mr-2" />submit</Button>
                                    </div>
                                </LocalForm>
                            </Card.Body>
                        </Card></FadeTransform>
                </Col>
            </Row>
        </Container>
    );
}

export default Reset;

