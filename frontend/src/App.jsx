import React, { useContext, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import ScrollToTop from './lib/ScrollToTop'
import Loader from './components/Loader';

import Navbar from './components/Navbar';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home';
import AddNewQues from './pages/AddNewQues'
import EditQues from './pages/EditQues';

import { AppContext } from './context/AppContext';

export default function App() {

    const { user, checkingAuth } = useContext(AppContext);
    const { checkAuth } = useContext(AppContext);

    useEffect(() => {
        checkAuth();
    }, [])

    if(checkingAuth && !user)
        return (
        <div className="flex items-center justify-center h-screen">
            <Loader />
        </div>
    );

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={user ? <Home/> : <Login />} />
                    <Route path="/signup" element={user ? <Home/> : <Signup />} />
                    <Route path="/login" element={user ? <Home/> : <Login />} />
                    <Route path='/addQues' element={!user ? <Login/> : <AddNewQues />} />
                    <Route path='/editQues' element={!user ? <Login/> : <EditQues />} />
                    <Route path='*' element={user ? <Home/> : <Login />} />
                </Routes>
            </div>
        </>
    )
}
