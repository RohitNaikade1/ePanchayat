import React, { useState } from 'react';
import './revenue.css';
import axiosInstance from '../../helpers/axios';
import { Redirect } from 'react-router';
import { isAuth } from '../../helpers/auth';
import RevenueImg from './revenue.jpg';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validText = (val) => /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/i.test(val);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validMobile = (val) => /^\+91[7-9][0-9]{9}$/i.test(val);

const Residence = () => {
    const [name, setName] = useState("");
    const [UID, setUID] = useState();
    const [picture, setPicture] = useState();
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState();

    const Approve = e => {
        let formData = new FormData();
        const display = true;
        formData.append('name', name);
        formData.append('UID', Number(UID));
        formData.append('picture', picture);
        formData.append('email', email);
        formData.append('number', number);
        formData.append('display', display);

        axiosInstance.post('revenue/create', formData)
            .then(res => {
                store.addNotification({
                    title: 'Registration Successful!!',
                    message: 'Your Application is Submitted Successfully!',
                    type: "success",
                    container: 'top-right',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        showIcon: true
                    }
                })
                window.location.reload(false);
            })
    }
    return (
        isAuth() ? isAuth() && isAuth().role === 'admin' || isAuth().role === 'user'
            ?
            <Container fluid className="mb-3">
                <Row className="justify-content-md-center">
                    <Col className='col-md-5 mt-3' >
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card className='frm'>
                                <div className="text-center mt-4 mb-2"><h1 className="brand">Revenue tax receipt.</h1></div>
                                <Card.Img varient="top" className="pic mt-1 col-md-6 col-sm-10 offset-md-3" src={RevenueImg}></Card.Img>
                                <div className="text-center mt-4 mb-4"><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span></div>
                                <Card.Body>
                                    <LocalForm onSubmit={Approve}>
                                        <div className="form-group">
                                            <Row><Col className="col-md-3 offset-md-1">
                                                <Form.Label>Name:</Form.Label></Col>
                                                <Col className="col-md-7">
                                                    <Control.text
                                                        model=".name"
                                                        className="form-control"
                                                        autoComplete="off"
                                                        placeholder="Enter Applicant's Full Name"
                                                        name="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        validators={{
                                                            required, validText, maxLength: maxLength(50), minLength: minLength(3)
                                                        }}
                                                    />
                                                    <Errors
                                                        className="text-danger"
                                                        model=".name"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required ',
                                                            validText: 'Enter a valid Name!',
                                                            maxLength: 'Length should be less than 50 characters!',
                                                            minLength: 'Length should be greater than 3 characters!'
                                                        }}
                                                    />
                                                </Col></Row>
                                        </div>
                                        <Row><Col>
                                            <div className="form-group">
                                                <Row><Col className="col-md-3 offset-md-1"><Form.Label>Adhar Number:</Form.Label></Col>
                                                    <Col className="col-md-7">
                                                        <Control.text
                                                            model=".adhar"
                                                            autoComplete="off"
                                                            className="form-control"
                                                            placeholder="Adhar Number"
                                                            name="Adhar Number"
                                                            value={UID}
                                                            onChange={(e) => setUID(e.target.value)}
                                                            validators={{
                                                                required, isNumber, maxLength: maxLength(12), minLength: minLength(12)
                                                            }}
                                                        />
                                                        <Errors
                                                            className="text-danger"
                                                            model=".adhar"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required ',
                                                                isNumber: 'Enter a valid Number!',
                                                                maxLength: 'Length should be less than 12 characters!',
                                                                minLength: 'Length should be exact 12 characters!'
                                                            }}
                                                        />
                                                    </Col></Row>
                                            </div></Col></Row>
                                        <div className="form-group">
                                            <Row><Col className="col-md-3 offset-md-1">
                                                <Form.Label>Mobile Number:</Form.Label></Col>
                                                <Col className="col-md-7">
                                                    <Control.text
                                                        model=".mobile"
                                                        className="form-control"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        spellCheck="off"
                                                        placeholder="Enter Mobile Number"
                                                        name="number"
                                                        value={number}
                                                        onChange={(e) => setNumber(e.target.value)}
                                                        validators={{
                                                            required, validMobile
                                                        }}
                                                    />
                                                    <Errors
                                                        className="text-danger"
                                                        model=".mobile"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required ',
                                                            validMobile: 'Enter a valid Mobile number!'
                                                        }}
                                                    />
                                                </Col></Row>
                                        </div>
                                        <Form.Group controlId="formGroupEmail">
                                            <Row><Col className="col-md-3 offset-md-1">
                                                <Form.Label>Email Id:</Form.Label></Col>
                                                <Col className="col-md-7">
                                                    <Control.text type="email"
                                                        placeholder="Enter Your Email Id"
                                                        autoComplete="off"
                                                        className="form-control"
                                                        model=".email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
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
                                        </Form.Group>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-3 offset-md-1">
                                                <Form.Label>Profile Photo:</Form.Label>
                                            </Col>
                                            <Col className="col-md-7">
                                                <Form.Group>
                                                    <Form.File id="exampleFormControlFile1"
                                                        accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                                        onChange={e => setPicture(e.target.files[0])} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className="text-center mt-4">
                                            <Button variant="primary" type="submit">Apply</Button>
                                        </div>
                                    </LocalForm>
                                </Card.Body>
                            </Card></FadeTransform></Col>
                </Row>

            </Container> : <Redirect to="/" /> : <Redirect to="/login" />
    )
}

export default Residence;