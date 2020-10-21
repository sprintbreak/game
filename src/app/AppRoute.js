import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Login from './modules/pages/components/Login/Login';
import NotLogged from './modules/pages/components/Login/NotLogged';
import Cookies from 'js-cookie';

const AppRoute = (routeProps) => {
    const { component: Component, path, exact, extraPropsHeader, logged, routeProtected } = routeProps;
    let page = (<Route {...{exact, path}} render={props => <Component {...props} extraPropsHeader={(event) => extraPropsHeader(event)} />} />);
    let notLoggedPage = (<Route {...{exact, path}} render={props => <NotLogged {...props} extraPropsHeader={(event) => extraPropsHeader(event)} />} />);
    let loginPage = (<Route {...{exact, path}} render={props => <Login {...props} extraPropsHeader={(event) => extraPropsHeader(event)} />} />);
    // Here goes the authentication
    if(routeProtected) {

        /* CON COOKIE */
        // if(typeof Cookies.get('session') !== "undefined") {
        //     const cookieSession = JSON.parse(Cookies.get('session'));
        //     if(cookieSession.logged) {
        //         return page;
        //     } else {
        //         return notLoggedPage;
        //     }
        // } else {
        //     return notLoggedPage;
        // }

        /* CON REDUX */

        if(logged) {
            return page;
        } else {
            return <Redirect to="/login" />;
        }


    } else {
        return page;
    }
}

const mapStateToProps = state => {
    return {
        logged: state.appReducer.logged
    }
}

export default connect(mapStateToProps, null)(AppRoute);