import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helpers/auth';

const privateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => 
                isAuth() ? isAuth() && isAuth().role === 'admin' || isAuth().role === 'user'
                ?
                <Component {...props} /> :<Redirect to="/"/> : <Redirect to="/login"/>
            }
        />
    )
}

export default privateRouter;
