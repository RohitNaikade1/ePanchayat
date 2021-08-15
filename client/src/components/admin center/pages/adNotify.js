import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axiosInstance from '../../../helpers/axios';
import villager from "./notification.jpg";
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

function AdHome() {
    const [subject, setSubject] = useState();
    const [description, setDescription] = useState();

    const AddRecord = e => {
        const record = {
            subject,
            description
        }
        axiosInstance.post('notify/send', record)
            .then(res => {
                store.addNotification({
                    title: `${res.data.message}`,
                    message: 'Villagers will get notified!!',
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
                    message: 'Something went wrong!',
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

    return (
        <Media query="(min-width:1300px)">
        {matches => {
            return matches ?<Container fluid className="m-0 p-0">
            <Row className="d-flex">
                <Col className="col-md-3">
                    <Sidebar />
                </Col>
                <Col className="col-md-7 mt-4 mb-2 text-center">
                    <h1 className="titles">Notifications Section.</h1>
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card className="frm col-md-6 text-center mx-auto mt-5">
                            <Card.Img varient="top" className="col-md-10 col-sm-10 offset-md-1" src={villager}></Card.Img>
                            <div className="text-center mt-2 mb-2"><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span></div>
                            <Card.Body>
                                <LocalForm>
                                    <div className="form-group">
                                        <Row><Col className="col-md-3 offset-md-1">
                                            <Form.Label>Subject:</Form.Label></Col>
                                            <Col className="col-md-8">
                                                <Control.text
                                                    autoComplete="off"
                                                    model=".subject"
                                                    className="form-control"
                                                    placeholder="Enter Subject"
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    validators={{
                                                        required,minLength: minLength(4)
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".subject"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        minLength: 'Length of description is too short!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div>
                                    <div className="form-group">
                                        <Row><Col className="col-md-3 offset-md-1">
                                            <Form.Label>Description:</Form.Label></Col>
                                            <Col className="col-md-8">
                                                <Control.textarea
                                                    autoComplete="off"
                                                    rows={6}
                                                    model=".description"
                                                    id="description"
                                                    className="form-control"
                                                    placeholder="Enter description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    validators={{
                                                        required,minLength: minLength(4)
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".description"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        minLength: 'Length of description is too short!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div>
                                   

                                    <div className="text-center mt-3">
                                        <Button variant="primary" onClick={AddRecord}>Send Notification</Button>
                                    </div>
                                </LocalForm>
                            </Card.Body>
                        </Card></FadeTransform>
                </Col>
            </Row>
        </Container>: <div>
                        <h3 className="text-center mt-5 mb-5 titles">This Section is accessible only from Desktop resolutions.</h3>
                        </div>;
        }}
        </Media>
    )
}

export default AdHome;
