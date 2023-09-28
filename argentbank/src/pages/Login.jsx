import "../styles/main_style.scss";

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../_models/fetchData.js";
import { useDispatch } from "react-redux";
import { logIn } from "../redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If the user doesn't exist in the local storage, create a new one
  const nameRef = useRef(null);
  const pwdRef = useRef(null);
  const rememberRef = useRef(null);

  /**
   * Create function to check the login informations
   * @param {*} event
   */
  const login = async (event) => {
    event.preventDefault();

    // Check if the values are not empty
    if (
      nameRef.current.value !== "" &&
      pwdRef.current.value !== "" &&
      rememberRef.current.value !== ""
    ) {
      const values = JSON.stringify({
        email: nameRef.current.value,
        password: pwdRef.current.value,
      });

      // Try to log the user in the application by requesting the API
      let response = await fetchData(
        "http://localhost:3001/api/v1/user/login",
        "POST",
        values
      );

      // If answer is OK
      if (response.status === 200) {
        // Log user in the application
        const userInfo = {
          email: nameRef.current.value,
          token: response.body.token,
        };
        dispatch(logIn(userInfo));

        // Save user informations in local storage
        if (rememberRef.current.checked) {
          localStorage.setItem("user", JSON.stringify(userInfo));
        }

        // Go to the user page
        navigate("/user");
      } else {
        // If answer is KO
        alert("Mauvais identifiants");
      }
    } else {
      // If values are empty
      alert("Veuillez entrer un nom d'utilisateur et un mot de passe");
    }
  };

  // Check if user informations are stored in local storage
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage !== null) {
      // If yes, log user in the application
      const userStorageJsonData = JSON.parse(userStorage);
      dispatch(logIn(userStorageJsonData));
      navigate("/user");
    }
  }, [dispatch, navigate]);

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
            <input type="checkbox" id="remember-me" ref={rememberRef} />
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
