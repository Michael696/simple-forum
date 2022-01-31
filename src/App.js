import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './styles/App.sass';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ForumList from './features/forumList/ForumList';
import Faq from './components/Faq';
import Register from './components/Register';
import SignIn from './components/SignIn';

function App() {
    return (
        <div className="App">
            <Header/>
            <Navigation/>
            <Routes>
                <Route path='/faq' element={<Faq/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/*' element={<ForumList/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
