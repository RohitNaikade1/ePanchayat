import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import { Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Container, Row, Col, Card, Accordion, Button, Form, Media, ResponsiveEmbed } from 'react-bootstrap';
import axiosInstance from '../../../helpers/axios';
import { fetchSchemes } from '../../../Redux/actions/schemesAction';
import { BsPlusCircle, BsPencilSquare } from "react-icons/bs";
import Medias from 'react-media';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import './pages.css';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import DataImg from './data.jpg'

const required = (val) => val && val.length;
const validURL = (val) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(val);
const validSentence = (val) => /\b((?!=|\,|\.).)+(.)\b/i.test(val);

function AdSchemes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState();
    const [department, setDepartment] = useState();
    const [description, setDescription] = useState();
    const [weblink, setWeblink] = useState();
    const [picture, setPicture] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSchemes())
    }, [])
    const schemes = useSelector(state => state.schemes.data);
    console.log(schemes)
    let cards = "";
    const deleteScheme = (id) => {
        console.log(id)
        const record = {
            id
        }
        axiosInstance.post('schemes/delete', record)
            .then(res => {
                setTimeout(
                    store.addNotification({
                        title: `${res.data.message}`,
                        message: 'you can upload new scheme data!',
                        type: "success",
                        container: 'top-right',
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 3000,
                            showIcon: true
                        }
                    }), 3000);
                window.location.reload(false);
            })

    }
    console.log(schemes.length)
    if (schemes[0]?._id) {
        const activeKey = schemes[0]._id;
        cards = schemes.map((scheme, key) => {
            return (
                <Row key={scheme._id} className="">
                    <Card className="col-md-12 col-sm-12 mt-5">
                        <Accordion className="myAccordian" defaultActiveKey={activeKey}>
                            <Accordion.Toggle as={Card.Header} className="back" eventKey={scheme._id}>
                                <h4 className="heads">{scheme.title}</h4>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={scheme._id}>
                                <Card.Body>
                                    <Media tag="li">
                                        <img
                                            width={200}
                                            height={200}
                                            className="mr-3"
                                            src={scheme.picture}
                                            alt={scheme.title}
                                        />
                                        <Media.Body className="float-left">
                                            <p><b>Description:</b><br />{scheme.description}</p>
                                            <p><b>Department:</b><br />{scheme.department}</p>
                                            <Button href={scheme.weblink} target="blank" className="mr-auto">Apply Now</Button>
                                            <Button variant="danger" onClick={((e) => deleteScheme(scheme._id))} className="mr-auto ml-2">Delete</Button>
                                        </Media.Body>
                                    </Media>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                    </Card></Row>
            )
        })
    }
    const AddScheme = (values) => {
        const schemeData = {
            title,
            department,
            description,
            weblink,
            picture
        }
        console.log(schemeData);
        axiosInstance.post('schemes/add', schemeData)
            .then(res => {
                console.log(res)
                setTimeout(store.addNotification({
                    title: `${res.data.message}`,
                    message: 'scheme will be rendered on schemes page!',
                    type: "success",
                    container: 'top-right',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        showIcon: true
                    }
                }), 3000);
                window.location.reload(false);
            })
    }
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    return (
        <Medias query="(min-width:1300px)">
            {matches => {
                return matches ? <Container fluid className="m-0 p-0">
                    <Modal isOpen={isModalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}><BsPencilSquare className="mr-2" />Add Scheme.</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => AddScheme(values)}>
                                <div className="form-group">
                                    <Row><Col className="col-md-3 offset-md-1">
                                        <Form.Label>Title:</Form.Label></Col>
                                        <Col className="col-md-7">
                                            <Control.text
                                                model=".title"
                                                className="form-control"
                                                autocomplete="off"
                                                placeholder="Enter Title"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                validators={{
                                                    required, validSentence
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".title"
                                                show="touched"
                                                messages={{
                                                    required: 'Required ',
                                                    validSentence: 'Enter a valid Title!'
                                                }}
                                            />
                                        </Col></Row>
                                </div>
                                <div className="form-group">
                                    <Row><Col className="col-md-3 offset-md-1">
                                        <Form.Label>Department:</Form.Label></Col>
                                        <Col className="col-md-7">
                                            <Control.text
                                                model=".department"
                                                className="form-control"
                                                autocomplete="off"
                                                placeholder="Enter Department"
                                                name="department"
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                validators={{
                                                    required, validSentence
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".department"
                                                show="touched"
                                                messages={{
                                                    required: 'Required ',
                                                    validSentence: 'Enter a valid Title!'
                                                }}
                                            />
                                        </Col></Row>
                                </div>
                                <div className="form-group">
                                    <Row><Col className="col-md-3 offset-md-1">
                                        <Form.Label>Description:</Form.Label></Col>
                                        <Col className="col-md-7">
                                            <Control.textarea
                                                model=".description"
                                                className="form-control"
                                                autocomplete="off"
                                                placeholder="Enter description"
                                                name="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                validators={{
                                                    required, validSentence
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".description"
                                                show="touched"
                                                messages={{
                                                    required: 'Required ',
                                                    validSentence: 'Enter a valid Text!'
                                                }}
                                            />
                                        </Col></Row>
                                </div>
                                <Row><Col>
                                    <div className="form-group">
                                        <Row><Col className="col-md-3 offset-md-1"><Form.Label>scheme related web link:</Form.Label></Col>
                                            <Col className="col-md-7">
                                                <Control.text
                                                    model=".weblink"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    placeholder="Enter web link"
                                                    name="weblink"
                                                    value={weblink}
                                                    onChange={(e) => setWeblink(e.target.value)}
                                                    validators={{
                                                        required, validURL
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".weblink"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validURL: 'Enter a valid URL!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div></Col></Row>
                                <div className="form-group">
                                    <Row><Col className="col-md-3 offset-md-1"><Form.Label>Picture:</Form.Label></Col>
                                        <Col className="col-md-7">
                                            <Control.text
                                                model=".picture"
                                                className="form-control"
                                                autoComplete="off"
                                                placeholder="Enter picture URL:"
                                                name="picture"
                                                value={picture}
                                                onChange={(e) => setPicture(e.target.value)}
                                                validators={{
                                                    required, validURL
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".picture"
                                                show="touched"
                                                messages={{
                                                    required: 'Required ',
                                                    validURL: 'Enter a valid URL!'
                                                }}
                                            />
                                        </Col></Row>
                                </div>
                                <Row className="text-center float-right mt-4">
                                    <Col><Button variant="primary" className="mr-3" type="submit">Create</Button>
                                        <Button variant="danger" onClick={toggleModal}>Cancel</Button></Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    <Row className="d-flex">
                        <Col className="col-md-3">
                            <Sidebar />
                        </Col>
                        <Col className="col-md-7 mt-5 mb-3">
                            <h1 className="d-flex justify-content-center titles">Post Section.</h1>
                            <center><Button className="mt-4 col-md-5 " onClick={toggleModal}>
                                <BsPlusCircle size={25} className="mr-3" />Add New Scheme</Button></center>
                            <Stagger in>
                                {schemes.length ? <Stagger in>{cards}</Stagger> :
                                    <div className="text-center mt-3"><h4>No schemes Available</h4>
                                        <img className="mt-2" src={DataImg} width="300" height="200" /></div>}
                                {/* <div>{cards}</div> */}
                            </Stagger>
                        </Col>
                    </Row>
                </Container> : <div>
                        <h3 className="text-center mt-5 mb-5 titles">This Section is accessible only from Desktop resolutions.</h3>
                    </div>;
            }}
        </Medias>
    )
}

export default AdSchemes
