import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import NotLogged from './modules/pages/components/Login/NotLogged';
import Cookies from 'js-cookie';

const AppRoute = (routeProps) => {
    const { component: Component, path, exact, extraPropsHeader, routeProtected } = routeProps;
    let page = (<Route {...{exact, path}} render={props => <Component {...props} extraPropsHeader={(event) => extraPropsHeader(event)} />} />);
    let notLoggedPage = (<Route {...{exact, path}} render={props => <NotLogged {...props} extraPropsHeader={(event) => extraPropsHeader(event)} />} />);
    // Here goes the authentication
    if(routeProtected) {

        /* CON COOKIE */
        if(typeof Cookies.get('session') !== "undefined") {
            const cookieSession = JSON.parse(Cookies.get('session'));
            if(cookieSession.logged) {
                return page;
            } else {
                return notLoggedPage;
            }
        } else {
            return notLoggedPage;
        }

        /* CON REDUX */

        // if(logged) {
        //     return page;
        // } else {
        //     return notLoggedPage;
        // }


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