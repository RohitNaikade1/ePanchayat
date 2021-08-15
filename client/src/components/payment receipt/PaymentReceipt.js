import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { isAuth } from '../../helpers/auth';
import axiosInstance from '../../helpers/axios';
import { Control, LocalForm, Errors } from 'react-redux-form';
import PaymentImg from './payment receipt.jpg'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import '../components.css'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validText = (val) => /^[a-zA-Z]+ [a-zA-Z]+$/i.test(val);

const PaymentReceipt = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const paymentData = {
            name: name,
            email: email
        }
    }
    return (
        <Container fluid className="mb-3">
            <Row className="justify-content-md-center">
                <Col className='col-md-5 mt-3' >
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card className='frm'>
                            <div className="text-center mt-4 mb-2"><h1 className="brand">Payment receipt.</h1></div>
                            <Card.Img varient="top" className="pic mt-1 col-md-6 col-sm-10 offset-md-3" src={PaymentImg}></Card.Img>
                            <div className="text-center mt-4 mb-4"><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span></div>
                            <Card.Body>
                                <LocalForm onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <Row><Col className="col-md-3 offset-md-1">
                                            <Form.Label>Name:</Form.Label></Col>
                                            <Col className="col-md-7">
                                                <Control.text 
                                                    model=".name"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    placeholder="Enter applicant's full name"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    validators={{
                                                        required, validText, maxLength: maxLength(20), minLength: minLength(3)
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".name"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validText: 'Enter a valid Name!',
                                                        maxLength: 'Length should be less than 15 characters!',
                                                        minLength: 'Length should be greater than 3 characters!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div>
                                    <div className="form-group">
                                        <Row><Col className="col-md-3 offset-md-1">
                                            <Form.Label>Mobile No:</Form.Label></Col>
                                            <Col className="col-md-7">
                                                <Control.text  model=".mobNo"
                                                    className="form-control"
                                                    placeholder="Enter Mobile Number"
                                                    name="mobNo"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    validators={{
                                                        required, isNumber, maxLength: maxLength(10), minLength: minLength(10)
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".mobNo"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        isNumber: 'Enter a valid Number!',
                                                        maxLength: 'Length should be less than 10 characters!',
                                                        minLength: 'Length should be exact 10 characters!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div>
                                    <div className="text-center mt-4">
                                        <Button variant="primary" type="submit">Pay Now</Button>
                                    </div>
                                </LocalForm>
                            </Card.Body>
                        </Card></FadeTransform></Col>
            </Row>
        </Container>
    )
}

export default PaymentReceipt;