import "./user.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux";
import fetchData from "../_models/fetchData.js";

export default function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.connectedUser[0]);

  const [content, setContent] = React.useState("");
  const [changeState, setChangeState] = React.useState(false);

  const ChangeFirstName = React.useRef();
  const ChangLastName = React.useRef();

  useEffect(() => {
    let userInfo = {
      id: user.id,
      token: user.token,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
    };

    function editName(event) {
      event.preventDefault();
      setChangeState(true);
    }

    async function saveChange(event) {
      event.preventDefault();
      if (
        ChangeFirstName.current.value !== "" &&
        ChangLastName.current.value !== ""
      ) {
        const values = JSON.stringify({
          firstName: ChangeFirstName.current.value,
          lastName: ChangLastName.current.value,
        });
        let updateResponse = await fetchData(
          "http://localhost:3001/api/v1/user/profile",
          "PUT",
          values,
          user.token
        );
        if (updateResponse.status === 200) {
          alert("Update success");
          userInfo.firstname = ChangeFirstName.current.value;
          userInfo.lastname = ChangLastName.current.value;
          dispatch(logIn(userInfo));
        } else {
          alert("Update failed\nEssayer à nouveau");
        }
        setChangeState(false);
      } else {
        alert("Veuillez entrer un prénom et un nom");
      }
    }

    function cancelChange(event) {
      event.preventDefault();
      setChangeState(false);
    }

    if (changeState === true) {
      setContent(
        <form>
          <section className="change-user-info inputs">
            <input
              type="text"
              id="firstName"
              placeholder={user.firstname}
              ref={ChangeFirstName}
            />
            <input
              type="text"
              id="lastName"
              placeholder={user.lastname}
              ref={ChangLastName}
            />
          </section>
          <section className="change-user-info buttons">
            <button className="change-user-info save-info" onClick={saveChange}>
              Save
            </button>
            <button
              className="change-user-info cancel-change"
              onClick={cancelChange}
            >
              Cancel
            </button>
          </section>
        </form>
      );
    } else {
      setContent(
        <button className="edit-button" onClick={editName}>
          Edit Name
        </button>
      );
    }
  }, [changeState, dispatch, user]);

  if (user.connected) {
    return (
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user.firstname} {user.lastname}
          </h1>
          {content}
        </div>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    );
  } else {
    return (
      <main className="main bg-dark">
        <div className="header">
          Vous n'êtes pas connecté, merci de revenir à la page de connexion
        </div>
      </main>
    );
  }
}
