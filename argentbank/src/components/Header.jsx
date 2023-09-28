import argentBankLogo from "../assets/images/argentBankLogo.png";

import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux";

export default function Header() {
  const user = useSelector((state) => state.connectedUser[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const disconnect = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {user.connected ? (
          <button onClick={disconnect} className="main-nav-item">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
