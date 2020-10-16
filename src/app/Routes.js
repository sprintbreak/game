import Home from './modules/pages/components/Home/Home';
import Login from './modules/pages/components/Login/Login';
import Room from './modules/pages/components/Room/Room';
import NotFound from './modules/pages/components/Login/NotFound';

// const loginData = localStorage.getItem('loginData');

// const getComponentHome = () => {
//     if(loginData) {
//         return Home;
//     } else {
//         return Login;
//     }
// }

// const ComponentHome = getComponentHome();

const ApplicationRoutes = {
    Routes: [
        { path: '/', exact: true, component: Login, routeProtected: false, key: 'login' },
        { path: '/home', exact: true, component: Home, routeProtected: true, key: 'home' },
        { path: '/room', exact: true, component: Room, routeProtected: true, key: 'room' },
        { path: '*', exact: false, component: NotFound, routeProtected: false, key: 'notFound' },
    ]
}

export default ApplicationRoutes;
