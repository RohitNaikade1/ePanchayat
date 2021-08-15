import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axiosInstance from '../../../helpers/axios';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import Media from 'react-media';
import { FadeTransform } from 'react-animation-components';
import Sidebar from '../Sidebar';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const validNumber = (val) => /^[0-9]*$/i.test(val);

function AdHome() {
    const [yearOne, setyearOne] = useState();
    const [yearTwo, setyearTwo] = useState();
    const [yearThree, setyearThree] = useState();
    const [yearFour, setyearFour] = useState();
    const [yearFive, setyearFive] = useState();
    const [oneMen, setoneMen] = useState();
    const [twoMen, settwoMen] = useState();
    const [threeMen, setthreeMen] = useState();
    const [fourMen, setfourMen] = useState();
    const [fiveMen, setfiveMen] = useState();
    const [oneWomen, setoneWomen] = useState();
    const [twoWomen, settwoWomen] = useState();
    const [threeWomen, setthreeWomen] = useState();
    const [fourWomen, setfourWomen] = useState();
    const [fiveWomen, setfiveWomen] = useState();

    const [litYearOne, setlitYearOne] = useState();
    const [litYearTwo, setlitYearTwo] = useState();
    const [litYearThree, setlitYearThree] = useState();
    const [litYearFour, setlitYearFour] = useState();
    const [litYearFive, setlitYearFive] = useState();
    const [litOneMen, setlitOneMen] = useState();
    const [litTwoMen, setlitTwoMen] = useState();
    const [litThreeMen, setlitThreeMen] = useState();
    const [litFourMen, setlitFourMen] = useState();
    const [litFiveMen, setlitFiveMen] = useState();
    const [litOneWomen, setlitOneWomen] = useState();
    const [litTwoWomen, setlitTwoWomen] = useState();
    const [litThreeWomen, setlitThreeWomen] = useState();
    const [litFourWomen, setlitFourWomen] = useState();
    const [litFiveWomen, setlitFiveWomen] = useState();

    const [oneChildren, setoneChildren] = useState();
    const [twoChildren, settwoChildren] = useState();
    const [threeChildren, setthreeChildren] = useState();
    const [fourChildren, setfourChildren] = useState();
    const [fiveChildren, setfiveChildren] = useState();
    const submitPopulation = e => {
        // e.preventDefault();
        const population = {
            ID: 101,
            years: [yearOne, yearTwo, yearThree, yearFour, yearFive],
            menCount: [Number(oneMen), Number(twoMen), Number(threeMen), Number(fourMen), Number(fiveMen)],
            womenCount: [Number(oneWomen), Number(twoWomen), Number(threeWomen), Number(fourWomen), Number(fiveWomen)],
            childrenCount: [Number(oneChildren), Number(twoChildren), Number(threeChildren), Number(fourWomen), Number(fiveChildren)]
        }
        console.log(population)
        axiosInstance.post('populate/add', population);
        store.addNotification({
            title: 'Records updated successfully!!',
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
    }
    const submitLiteracy = e => {
        // e.preventDefault();
        const literacy = {
            ID: 101,
            years: [Number(litYearOne), Number(litYearTwo), Number(litYearThree), Number(litYearFour), Number(litYearFive)],
            menCount: [Number(litOneMen), Number(litTwoMen), Number(litThreeMen), Number(litFourMen), Number(litFiveMen)],
            womenCount: [Number(litOneWomen), Number(litTwoWomen), Number(litThreeWomen), Number(litFourWomen), Number(litFiveWomen)]
        }
        console.log(literacy)
        axiosInstance.post('literate/add', literacy);
        store.addNotification({
            title: 'Records updated successfully!!',
            message: 'Literacy related data updated!!',
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
        <Media query="(min-width:1300px)">
        {matches => {
            return matches ?<Container fluid className="m-0 p-0">
                <Row className="d-flex">
                    <Col className="col-md-3">
                        <Sidebar />
                    </Col>
                    <Col className="col-md-7 mt-5 mb-3 text-center">
                        <h1 className="titles">Home section.</h1>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card className="mt-3">
                                <Card.Header className="heads">Population of village in last Five surveys.</Card.Header>
                                <Card.Body>
                                    <LocalForm>
                                        <Row className="col-md-12">
                                            <Col className="col-md-1">
                                                <Form.Label>1.</Form.Label>
                                            </Col>
                                            <Col className="col-md-2">
                                                <Control.text
                                                    type="text"
                                                    className="form-control"
                                                    model=".firstYear"
                                                    placeholder="Year"
                                                    autoComplete="off"
                                                    value={yearOne}
                                                    onChange={e => setyearOne(e.target.value)}
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".firstYear"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    className="form-control"
                                                    model=".oneMen"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={oneMen}
                                                    onChange={e => setoneMen(e.target.value)}
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".oneMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    className="form-control"
                                                    model=".oneWomen"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={oneWomen}
                                                    onChange={e => setoneWomen(e.target.value)}
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".oneWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    className="form-control"
                                                    model=".oneChildren"
                                                    autoComplete="off"
                                                    placeholder="Children Count"
                                                    value={oneChildren}
                                                    onChange={e => setoneChildren(e.target.value)}
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".oneChildren"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>2.</Form.Label>
                                            </Col>
                                            <Col className="col-md-2">
                                                <Control.text
                                                    type="text"
                                                    model=".yearTwo"
                                                    className="form-control"
                                                    placeholder="Year"
                                                    autoComplete="off"
                                                    value={yearTwo}
                                                    onChange={e => setyearTwo(e.target.value)}
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".yearTwo"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".twoMen"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={twoMen}
                                                    onChange={e => settwoMen(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".twoMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".twoWomen"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={twoWomen}
                                                    onChange={e => settwoWomen(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".twoWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".twoChildren"
                                                    autoComplete="off"
                                                    placeholder="Children Count"
                                                    value={twoChildren}
                                                    onChange={e => settwoChildren(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".twoChildren"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>3.</Form.Label>
                                            </Col>
                                            <Col className="col-md-2">
                                                <Control.text
                                                    type="text"
                                                    model=".yearThree"
                                                    placeholder="Year"
                                                    autoComplete="off"
                                                    value={yearThree}
                                                    onChange={e => setyearThree(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".yearThree"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Form.Control
                                                    type="text"
                                                    model=".threeMen"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={threeMen}
                                                    onChange={e => setthreeMen(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".threeMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".threeWomen"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={threeWomen}
                                                    onChange={e => setthreeWomen(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".threeWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    model=".threeChildren"
                                                    placeholder="Children Count"
                                                    value={threeChildren}
                                                    onChange={e => setthreeChildren(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".threeChildren"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>4.</Form.Label>
                                            </Col>
                                            <Col className="col-md-2">
                                                <Control.text
                                                    type="text"
                                                    model=".yearFour"
                                                    placeholder="Year"
                                                    autoComplete="off"
                                                    value={yearFour}
                                                    onChange={e => setyearFour(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".yearFour"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".fourMen"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={fourMen}
                                                    onChange={e => setfourMen(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".fourMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".fourWomen"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={fourWomen}
                                                    onChange={e => setfourWomen(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".fourWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".fourChildren"
                                                    autoComplete="off"
                                                    placeholder="Children Count"
                                                    value={fourChildren}
                                                    onChange={e => setfourChildren(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".fourChildren"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>5.</Form.Label>
                                            </Col>
                                            <Col className="col-md-2">
                                                <Control.text
                                                    type="text"
                                                    model=".yearFive"
                                                    placeholder="Year"
                                                    autoComplete="off"
                                                    value={yearFive}
                                                    onChange={e => setyearFive(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".yearFive"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".fiveMen"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={fiveMen}
                                                    onChange={e => setfiveMen(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".fiveMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".fiveWomen"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={fiveWomen}
                                                    onChange={e => setfiveWomen(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".fiveWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    model=".fiveChildren"
                                                    autoComplete="off"
                                                    placeholder="Children Count"
                                                    value={fiveChildren}
                                                    onChange={e => setfiveChildren(e.target.value)}
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".fiveChildren"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Button className="mt-4" type="submit" onClick={submitPopulation}>Update Records</Button>
                                    </LocalForm>
                                </Card.Body>
                            </Card></FadeTransform>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card className="mt-3">
                                <Card.Header className="heads">Literacy Rate of village in last Five surveys.</Card.Header>
                                <Card.Body>
                                    <LocalForm>
                                        <Row className="col-md-12">
                                            <Col className="col-md-1">
                                                <Form.Label>1.</Form.Label>
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Year"
                                                    autoComplete="off"
                                                    value={litYearOne}
                                                    onChange={e => setlitYearOne(e.target.value)}
                                                    model=".litYearOne"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litYearOne"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={litOneMen}
                                                    onChange={e => setlitOneMen(e.target.value)}
                                                    model=".litOneMen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litOneMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={litOneWomen}
                                                    onChange={e => setlitOneWomen(e.target.value)}
                                                    model=".litOneWomen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litOneWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>2.</Form.Label>
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Year"
                                                    autoComplete="off"
                                                    value={litYearTwo}
                                                    onChange={e => setlitYearTwo(e.target.value)}
                                                    model=".litYearTwo"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litYearTwo"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={litTwoMen}
                                                    onChange={e => setlitTwoMen(e.target.value)}
                                                    model=".litTwoMen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litTwoMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={litTwoWomen}
                                                    onChange={e => setlitTwoWomen(e.target.value)}
                                                    model=".litTwoWomen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litTwoWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>3.</Form.Label>
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Year"
                                                    autoComplete="off"
                                                    value={litYearThree}
                                                    onChange={e => setlitYearThree(e.target.value)}
                                                    model=".litYearThree"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litYearThree"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={litThreeMen}
                                                    onChange={e => setlitThreeMen(e.target.value)}
                                                    model=".litThreeMen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litThreeMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={litThreeWomen}
                                                    onChange={e => setlitThreeWomen(e.target.value)}
                                                    model=".litThreeWomen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litThreeWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>4.</Form.Label>
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Year"
                                                    autoComplete="off"
                                                    value={litYearFour}
                                                    onChange={e => setlitYearFour(e.target.value)}
                                                    model=".litYearFour"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litYearFour"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={litFourMen}
                                                    onChange={e => setlitFourMen(e.target.value)}
                                                    model=".litFourMen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litFourMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={litFourWomen}
                                                    onChange={e => setlitFourWomen(e.target.value)}
                                                    model=".litFourWomen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litFourWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="col-md-12 mt-3">
                                            <Col className="col-md-1">
                                                <Form.Label>5.</Form.Label>
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Enter Year"
                                                    autoComplete="off"
                                                    value={litYearFive}
                                                    onChange={e => setlitYearFive(e.target.value)}
                                                    model=".litYearFive"
                                                    className="form-control"
                                                    validators={{
                                                        required
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litYearFive"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required '
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    placeholder="Men Count"
                                                    autoComplete="off"
                                                    value={litFiveMen}
                                                    onChange={e => setlitFiveMen(e.target.value)}
                                                    model=".litFiveMen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litFiveMen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                            <Col className="col-md-3">
                                                <Control.text
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Women Count"
                                                    value={litFiveWomen}
                                                    onChange={e => setlitFiveWomen(e.target.value)}
                                                    model=".litFiveWomen"
                                                    className="form-control"
                                                    validators={{
                                                        required,validNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".litFiveWomen"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validNumber:"Enter a valid Number!"
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Button className="mt-4" type="submit" onClick={submitLiteracy}>Update Records</Button>
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
