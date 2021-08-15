import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helpers/axios';
import PaymentImg from './payment.jpg';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import { keys } from '../../helpers/credentials';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { getLocalStorage } from '../../helpers/auth';
import '../components.css'
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validText = (val) => /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/i.test(val);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validMobile = (val) => /^\+91[7-9][0-9]{9}$/i.test(val);

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const Payment = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState();
    const [email, setEmail] = useState("");
    const [reason, setReason] = useState("Residence Certificate");
    const [number, setNumber] = useState();

    async function displayRazorpay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }
        const user = getLocalStorage()
        const resdata = {
            number,
            userid: user._id,
            name: user.name,
            email: user.email,
            forReason: reason
        }
        axiosInstance.post('pay/razorpay', resdata)
            .then(res => {
                console.log(res)
                const options = {
                    key: keys.Razorpay,
                    currency: res.data.data.currency,
                    amount: res.data.data.amount.toString(),
                    order_id: res.data.data.id,
                    name: "Pay to Gram Panchayat",
                    description: reason,
                    image: { PaymentImg },
                    handler: function (response) {
                        const data = {
                            userid: user._id,
                            name: user.name,
                            email: user.email,
                            number: number,
                            response: response,
                            forReason: reason
                        }
                        axiosInstance.post('pay/verification', data)
                            .then(res => {
                                console.log(res)
                                store.addNotification({
                                    title: "Payment Received Successfully!",
                                    message: 'check your email for payment receipt',
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
                                store.addNotification({
                                    title: "Payment Failed!",
                                    message: 'Try again with payment details',
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
                        // console.log(response)
                        // alert(response)
                        // alert(response.razorpay_payment_id)
                        // alert(response.razorpay_order_id)
                        // alert(response.razorpay_signature)

                    },
                    prefill: {
                        name: name,
                        email: email,
                        contact: number
                    }
                }
                const paymentObject = new window.Razorpay(options)
                paymentObject.open()
            })
            .catch(error => {
                console.log(error)
                store.addNotification({
                    title: `${error.response.data.error.error}`,
                    message: `${error.response.data.error.sub}`,
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
        // isAuth() ? isAuth() && isAuth().role === 'admin' || isAuth().role === 'user'
        // ?
        <Container fluid className="mb-3">
            <Row className="justify-content-md-center">
                <Col className='col-md-5 mt-3' >
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card className='frm'>
                            <div className="text-center mt-4 mb-2"><h1 className="brand">Payment Gateway.</h1></div>
                            <Card.Img varient="top" className="pic mt-1 col-md-6 col-sm-10 offset-md-3" src={PaymentImg}></Card.Img>
                            <div className="text-center mt-4 mb-4"><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span></div>
                            <Card.Body>
                                <LocalForm onSubmit={displayRazorpay}>
                                   
                                    <div className="form-group">
                                        <Row><Col className="col-md-3 offset-md-1">
                                            <Form.Label>Mobile Number:</Form.Label></Col>
                                            <Col className="col-md-7">
                                                <Control.text
                                                    model=".mobile"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    spellCheck="off"
                                                    placeholder="Enter Mobile Number"
                                                    name="number"
                                                    value={number}
                                                    onChange={(e) => setNumber(e.target.value)}
                                                    validators={{
                                                        required, validMobile
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".mobile"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required ',
                                                        validMobile: 'Enter a valid Mobile number!'
                                                    }}
                                                />
                                            </Col></Row>
                                    </div>
                                    <Row><Col className="col-md-3 offset-md-1"><Form.Label>Receipt Option:</Form.Label></Col>
                                        <Col className="col-md-7">
                                            <select
                                                className="my-1 mr-sm-2 form-control"
                                                value={reason}
                                                defaultValue="Residence Certificate"
                                                onChange={(e) => setReason(e.target.value)}
                                            >
                                                <option value="Residence Certificate">Residence Certificate.</option>
                                                <option value="Revenue tax receipt">Revenue tax receipt.</option>
                                            </select>
                                        </Col></Row>
                                    
                                    <div className="text-center mt-4">
                                        <Button variant="primary" type="submit">Pay Now</Button>
                                    </div>
                                </LocalForm>
                            </Card.Body>
                        </Card></FadeTransform></Col>
            </Row>

        </Container>
        // : <Redirect to="/" /> : <Redirect to="/login" />
    )
}

export default Payment;