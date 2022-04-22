import React from 'react';
import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.sass';
import Header from '../components/main/Header';
import Footer from '../components/main/Footer';
import Navigation from '../components/main/Navigation';
import Forums from '../features/forumsList/Forums';
import Threads from '../features/threads/Threads';
import Posts from '../features/post/Posts';
import Faq from '../components/main/Faq';
import Register from '../features/registerUser/Register';
import Auth from '../features/currentUser/Auth';
import DeAuth from "../features/currentUser/DeAuth";
import {url} from "./urls";

function App() {
    return (
        <div className="App">
            <Header/>
            <Navigation/>
            <Routes>
                <Route path='/faq' element={<Faq/>}/>
                <Route path={url.REGISTER} element={<Register/>}/>
                <Route path={url.SIGN_IN} element={<Auth/>}/>
                <Route path={url.SIGN_OUT} element={<DeAuth/>}/>
                <Route path={`${url.FORUM}/:id`} element={<Threads/>}/>
                <Route path='/thread/:id' element={<Posts/>}/>
                <Route path='/*' element={<Forums/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
