import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

const onlyAdmin = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => 
                isAuth() ? isAuth().role === 'admin' ? 
                <Component {...props} /> : 
                <Redirect to="/" />:
                <Redirect to="/login" />
            }
        />
    )
}

export default onlyAdmin;
