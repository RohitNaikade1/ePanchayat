import React, { Component } from 'react';
import Student from './login/login';
import Admin from './login/register';
import './login/login.css'
import { Container, Row, Col } from 'react-bootstrap';
class Loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }
  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }
  render() {
    return (
      <Container className="d-flex justify-content-center align-items-center flex-column" fluid>
            <Container className="d-flex justify-content-center align-items-center" fluid>
              <Row className="col-md-3 col-sm-3 m-0 mt-3 p-0">
                <Col
                    className={"controller " + (this.state.isLoginOpen
                    ? "selected-controller"
                    : "")}
                    onClick={this
                    .showLoginBox
                    .bind(this)}>
                    <h4>Login</h4>
                </Col>
                <Col
                    className={"controller " + (this.state.isRegisterOpen
                    ? "selected-controller"
                    : "")}
                    onClick={this
                    .showRegisterBox
                    .bind(this)}>
                    <h4>Register</h4>
                </Col></Row>
            </Container>
            <div>
            {this.state.isLoginOpen && <Student/>}
            {this.state.isRegisterOpen && <Admin/>}
           </div>
           </Container>
    );
  }
}

export default Loginpage;
