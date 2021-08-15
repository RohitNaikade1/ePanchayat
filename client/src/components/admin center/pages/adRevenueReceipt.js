import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';

import { readRevenue } from '../../../Redux/actions/revenueActions';
import { Container, Row, Card, Col, Accordion, Form, Media, Button } from 'react-bootstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import axiosInstance from '../../../helpers/axios';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import Medias from 'react-media';
import moment from 'moment';
import DataImg from './applicants.jpg'

function AdRevenue() {
    const [home, setHome] = useState();
    const [water, setWater] = useState();
    const [health, setHealth] = useState();
    const [light, setLight] = useState();
    const [penalty, setPenalty] = useState();
    const [warrant, setWarrant] = useState();


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(readRevenue())
    }, [])
    const revenue = useSelector(state => state.revenue);
    let cards = "";
    const Approve = (data) => {
        console.log(data)
        const revenueData = {
            name: data.name,
            email: data.email,
            UID: data.UID,
            picture: data.picture,
            home_tax: Number(home),
            water_tax: Number(water),
            health_tax: Number(health),
            light_tax: Number(light),
            penalty_tax: Number(penalty),
            warrant_tax: Number(warrant)
        }
        axiosInstance.post('revenue/approve', revenueData)
            .then(res => {
                store.addNotification({
                    title: `${res.data.message}`,
                    message: 'Check your email for updates!',
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
    const Remove = (data) => {
        console.log(data)
        const revenueData = {
            email: data.email,
            UID: data.UID
        }
        axiosInstance.post('revenue/remove', revenueData)
            .then(res => {
                store.addNotification({
                    title: `${res.data.message}`,
                    message: 'Check your email for updates!',
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
    const Reject = (data) => {
        const revenueData = {
            UID: Number(data.UID),
            email: data.email
        }
        axiosInstance.post('revenue/reject', revenueData)
            .then(res => {
                store.addNotification({
                    title: `${res.data.message}`,
                    message: 'Send Notification to villager.',
                    type: "danger",
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
    if (revenue?.revenueData.length) {
        const activeKey = revenue?.revenueData[0]._id;
        cards = revenue?.revenueData.map((data, id) => {
            return (
                (data.display) ? <Card key={id} className="col-md-12 col-sm-12 mt-5">
                    <Accordion className="myAccordian" defaultActiveKey={activeKey}>
                        <Accordion.Toggle as={Card.Header} className="back" eventKey={data._id}>
                            <h4 className="heads">{data.name}</h4>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={data._id}>
                            <Card.Body>
                                <Media tag="li">
                                    <img
                                        width={200}
                                        height={200}
                                        className="mr-3 img-thumbnail"
                                        src={data.picture}
                                        alt={data.name}
                                    />
                                    <Media.Body className="ml-auto text-left">
                                        <p><b>Applicant Name:</b>  {data.name}</p>
                                        <p><b>Email Address:</b>  {data.email}</p>
                                        <p><b>Adhaar Number:</b>  {data.UID}</p>
                                        <p><b>Application Date:</b>  {moment(data.updatedAt).format('DD/MM/YYYY')}</p>
                                    </Media.Body>
                                </Media>
                                <hr />
                                <Form className="">
                                    <Row><Col>
                                        <Form.Group controlId="formGroupPassword">
                                            <Row className="col-md-12 mt-3 d-flex justify-content-md-center">
                                                <Col className="col-md-2"><Form.Label>Home Tax:</Form.Label></Col>
                                                <Col className="col-md-2">
                                                    <Form.Control type="tax"
                                                        autoComplete="off"
                                                        placeholder="Home tax"
                                                        name="home tax"
                                                        value={home}
                                                        onChange={(e) => setHome(e.target.value)}
                                                    />
                                                </Col>
                                                <Col className="col-md-2"><Form.Label>Light Tax:</Form.Label></Col>
                                                <Col className="col-md-2">
                                                    <Form.Control type="tax"
                                                        autoComplete="off"
                                                        placeholder="Light tax"
                                                        name="Light tax"
                                                        value={light}
                                                        onChange={(e) => setLight(e.target.value)}
                                                    />
                                                </Col></Row>
                                        </Form.Group></Col></Row>
                                    <Row><Col>
                                        <Form.Group controlId="formGroupPassword">
                                            <Row></Row>
                                        </Form.Group></Col></Row>
                                    <Row><Col>
                                        <Form.Group controlId="formGroupFile">
                                            <Row className="col-md-12 mt-3 d-flex justify-content-md-center">
                                                <Col className="col-md-2"><Form.Label>Health tax:</Form.Label></Col>
                                                <Col className="col-md-2">
                                                    <Form.Control type="tax"
                                                        autoComplete="off"
                                                        placeholder="Health tax"
                                                        name="Health tax"

                                                        value={health}
                                                        onChange={(e) => setHealth(e.target.value)}
                                                    />
                                                </Col>
                                                <Col className="col-md-2"><Form.Label>Water Tax:</Form.Label></Col>
                                                <Col className="col-md-2">
                                                    <Form.Control type="tax"
                                                        autoComplete="off"
                                                        placeholder="Water tax"
                                                        name="Water tax"

                                                        value={water}
                                                        onChange={(e) => setWater(e.target.value)}
                                                    />
                                                </Col></Row>
                                        </Form.Group></Col></Row>
                                    <Row><Col>
                                        <Form.Group controlId="formGroupFile">
                                            <Row className="col-md-12 mt-3 d-flex justify-content-md-center">
                                                <Col className="col-md-2"><Form.Label>Penalty Tax:</Form.Label></Col>
                                                <Col className="col-md-2">
                                                    <Form.Control type="tax"
                                                        autoComplete="off"
                                                        placeholder="Penalty tax"
                                                        name="Pen. tax"

                                                        value={penalty}
                                                        onChange={(e) => setPenalty(e.target.value)}
                                                    />
                                                </Col>
                                                <Col className="col-md-2 float-right"><Form.Label>Warrant Tax:</Form.Label></Col>
                                                <Col className="col-md-2">
                                                    <Form.Control type="tax"
                                                        autoComplete="off"
                                                        placeholder="War. tax"
                                                        name="Warrant tax"

                                                        value={warrant}
                                                        onChange={(e) => setWarrant(e.target.value)}
                                                    />
                                                </Col></Row>
                                        </Form.Group></Col></Row>
                                    <Button target="blank" className="mr-auto mt-5" onClick={((e) => Approve(data))}>Approve</Button>
                                    <Button variant="danger" onClick={((e) => Reject(data))} className="mr-auto ml-2 mt-5">Reject</Button>
                                    <Button variant="warning" onClick={((e) => Remove(data))} className="mr-auto ml-2 mt-5">Remove</Button>
                                </Form>

                            </Card.Body>

                        </Accordion.Collapse>
                    </Accordion>
                </Card> : ""
            )
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
                            <h1 className="titles">Applicants for Revenue Tax Receipt.</h1>
                            {(revenue?.revenueData.length) ? cards != "" ? <Stagger in><div>{cards}</div></Stagger> :
                                <div className="text-center mt-5"><h4 className="heads">No Applicants here.</h4>
                                    <img className="mt-2" src={DataImg} width="300" height="200" /></div> :
                                <div className="text-center mt-5"><h4 className="heads">No Applicants here.</h4>
                                    <img className="mt-2" src={DataImg} width="300" height="200" /></div>}
                        </Col>
                    </Row>
                </Container> : <div>
                        <h3 className="text-center mt-5 mb-5 titles">This Section is accessible only from Desktop resolutions.</h3>
                    </div>;
            }}
        </Medias>
    )
}

export default AdRevenue;
