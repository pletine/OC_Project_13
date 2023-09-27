import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/user/:idUser" element={<User />} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);
