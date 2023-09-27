import '../styles/main_style.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../_models/fetchData.js';

export default function Login() {
  const navigate = useNavigate();

  const login = () => {
    let checkLogin = fetchData('http://localhost:3000/api/v1/user/login', {
      email: 'test',
      password: 'test',
    });
    console.log(checkLogin);
    if (checkLogin) {
      alert('Login OK');
      navigate('/user/test');
    } else {
      alert('Login Not OK');
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button" onClick={login}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
