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

const PrivateRoute = ({children}) => {
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const navigate = useNavigate();
    let component = null;
    useEffect(() => {
        if (isAuthenticated) {
            console.log('PrivateRoute auth OK');
            component = children;
        } else {
            console.log('PrivateRoute auth ERROR');
            navigate(url.SIGN_IN); // TODO avoid 'request failed' message while redirecting from PrivateRoute to Sign-in
        }
    }, [isAuthenticated, children]);
    return component;
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

    // TODO make Posts render correctly if page is not specified (take 1 as default and rewrite url)

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
                <Route path={`${url.FORUM}/:forumId`} element={<Threads/>}/>
                <Route path={`${url.FORUM}/:forumId${url.THREAD}/:threadId`} element={<Posts/>}/>
                <Route path={`${url.FORUM}/:forumId${url.THREAD}/:threadId/:page`} element={<Posts/>}/>
                <Route path={`${url.NEW_THREAD}/:forumId`} element={
                    <PrivateRoute>
                        <NewThreadForm/>
                    </PrivateRoute>
                }/>

                <Route path='/*' element={<Forums/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
