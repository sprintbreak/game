import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App'
import { persistor, store } from 'app/Store'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter, HashRouter, withRouter } from 'react-router-dom'
import ApplicationRoutes from 'app/Routes'
import AppRoute from 'app/AppRoute'
import { PersistGate } from 'redux-persist/lib/integration/react'

import { ThemeProvider, createGlobalStyle } from 'styled-components'

import Loader from 'app/modules/components/Loader/LoaderContainer';
import LoaderRoom from 'app/modules/components/Loader/LoaderRoomContainer';

import 'assets/stylesheets/main.scss'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Own toast
// import { ToastContainer} from 'react-toastify';

import 'app/config/AxiosConfig'

const { Routes } = ApplicationRoutes;

const BodyComponent = ({ location: { pathname } }) => {
    const [extraPropsHeader, setExtraPropsHeader] = useState({ counter: null });

    return (
        <Switch>
            {Routes.map((route, key) =>
                <AppRoute {...route} extraPropsHeader={setExtraPropsHeader} key={key} routes={Routes}
                />
            )}
        </Switch>
    )
}

const Body = withRouter(BodyComponent)

const GlobalStyle = createGlobalStyle`
    *, html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 16px;
    }

    body {
        height: 100vh;
    }

    #root {
        min-height: 100%;
        box-sizing: border-box;
    }

    body {
        background-image: radial-gradient(circle at top, #DEDEDE 20%, #FFFFFF 100%);
        color: white;
        margin: 0;
        padding: 0;
        transition: all 0.3s ease;
        font-family: 'Barlow Semi Condensed', sans-serif;
    }

    textarea:focus, button:focus, input:focus, img:focus {
        outline: none;
    }
`;

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <HashRouter basename="/">
                <GlobalStyle />
                <Loader size={50} />
                <LoaderRoom size={50} />
                <App>
                    <Body key='body' />
                </App>
            </HashRouter>
        </PersistGate>
    </Provider>, document.getElementById('root'));
