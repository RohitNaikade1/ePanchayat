import React, { useState, useEffect } from "react";
import loginImg from "./unlock.jpg";
import './login.css';
import { FaSignInAlt } from "react-icons/fa";
import jwt from 'jsonwebtoken';
import { Row, Col, Card, Container, Button, Form } from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import axiosInstance from "../../helpers/axios";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { Redirect } from 'react-router-dom'
import history from '../../helpers/history';

const Activate = ({ match }) => {
    const [formData, setFormData] = useState({
        name: '',
        token: '',
        show: true
    });

    useEffect(() => {
        console.log(match)
        let token = match.params.token;

        let { name } = jwt.decode(token);

        if (token) {
            setFormData({ ...formData, name, token });
        }

        console.log(token, name);
    }, [match.params]);
    const { name, token, show } = formData;
    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post("user/activate", {
                token
            })
            .then(res => {
                setFormData({
                    ...formData,
                    show: false
                });

                store.addNotification({
                    title: `${res.data.message}`,
                    message: 'Now you can sign in into system!',
                    type: "info",
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
                history.push('/login');
                window.location.reload(false);
            });

    }
    return (
        <Container className="mb-3" fluid>
            <Row className="justify-content-md-center">
                <Col className='col-md-5 mt-3' >
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card className="frm">
                            <Card.Img varient="top" width="200" height="200" className="col-md-10 col-sm-10 mt-0 offset-md-1" src={loginImg}></Card.Img>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <div className="text-center mt-2">
                                        <Button variant="primary" type="submit"><FaSignInAlt className="mr-2" />Activate your account.</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card></FadeTransform>
                </Col>
            </Row>
        </Container>
    );
}

export default Activate;

