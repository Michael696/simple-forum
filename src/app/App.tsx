import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.sass';
import Header from '../components/main/Header/Header';
import Footer from '../components/main/Footer/Footer';
import Navigation from '../components/main/Navigation/Navigation';
import Forums from '../features/forumsList/Forums';
import Threads from '../features/threads/Threads';
import Posts from '../features/post/Posts';
import Faq from '../components/main/Faq/Faq';
import Register from '../features/registerUser/Register';
import Auth from '../features/currentUser/Auth';
import DeAuth from "../features/currentUser/DeAuth";
import {url} from "./urls";
import {useAppDispatch, useAppSelector} from "./hooks";
import {checkAuth, currentUser, isUserAuthenticated} from "../features/currentUser/currentUserSlice";
import NewThreadForm from "../components/forum/NewThreadForm/NewThreadForm";
import CurrentTime from "../components/main/CurrentTime/CurrentTime";
import CurrentUser from "../features/currentUser/CurrentUser";
import OnlineUsers from "../features/onlineUsers/OnlineUsers";

const PrivateRoute = ({children}) => {
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const user = useAppSelector(currentUser);
    const navigate = useNavigate();
    let comp = null;
    if (isAuthenticated) {
        console.log('PrivateRoute auth OK');
        comp = children;
    } else {
        console.log('PrivateRoute auth ERROR:', user);
        setTimeout(() => { // to avoid 'bad setState() call error message'
            navigate(url.SIGN_IN);
        }, 0);
    }
    return comp;
};

function App() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const user = useAppSelector(currentUser);

    useEffect(() => {
        if (location.pathname !== url.SIGN_IN) {
            dispatch(checkAuth());
        }
    }, []);

    return (
        <div className="App">
            <Header/>
            <Navigation/>
            <CurrentTime/>
            <CurrentUser user={user}/>
            <Routes>
                <Route path='/faq' element={<Faq/>}/>
                <Route path={url.REGISTER} element={<Register/>}/>
                <Route path={url.SIGN_IN} element={<Auth/>}/>
                <Route path={url.SIGN_OUT} element={<DeAuth/>}/>
                <Route path={`${url.FORUM}/:forumId`} element={<><Threads/><OnlineUsers/></>}/>
                <Route path={`${url.FORUM}/:forumId${url.THREAD}/:threadId`} element={<><Posts/><OnlineUsers/></>}/>
                <Route path={`${url.FORUM}/:forumId${url.THREAD}/:threadId/:page`}
                       element={<><Posts/><OnlineUsers/></>}/>
                <Route path={`${url.NEW_THREAD}/:forumId`} element={
                    <PrivateRoute>
                        <NewThreadForm/>
                        <OnlineUsers/>
                    </PrivateRoute>
                }/>

                <Route path='/*' element={<><Forums/><OnlineUsers/></>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
