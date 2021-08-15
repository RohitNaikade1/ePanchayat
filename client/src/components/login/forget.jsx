import React, { useState } from "react";
import loginImg from "./forget.jpg";
import './login.css';
import { FaSignInAlt } from "react-icons/fa";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Col, Card, Container, Button, Form } from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import axiosInstance from "../../helpers/axios";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Activate = ({ match }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        axiosInstance.post("user/forgotPassword", {
                email
            })
            .then(res => {
                store.addNotification({
                    title: `${res.data.message}`,
                    message: 'Follow the instructions to activate your account.',
                    type: "success",
                    container: 'top-right',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        showIcon: true
                    }
                })
            })
            .catch(err => {
                store.addNotification({
                    title: `${err.response.data.errors}`,
                    message: 'Try Again!',
                    type: "danger",
                    container: 'top-right',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        showIcon: true
                    }
                })

            });
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
                                        <Row><Col className="col-md-3 offset-md-1">
                                            <Form.Label>Email Id:</Form.Label></Col>
                                            <Col className="col-md-6">
                                                <Control.text
                                                    autoComplete="off"
                                                    model=".email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Enter Your Email Id"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    validators={{
                                                        required, validEmail
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".email"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validEmail: 'Enter a valid email address!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div>
                                    <div className="text-center mt-5">
                                        <Button variant="primary" type="submit">
                                            <FaSignInAlt  className="mr-2"/>submit</Button>
                                    </div>
                                </LocalForm>
                            </Card.Body>
                        </Card></FadeTransform>
                </Col>
            </Row>
        </Container>
    );
}

export default Activate;

