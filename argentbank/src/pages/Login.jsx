import "../styles/main_style.scss";
import "./login.scss";

import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../_models/fetchData.js";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux";

export default function Login() {
  const user = useSelector((state) => state.connectedUser[0]);

  const userStorage = localStorage.getItem("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (user.connected) {
    navigate("/user");
  }

  // If the user doesn't exist in the local storage, create a new one
  const nameRef = useRef(null);
  const pwdRef = useRef(null);
  const rememberRef = useRef(null);

  /**
   * Create function to check the login informations
   * @param {*} event
   */

  // Content of the page
  const [content, setContent] = React.useState("");
  const [userChoice, setUserChoice] = React.useState(false);

  /**
   * Update content with the local storage informations
   */
  useEffect(() => {
    const login = async (event) => {
      event.preventDefault();

      // Check if the values are not empty
      if (
        nameRef.current.value === "" ||
        pwdRef.current.value === "" ||
        rememberRef.current.value === ""
      ) {
        alert("Veuillez entrer un nom d'utilisateur et un mot de passe");
        return;
      }

      // Values not empty
      const values = JSON.stringify({
        email: nameRef.current.value,
        password: pwdRef.current.value,
      });

      // Try user connection values given in form
      let responseLogin = await fetchData(
        "http://localhost:3001/api/v1/user/login",
        "POST",
        values
      );

      // If error during connection
      if (responseLogin.status !== 200) {
        alert("Mauvais identifiants");
        return;
      }

      // Get other informations about the user
      let responseInfo = await fetchData(
        "http://localhost:3001/api/v1/user/profile",
        "POST",
        "",
        responseLogin.body.token
      );

      // If error during fetch of information
      if (responseInfo.status !== 200) {
        alert(
          "Erreur lors de la récupération des informations de l'utilisateur, veuillez réessayer"
        );
        return;
      }

      // Connect the user in the application with Redux
      const userInfo = {
        id: responseInfo.body.id,
        email: responseInfo.body.email,
        firstname: responseInfo.body.firstName,
        lastname: responseInfo.body.lastName,
      };
      dispatch(logIn(userInfo));

      // Save user informations in local storage
      if (rememberRef.current.checked) {
        localStorage.setItem("user", JSON.stringify(userInfo));
      }

      // Go to the user page
      navigate("/user");
    };

    const defaultContent = (
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
    );

    function connectStorage() {
      const storeUserData = JSON.parse(userStorage);
      console.log(storeUserData);
      dispatch(logIn(storeUserData));
      navigate("/user");
    }

    function newUser() {
      setContent(defaultContent);
      setUserChoice(false);
    }

    function deleteStorageUser(event) {
      event.stopPropagation();
      localStorage.removeItem("user");
      setContent(defaultContent);
    }

    if (userStorage !== null && userChoice === false) {
      let storeUserData = JSON.parse(userStorage);
      setContent(
        <section className="sign-in-content">
          <div className="choose user" onClick={connectStorage}>
            <i className="fa fa-user-circle sign-in-icon"></i>
            <p>
              {storeUserData.firstname} {storeUserData.lastname}
            </p>
            <i className="fa fa-solid fa-trash" onClick={deleteStorageUser}></i>
          </div>
          <div className="choose form" onClick={newUser}>
            <i className="fa fa-user-circle sign-in-icon"></i>
            <p>New user</p>
          </div>
        </section>
      );
    } else {
      setContent(defaultContent);
    }
  }, [dispatch, navigate, userStorage, userChoice]);

  /**
   * Render the login page
   */
  return <main className="main bg-dark">{content}</main>;
}
