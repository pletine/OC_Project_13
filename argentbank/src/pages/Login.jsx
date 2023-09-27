import "../styles/main_style.scss";

import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../_models/fetchData.js";

export default function Login() {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const pwdRef = useRef(null);

  const login = async (event) => {
    event.preventDefault();

    if (nameRef.current.value !== "" && pwdRef.current.value !== "") {
      const values = {
        email: nameRef.current.value,
        password: pwdRef.current.value,
      };

      let response = await fetchData(
        "http://localhost:3001/api/v1/user/login",
        values
      );

      if (response.status === 200) {
        navigate("/user/test");
      } else {
        alert("Mauvais identifiants");
      }
    } else {
      alert("Veuillez entrer un nom d'utilisateur et un mot de passe");
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
            <input type="text" id="username" ref={nameRef} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={pwdRef} />
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
