import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import { Container, Row, Col, Card, Accordion,Media,Button } from 'react-bootstrap';
import { readApplicants } from '../../../Redux/actions/residenceActions';
import { Stagger } from 'react-animation-components';
import * as FcIcons from "react-icons/fc";
import axiosInstance from '../../../helpers/axios';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { jsx, css } from "@emotion/react";
import './pages.css';
import Medias from 'react-media';
import moment from 'moment';
import DataImg from './applicants.jpg'

function AdResidence() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(readApplicants())
    }, [])
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;
    const applicants = useSelector(state => state.residence);
    let cards = "";
    const Approve = (data) => {
        // console.log(data)
        const residenceData = {
            name: data.name,
            UID: Number(data.UID),
            email:data.email,
            age:data.age,
            number:data.number,
            years:data.noOfYears,
            profession:data.profession,
            picture:data.picture
        }
        axiosInstance.post('residence/download', residenceData)
            .then(res => {
                store.addNotification({
                    title: `${res.data.message}`,
                    message: 'Residence certificate generated sucessfully!',
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
            .catch(err=>{
                store.addNotification({
                    title: `No Payment Record found with name ${data.name}!`,
                    message: 'Pay certificate fee first!',
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
    const Reject = (UID,email) => {
        const residenceData = {
            UID: Number(UID),
            email:email
        }
        console.log(residenceData);
        axiosInstance.post('residence/reject', residenceData)
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
    if (applicants?.applicants.length) {
        const activeKey = applicants?.applicants[0]._id;
        // console.log(applicants?.applicants)
        cards = applicants?.applicants.map((data, key) => {
            return (
                <Card key={key} className="col-md-12 col-sm-12 mt-5">
                    <Accordion className="myAccordian" defaultActiveKey={activeKey}>
                        <Accordion.Toggle as={Card.Header} className="back" eventKey={data._id}>
                            <h4>{data.name}</h4>
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
                                            <p><b>Application Date:</b>  {moment(data.createdAt).format('DD/MM/YYYY')}</p>
                                            <Button href={data.weblink} target="blank" className="mr-auto mt-5" onClick={((e) => Approve(data))}>Approve</Button>
                                            <Button variant="danger" onClick={((e) => Reject(data.UID,data.email))} className="mr-auto ml-2 mt-5">Reject</Button>
                                        </Media.Body>
                                    </Media>
                            </Card.Body>

                        </Accordion.Collapse>
                    </Accordion>
                </Card>
            )
        })
    }
    return (
        <Medias query="(min-width:1300px)">
        {matches => {
            return matches ?<Container fluid className="m-0 p-0">
            <Row className="d-flex">
                <Col className="col-md-3">
                    <Sidebar />
                </Col>
                <Col className="col-md-7 mt-5 mb-3 text-center">
                    <h1 className="titles">Applicants for Residence Certificate.</h1>
                    {(applicants?.applicants.length)?<Stagger in><div>{cards}</div></Stagger>:
                                <div className="text-center mt-5"><h4 className="heads">No Applicants here.</h4>
                                <img className="mt-2" src={DataImg} width="300" height="200"/></div>}
                </Col>
            </Row>
        </Container>: <div>
                        <h3 className="text-center mt-5 mb-5 titles">This Section is accessible only from Desktop resolutions.</h3>
                        </div>;
        }}
        </Medias>
            )
}

export default AdResidence;
