import React, { useState } from "react";
import loginImg from "./login.svg";
import './login.css';
import { Link } from 'react-router-dom'
import axiosInstance from '../../helpers/axios';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Col, Card, Container, Button, Form } from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import { authenticate, isAuth } from '../../helpers/auth';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import history from '../../helpers/history';
import { GoogleLogin } from 'react-google-login';
import { keys } from '../../helpers/credentials';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In'
  });
  const { email, password1, textChange } = formData;

  const sendGoogleToken = tokenId => {
    axiosInstance
      .post('user/googleLogin', {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
        store.addNotification({
          title: "You are logged in successfully!",
          message: 'Now you have privileges to explore!',
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
      .catch(error => {
        // console.log('GOOGLE SIGNIN ERROR', error.response);
        store.addNotification({
          title: "You are not a registered user!",
          message: 'Please register yourself with our system!',
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
      });
  };

  const sendFacebookToken = (userID, accessToken) => {
    axiosInstance
      .post("user/facebookLogin", {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
        store.addNotification({
          title: "You are logged in successfully!",
          message: 'Now you have privileges to explore!',
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
      .catch(error => {
        store.addNotification({
          title: "You are not a registered user!",
          message: 'Please register yourself with our system!',
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
      });
  };

  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/adHome')
        : history.push('/');
    });
  };

  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (values) => {
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axiosInstance.post("user/login", {
        email, password: password1
      })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Submitted'
            });
            console.log(isAuth())
            isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/');
            store.addNotification({
              title: `${res.data.user.name},welcome back!`,
              message: 'Now you have privileges to explore!',
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
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          // console.log(err);
          store.addNotification({
            title: `${err.response.data.errors}`,
            message: 'Register yourself!',
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
        });
    }
  }
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col className='col-md-5 mt-3' >
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card className="frm">
              <div className="text-center mt-4 mb-4"><h1 className="">Login</h1></div>
              <Card.Img varient="top" className="mt-1 col-md-10 col-sm-10 offset-md-1" src={loginImg}></Card.Img>
              <div className="text-center mt-4 mb-4"><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span></div>
              <Card.Body>
                <LocalForm onSubmit={(values) => handleSubmit(values)}>
                  <div className="form-group">
                    <Row><Col className="col-md-4 offset-md-1">
                      <Form.Label>Email Id:</Form.Label></Col>
                      <Col className="col-md-6">
                        <Control.text
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="off"
                          model=".email"
                          id="email"
                          className="form-control"
                          placeholder="Enter Your Email Id"
                          value={email}
                          onChange={handleChange('email')}
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
                      <Row><Col className="col-md-4 offset-md-1"><Form.Label>Password:</Form.Label></Col>
                        <Col className="col-md-6">
                          <Control.text
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="off"
                            model=".password"
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter Your Password"
                            value={password1}
                            onChange={handleChange('password1')}
                            validators={{
                              required, minLength: minLength(8)
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".password"
                            show="touched"
                            messages={{
                              required: 'Required ',
                              minLength: 'Password should be greater than 8 characters!'
                            }}
                          />
                          <Link to="/forgotPassword">
                            <p className="float-right text-dark font-italic mt-2">Forgot Password?</p>
                          </Link>
                        </Col></Row>

                    </div></Col></Row>

                  <div className="text-center mt-2">
                    <Button variant="primary" type="submit">Login</Button>
                  </div>
                </LocalForm>
                <div className="text-center mt-3"><i>Or signup with</i></div>
                <div className="text-center mt-3">
                  <FacebookLogin
                    appId={`${keys.FacebookID}`}
                    autoLoad={false}
                    callback={responseFacebook}
                    render={renderProps => (
                      <Button variant="danger"
                        onClick={renderProps.onClick}
                        className="mr-5"
                        type="submit"><span className="fa fa-facebook fa-lg mr-2"></span>
                  Facebook
                      </Button>
                    )}
                  />
                  <GoogleLogin
                    clientId={`${keys.GoogleID}`}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                      <Button variant="danger" onClick={renderProps.onClick}
                        disabled={renderProps.disabled} className="ml-5" type="submit">
                        <span className="fa fa-google-plus fa-lg mr-2"></span>
                        Google+
                      </Button>
                    )}
                  ></GoogleLogin>
                </div>
              </Card.Body>
            </Card></FadeTransform>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

