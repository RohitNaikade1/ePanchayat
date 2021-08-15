import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Media from 'react-media';
import { payAction } from '../../../Redux/actions/paymentActions';
import DataImg from './applicants.jpg';
import axiosInstance from '../../../helpers/axios';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import {useTable} from "react-table"; 
import axios from 'axios';

const AdRevenueReceipt =()=> {
    const [data,setData]=useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(payAction())
    }, [])

    const payments = useSelector(state => state.payments);
    if(payments){
        setData(payments.paymentRecord);
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
                                <h1 className="titles">Payment Record.</h1>
                                {/* {(payments?.length) ? cards != "" ? <Stagger in><div>{cards}</div></Stagger> :
                                        <div className="text-center mt-5"><h4 className="heads">No Applicants here.</h4>
                                            <img className="mt-2" src={DataImg} width="300" height="200" /></div> :
                                        <div className="text-center mt-5"><h4 className="heads">No Applicants here.</h4>
                                            <img className="mt-2" src={DataImg} width="300" height="200" /></div>} */}
                                {/* {this.state.records.length?<useTable
                                    data={this.state.records}
                                    columns={columns}
                                />:""} */}
                            </Col>
                        </Row>
                    </Container> : <div>
                            <h3 className="text-center mt-5 mb-5 titles">This Section is accessible only from Desktop resolutions.</h3>
                        </div>;
                }}
            </Media>
        )

    }

export default AdRevenueReceipt;
