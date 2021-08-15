import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import axiosInstance from '../../../helpers/axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Control, LocalForm, Errors } from 'react-redux-form';
import 'animate.css';
import { FadeTransform } from 'react-animation-components';
import Medias from 'react-media';

const required = (val) => val && val.length;

function AdVillage() {
    const [PrevFirstname, setPrevFirstname] = useState("");
    const [PrevSecondname, setPrevSecondname] = useState("");
    const [PrevThirdname, setPrevThirdname] = useState("");
    const [PrevFourthname, setPrevFourthname] = useState("");
    const [PrevFifthname, setPrevFifthname] = useState("");
    const [PrevFirstPeriod, setPrevFirstPeriod] = useState("");
    const [PrevSecondPeriod, setPrevSecondPeriod] = useState("");
    const [PrevThirdPeriod, setPrevThirdPeriod] = useState("");
    const [PrevFourthPeriod, setPrevFourthPeriod] = useState("");
    const [PrevFifthPeriod, setPrevFifthPeriod] = useState("");
    const [PrevFirstCaste, setPrevFirstCaste] = useState("");
    const [PrevSecondCaste, setPrevSecondCaste] = useState("");
    const [PrevThirdCaste, setPrevThirdCaste] = useState("");
    const [PrevFourthCaste, setPrevFourthCaste] = useState("");
    const [PrevFifthCaste, setPrevFifthCaste] = useState("");


    const [CurrFirstname, setCurrFirstname] = useState("");
    const [CurrSecondname, setCurrSecondname] = useState("");
    const [CurrThirdname, setCurrThirdname] = useState("");
    const [CurrFourthname, setCurrFourthname] = useState("");
    const [CurrFifthname, setCurrFifthname] = useState("");
    const [CurrFirstPeriod, setCurrFirstPeriod] = useState("");
    const [CurrSecondPeriod, setCurrSecondPeriod] = useState("");
    const [CurrThirdPeriod, setCurrThirdPeriod] = useState("");
    const [CurrFourthPeriod, setCurrFourthPeriod] = useState("");
    const [CurrFifthPeriod, setCurrFifthPeriod] = useState("");
    const [CurrFirstCaste, setCurrFirstCaste] = useState("");
    const [CurrSecondCaste, setCurrSecondCaste] = useState("");
    const [CurrThirdCaste, setCurrThirdCaste] = useState("");
    const [CurrFourthCaste, setCurrFourthCaste] = useState("");
    const [CurrFifthCaste, setCurrFifthCaste] = useState("");


    const submitCurrRecord = (e) => {
        // e.preventDefault();
        const current = {
            ID: 101,
            Name: [CurrFirstname, CurrSecondname, CurrThirdname, CurrFourthname, CurrFifthname],
            designation: [CurrFirstPeriod, CurrSecondPeriod, CurrThirdPeriod, CurrFourthPeriod, CurrFifthPeriod],
            contact: [CurrFirstCaste, CurrSecondCaste, CurrThirdCaste, CurrFourthCaste, CurrFifthCaste]
        }
        console.log(current)
        axiosInstance.post('currCommittee/addData', current);
        store.addNotification({
            title: 'Records updated successfully!!',
            message: 'current committee data is updated!!',
            type: "success",
            container: 'top-right',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                showIcon: true
            }
        })

    }
    const submitPrevRecord = (e) => {
        // e.preventDefault();
        const previous = {
            ID: 102,
            Name: [PrevFirstname, PrevSecondname, PrevThirdname, PrevFourthname, PrevFifthname],
            workingPeriod: [PrevFirstPeriod, PrevSecondPeriod, PrevThirdPeriod, PrevFourthPeriod, PrevFifthPeriod],
            Caste: [PrevFirstCaste, PrevSecondCaste, PrevThirdCaste, PrevFourthCaste, PrevFifthCaste]
        }
        console.log(previous)
        axiosInstance.post('prevCommittee/addData', previous);
        store.addNotification({
            title: 'Records updated successfully!!',
            message: 'Previous committee data is updated!!',
            type: "success",
            container: 'top-right',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                showIcon: true
            }
        })
    }
    return (
        <Medias query="(min-width:1300px)">
        {matches => {
            return matches ? <Container fluid className="m-0 p-0">
                <Row className="d-flex">
                    <Col className="col-md-3">
                        <Sidebar />
                    </Col>
                    <Col className="col-md-7 mt-5 mb-3 text-center">
                        <h1 className="titles">About Village Section.</h1>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card className="mt-3">
                                <Card.Header className="heads">Last 5 Village Heads.</Card.Header>
                                <Card.Body>
                                    <LocalForm>
                                        <Row className="col-md-12">
                                            <Col className="col-md-1">
                                                <Form.Label>1.</Form.Label>
                                            </Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    autoComplete="off"
                                                    value={PrevFirstname}
                                                    onChange={e => setPrevFirstname(e.target.value)}
                                                    model=".PrevFirstname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFirstname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Period"
                                                    autoComplete="off"
                                                    value={PrevFirstPeriod}
                                                    onChange={e => setPrevFirstPeriod(e.target.value)}
                                                    model=".PrevFirstPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFirstPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Caste"
                                                    value={PrevFirstCaste}
                                                    onChange={e => setPrevFirstCaste(e.target.value)}
                                                    model=".PrevFirstCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFirstCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>2.</Form.Label>
                                            </Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    autoComplete="off"
                                                    value={PrevSecondname}
                                                    onChange={e => setPrevSecondname(e.target.value)}
                                                    model=".PrevSecondname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevSecondname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Period"
                                                    autoComplete="off"
                                                    value={PrevSecondPeriod}
                                                    onChange={e => setPrevSecondPeriod(e.target.value)}
                                                    model=".PrevSecondPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevSecondPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Caste"
                                                    value={PrevSecondCaste}
                                                    onChange={e => setPrevSecondCaste(e.target.value)}
                                                    model=".PrevSecondCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevSecondCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>3.</Form.Label>
                                            </Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    autoComplete="off"
                                                    value={PrevThirdname}
                                                    onChange={e => setPrevThirdname(e.target.value)}
                                                    model=".PrevThirdname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevThirdname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Period"
                                                    value={PrevThirdPeriod}
                                                    onChange={e => setPrevThirdPeriod(e.target.value)}
                                                    model=".PrevThirdPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevThirdPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Caste"
                                                    value={PrevThirdCaste}
                                                    onChange={e => setPrevThirdCaste(e.target.value)}
                                                    model=".PrevThirdCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevThirdCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>4.</Form.Label>
                                            </Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    autoComplete="off"
                                                    value={PrevFourthname}
                                                    onChange={e => setPrevFourthname(e.target.value)}
                                                    model=".PrevFourthname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFourthname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Period"
                                                    value={PrevFourthPeriod}
                                                    onChange={e => setPrevFourthPeriod(e.target.value)}
                                                    model=".PrevFourthPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFourthPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Caste"
                                                    value={PrevFourthCaste}
                                                    onChange={e => setPrevFourthCaste(e.target.value)}
                                                    model=".PrevFourthCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFourthCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1"><Form.Label>5.</Form.Label></Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={PrevFifthname}
                                                    autoComplete="off"
                                                    onChange={e => setPrevFifthname(e.target.value)}
                                                    model=".PrevFifthname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFifthname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Period"
                                                    value={PrevFifthPeriod}
                                                    onChange={e => setPrevFifthPeriod(e.target.value)}
                                                    model=".PrevFifthPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFifthPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Caste"
                                                    value={PrevFifthCaste}
                                                    onChange={e => setPrevFifthCaste(e.target.value)}
                                                    model=".PrevFifthCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".PrevFifthCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Button className="mt-4" type="submit" onClick={submitPrevRecord}>Update Records</Button>
                                    </LocalForm>
                                </Card.Body>
                            </Card></FadeTransform>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card className="mt-3">
                                <Card.Header className="heads">Current Gram panchayat committee.</Card.Header>
                                <Card.Body>
                                    <LocalForm>
                                        <Row className="col-md-12">
                                            <Col className="col-md-1">
                                                <Form.Label>1.</Form.Label>
                                            </Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    autoComplete="off"
                                                    value={CurrFirstname}
                                                    onChange={e => setCurrFirstname(e.target.value)}
                                                    model=".CurrFirstname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFirstname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Designation"
                                                    autoComplete="off"
                                                    value={CurrFirstPeriod}
                                                    onChange={e => setCurrFirstPeriod(e.target.value)}
                                                    model=".CurrFirstPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFirstPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Contact No"
                                                    value={CurrFirstCaste}
                                                    onChange={e => setCurrFirstCaste(e.target.value)}
                                                    model=".CurrFirstCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFirstCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>2.</Form.Label>
                                            </Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    autoComplete="off"
                                                    value={CurrSecondname}
                                                    onChange={e => setCurrSecondname(e.target.value)}
                                                model=".CurrSecondname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrSecondname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Designation"
                                                    autoComplete="off"
                                                    value={CurrSecondPeriod}
                                                    onChange={e => setCurrSecondPeriod(e.target.value)}
                                                model=".CurrSecondPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrSecondPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Contact No"
                                                    value={CurrSecondCaste}
                                                    onChange={e => setCurrSecondCaste(e.target.value)}
                                                model=".CurrSecondCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrSecondCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>3.</Form.Label>
                                            </Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    autoComplete="off"
                                                    value={CurrThirdname}
                                                    onChange={e => setCurrThirdname(e.target.value)}
                                                model=".CurrThirdname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrThirdname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Designation"
                                                    value={CurrThirdPeriod}
                                                    onChange={e => setCurrThirdPeriod(e.target.value)}
                                                model=".CurrThirdPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrThirdPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Contact No"
                                                    value={CurrThirdCaste}
                                                    onChange={e => setCurrThirdCaste(e.target.value)}
                                                model=".CurrThirdCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrThirdCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>4.</Form.Label>
                                            </Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    autoComplete="off"
                                                    value={CurrFourthname}
                                                    onChange={e => setCurrFourthname(e.target.value)}
                                                model=".CurrFourthname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFourthname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Designation"
                                                    value={CurrFourthPeriod}
                                                    onChange={e => setCurrFourthPeriod(e.target.value)}
                                                model=".CurrFourthPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFourthPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Contact No"
                                                    value={CurrFourthCaste}
                                                    onChange={e => setCurrFourthCaste(e.target.value)}
                                                model=".CurrFourthCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFourthCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                /></Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1"><Form.Label>5.</Form.Label></Col>
                                            <Col className="col-md-5">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={CurrFifthname}
                                                    autoComplete="off"
                                                    onChange={e => setCurrFifthname(e.target.value)}
                                                model=".CurrFifthname"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFifthname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Designation"
                                                    value={CurrFifthPeriod}
                                                    onChange={e => setCurrFifthPeriod(e.target.value)}
                                                model=".CurrFifthPeriod"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFifthPeriod"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter Contact No"
                                                    value={CurrFifthCaste}
                                                    onChange={e => setCurrFifthCaste(e.target.value)}
                                                model=".CurrFifthCaste"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".CurrFifthCaste"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Button className="mt-4" type="submit" onClick={submitCurrRecord}>Update Records</Button>
                                    </LocalForm>
                                </Card.Body>
                            </Card></FadeTransform>
                    </Col>
                </Row>
            </Container> : <div>
                        <h3 className="text-center mt-5 mb-5 titles">This Section is accessible only from Desktop resolutions.</h3>
                    </div>;
            }}
        </Medias>
    )
}

export default AdVillage;
