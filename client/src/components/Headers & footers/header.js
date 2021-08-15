import React, { useEffect } from 'react'
import { Nav, Navbar, NavDropdown, Button, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../components.css';
import { isAuth,signout } from '../../helpers/auth';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


const Header = (props) => {
    const signOut=()=>{
          store.addNotification({
            title: "Signed out Successfully!",
            message: 'You will be redirected on home page!',
            type: "success",
            container: 'top-right',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
              showIcon: true
            }
          })
          signout();
          
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><h3 className="brand">eGramPanchayat</h3></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink exact activeClassName="active_class" className="links" to="/">
                        <div className="ml-3">
                            Home
                        </div>
                    </NavLink>
                    <NavLink exact activeClassName="active_class" className="links" to="/village">
                        <div className="ml-3">
                            About village
                        </div>
                    </NavLink>
                    <NavLink exact activeClassName="active_class" className="links" to="/schemes">
                        <div className="ml-3">
                            Schemes
                        </div>
                    </NavLink>
                    <NavLink exact activeClassName="active_class" className="links" to="/payment">
                        <div className="ml-3">
                            Revenue Payment
                            </div>
                    </NavLink>
                    <NavDropdown className="mt-0" title="Documents" id="collasible-nav-dropdown">
                        <NavDropdown.Item>
                            <NavLink exact to="/residence" className="links text-dark">
                                Residence Certificate
                        </NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <NavLink exact to="/revenue" className="links text-dark">
                                Revenue tax receipt
                        </NavLink>
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavLink exact activeClassName="active_class" className="links" to="/adHome">
                        <div className="ml-3">
                            Admin Center</div>
                    </NavLink>
                    <NavLink exact activeClassName="active_class" className="links" to="/about">
                        <div className="ml-3">
                            About us</div>
                    </NavLink>
                </Nav>
                <Nav className="ml-auto mr-2">
                {isAuth()?<Button variant="outline-primary" onClick={signOut}>
                            <span className="fa fa-sign-in fa-lg mr-2"></span>
                            Logout
                    </Button>:<Button variant="outline-primary">
                        <NavLink exact className="active_class login_btn" to="/login">
                            <span className="fa fa-sign-in fa-lg mr-2"></span>
                            Login
                        </NavLink>
                    </Button>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}
export default connect(mapStateToProps)(Header);