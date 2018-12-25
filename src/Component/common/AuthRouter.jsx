import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

const setTitle = (title) => document.title = title;

class AuthRouter extends Component {
    render() {
        const { component: Component, skipAuth, title, ...rest } = this.props;
        setTitle(title);
        let isLogged = sessionStorage.getItem("isLogin") === "1";
        isLogged = skipAuth ? !0 : isLogged;

        return (
            <Route { ...rest } render={ props => {
                return isLogged
                    ? <Component { ...props } />
                    : <Redirect to="/login"/>
            } }/>
        )
    }
}

export default withRouter(AuthRouter);
