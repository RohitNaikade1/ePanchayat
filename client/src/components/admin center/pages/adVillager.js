import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axiosInstance from '../../../helpers/axios';
import villager from "./villager.jpg";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform } from 'react-animation-components';
import Sidebar from '../Sidebar';
import Media from 'react-media';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validText = (val) => /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/i.test(val);
const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function AdHome() {
    const [name, setName] = useState();
    const [UID, setUID] = useState();
    const [email, setEmail] = useState();

    const AddRecord = e => {
        const record = {
            name,
            UID,
            email
        }
        axiosInstance.post('villager/addRecord', record)
            .then(res => {
                store.addNotification({
                    title: `${res.data.message}`,
                    message: 'Population related data updated!!',
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
            .catch(err => {
                console.log(err.response)
                store.addNotification({
                    title: `${err.response.data.error}`,
                    message: 'Your data is available in database!',
                    type: "info",
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

    const deleteRecord = e => {
        const record = {
            name,
            UID
        }
        axiosInstance.post('villager/deleteRecord', record)
            .then(res => {
                store.addNotification({
                    title: 'Records deleted successfully!!',
                    message: 'Villager data removed from database!!',
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
        <Media query="(min-width:1300px)">
            {matches => {
                return matches ? <Container fluid className="m-0 p-0">
                    <Row className="d-flex">
                        <Col className="col-md-3">
                            <Sidebar />
                        </Col>
                        <Col className="col-md-7 mt-5 mb-3 text-center">
                            <h1 className="titles">Villager Database Management Section.</h1>
                            <FadeTransform
                                in
                                transformProps={{
                                    exitTransform: 'scale(0.5) translateY(-50%)'
                                }}>
                                <Card className="frm col-md-6 text-center mx-auto mt-5">
                                    <Card.Img varient="top" className="mt-1 col-md-10 col-sm-10 offset-md-1" src={villager}></Card.Img>
                                    <div className="text-center mt-4 mb-4"><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span></div>
                                    <Card.Body>
                                        <LocalForm>
                                            <div className="form-group">
                                                <Row><Col className="col-md-5 offset-md-1">
                                                    <Form.Label>Villager Name:</Form.Label></Col>
                                                    <Col className="col-md-6">
                                                        <Control.text
                                                            autoComplete="off"
                                                            model=".name"
                                                            id="name"
                                                            className="form-control"
                                                            placeholder="Enter Villager Name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            validators={{
                                                                required, validText
                                                            }}
                                                        />
                                                        <Errors
                                                            className="text-danger"
                                                            model=".name"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required ',
                                                                validText: 'Enter a valid Name!'
                                                            }}
                                                        />
                                                    </Col></Row>
                                            </div>
                                            <div className="form-group">
                                                <Row><Col className="col-md-5 offset-md-1">
                                                    <Form.Label>Email Address:</Form.Label></Col>
                                                    <Col className="col-md-6">
                                                        <Control.text
                                                            autoComplete="off"
                                                            model=".email"
                                                            id="email"
                                                            className="form-control"
                                                            placeholder="Enter Villager Email"
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
                                            </div>
                                            <Row><Col>
                                                <div className="form-group">
                                                    <Row><Col className="col-md-5 offset-md-1"><Form.Label>Aadhar Number:</Form.Label></Col>
                                                        <Col className="col-md-6">
                                                            <Control.text
                                                                autoComplete="off"
                                                                model=".UID"
                                                                type="UID"
                                                                id="UID"
                                                                className="form-control"
                                                                placeholder="Enter Adhar No"
                                                                value={UID}
                                                                onChange={(e) => setUID(e.target.value)}
                                                                validators={{
                                                                    required, maxLength: maxLength(12), minLength: minLength(12)
                                                                }}
                                                            />
                                                            <Errors
                                                                className="text-danger"
                                                                model=".UID"
                                                                show="touched"
                                                                messages={{
                                                                    required: 'Required ',
                                                                    minLength: 'UID should be 12 digits!',
                                                                    maxLength: 'UID should be 12 digits!'
                                                                }}
                                                            />
                                                        </Col></Row>

                                                </div></Col></Row>

                                            <div className="text-center mt-3">
                                                <Button variant="primary" onClick={AddRecord}>Submit Record</Button>
                                                <Button variant="danger ml-3" onClick={deleteRecord}>Delete Record</Button>
                                            </div>
                                        </LocalForm>
                                    </Card.Body>
                                </Card></FadeTransform>
                        </Col>
                    </Row>
                </Container> : <div>
                        <h3 className="text-center mt-5 mb-5 titles">This Section is accessible only from Desktop resolutions.</h3>
                    </div>;
            }}
        </Media>
    )
}

export default AdHome;
