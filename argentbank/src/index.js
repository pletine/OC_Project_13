import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { storeRedux } from './redux';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';

const handleKeyPress = (event) => {
  switch(event.key) {
    case 'm':
      // Remove Local Storage 
      localStorage.removeItem("user");
      break;
    case 'l':
      // Clear all the local storage
      localStorage.clear();
      break;
    default:
      break;
  }
};
document.addEventListener('keydown', handleKeyPress);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeRedux}>
    <Router>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
    <Footer />
    </Provider>
  </React.StrictMode>
);
