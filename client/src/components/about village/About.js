import React, { useState, useEffect } from "react";
import { Container, Col, Row, Carousel, Table } from 'react-bootstrap';
import children from './carousel images/children1.jpg';
import houses from './carousel images/houses1.jpg';
import roads from './carousel images/roads1.jpg';
import women from './carousel images/womens1.jpg';
import dam from './carousel images/dam1.jpg';
import village from './carousel images/village1.jpg';
import river from './carousel images/rivers1.jpg';
import powerhouse from './carousel images/power house1.jpg';
import temple from './carousel images/khandoba.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { committeeFetch } from '../../Redux/actions/committeeActions';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import "./about.css";

const About = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(committeeFetch());
    }, [])
    const Record = useSelector((state) => state.committee);
    // console.log(Record)
    let currentCommittee = "";
    let previousCommittee = "";
    if (Record.current.designation) {
        currentCommittee = Record?.current?.Name.map((name, key) => {
            return (
                <tr id={key}>
                    <td>{key + 1}</td>
                    <td>{name}</td>
                    <td>{Record?.current?.designation[key]}</td>
                    <td>{Record?.current?.contact[key]}</td>
                </tr>
            );
        });
        previousCommittee = Record?.previous?.Name.map((name, key) => {
            return (
                <tr id={key}>
                    <td>{key + 1}</td>
                    <td>{name}</td>
                    <td>{Record?.previous?.workingPeriod[key]}</td>
                    <td>{Record?.previous?.Caste[key]}</td>
                </tr>
            );
        });
    }


    return (
        <>

            <Container fluid className="">
                <Row className="d-flex justify-content-md-center ml-0 mr-0">
                    <Col className="col-md-10 col-xs-6 mt-2">
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Carousel>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block h-50 w-100 image"
                                        src={village}
                                        alt="village"
                                    />
                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">Kadadhe Village.</h3>
                                        <p className="text-white">Kadadhe is a Village in Khed Taluka in Pune District of Maharashtra State, India. It belongs to Desh or Paschim Maharashtra region . It belongs to Pune Division . It is located 56 KM towards North from District head quarters Pune. 15 KM from Khed. 116 KM from State capital Mumbai.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block w-100 image"
                                        src={dam}
                                        alt="dam"
                                    />

                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">ChasKaman Water Reservoir</h3>
                                        <p className="text-white">The Chaskaman Dam is one of the important dams of Maharashtra and is built on the Bhima River at Rajgurunagar in Pune district.The capacity of Chas Kaman Dam to irrigate about 32824 ha of land of the villages nearby in Pune district.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block w-100 image"
                                        src={powerhouse}
                                        alt="powerhouse"
                                    />

                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">Vindhyachal Hydro Power PVT. LTD</h3>
                                        <p className="text-white">Chaskaman Hydro-Power Plant is a 3 MW power station located at Chaskaman Dam on Bhima river near Rajgurunagar in Maharashtra, India.This is the second greenfield Hydel Power Project developed by the Company.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block w-100 image"
                                        src={houses}
                                        alt="houses"
                                    />

                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">Permenant Agriculture Village.</h3>
                                        <p className="text-white">People from this village are mostly rely on farming over the generations.their houses are reflections of their sinple lifestyle.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block w-100 image"
                                        src={temple}
                                        alt="temple"
                                    />

                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">Khandoba temple.</h3>
                                        <p className="text-white">Temple of God Khandoba on north side of village.This is the second Biggest temple in Pune District with development cost of 3 crores.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block w-100 image"
                                        src={river}
                                        alt="river"
                                    />

                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">Bhima River.</h3>
                                        <p className="text-white">This village on Bank of holy river Bhima.This river is backbone of villagers in terms of water,farming.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block w-100 image"
                                        src={children}
                                        alt="children"
                                    />

                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">Primary School.</h3>
                                        <p className="text-white">There is one primary school for children in village which focuses on overall growth of students.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block w-100 image"
                                        src={women}
                                        alt="women"
                                    />

                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">Independent Women.</h3>
                                        <p className="text-white">There are lots of work opportunities for women in our village.women can live independently and fulfil their family needs.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={1000} className="carousel-item">
                                    <img
                                        className="d-block w-100 image"
                                        src={roads}
                                        alt="roads"
                                    />

                                    <Carousel.Caption className="carousel-caption">
                                        <h3 className="text-white">Concrete roads.</h3>
                                        <p className="text-white">Village has network of concrete roads to connect village with main road.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </FadeTransform>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="mt-5">
                <Row className="d-flex justify-content-md-center">
                    <Col className="col-md-6 col-xs-6 mt-2">
                        <h3 className="text-center brand">Last 5 village heads of village:</h3>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Table striped bordered hover className="mt-3">
                                <thead>
                                    <tr>
                                        <th>Sr. No:</th>
                                        <th>Name.</th>
                                        <th>Working Period.</th>
                                        <th>Caste.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {previousCommittee}
                                </tbody>
                            </Table></FadeTransform>
                    </Col>
                    <Col className="col-md-6 col-xs-6 mt-2">
                        <h3 className="text-center brand">Members of current committee:</h3>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Table striped bordered hover className="mt-3">
                                <thead>
                                    <tr>
                                        <th>Sr. No:</th>
                                        <th>Full name:</th>
                                        <th>Designation:</th>
                                        <th>Contact No:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCommittee}
                                </tbody>
                            </Table></FadeTransform>
                    </Col>
                </Row>
            </Container>
        </>
    );
}



export default About;