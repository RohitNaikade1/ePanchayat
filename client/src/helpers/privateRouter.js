import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './auth';

const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default PrivateRouter;