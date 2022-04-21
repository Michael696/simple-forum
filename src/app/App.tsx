import React from 'react';
import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.sass';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import Forums from '../features/forumsList/Forums';
import Threads from '../features/threads/Threads';
import Posts from '../features/post/Posts';
import Faq from '../components/Faq';
import Register from '../features/registerUser/Register';
import Auth from '../features/currentUser/Auth';

function App() {
    return (
        <div className="App">
            <Header/>
            <Navigation/>
            <Routes>
                <Route path='/faq' element={<Faq/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/signin' element={<Auth/>}/>
                <Route path='/forum/:id' element={<Threads/>}/>
                <Route path='/thread/:id' element={<Posts/>}/>
                <Route path='/*' element={<Forums/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
