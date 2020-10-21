import Home from './modules/pages/components/Home/Home';
import Login from './modules/pages/components/Login/Login';
import Room from './modules/pages/components/Room/Room';
import NotFound from './modules/pages/components/Login/NotFound';
import Cookies from 'js-cookie';

// const getComponentHome = () => {
//     if(typeof Cookies.get('session') !== "undefined") {
//         const cookieSession = JSON.parse(Cookies.get('session'));
//         if(cookieSession.logged) {
//             return Home;
//         } else {
//             return Login;
//         }
//     } else {
//         return Login;
//     }
// }

// const ComponentHome = getComponentHome();

const ApplicationRoutes = {
    Routes: [
        // { path: '/', exact: true, component: ComponentHome, routeProtected: false, key: 'login' },
        { path: '/', exact: true, component: Login, routeProtected: false, key: 'login' },
        { path: '/login', exact: true, component: Login, routeProtected: false, key: 'login' },
        { path: '/home', exact: true, component: Home, routeProtected: true, key: 'home' },
        { path: '/room', exact: true, component: Room, routeProtected: true, key: 'room' },
        { path: '*', exact: false, component: NotFound, routeProtected: false, key: 'notFound' },
    ]
}

export default ApplicationRoutes;
