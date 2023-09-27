import argentBankLogo from '../assets/images/argentBankLogo.png';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ signOut = false }) {
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
        <Link className="main-nav-item" to="/sign-in">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
        {signOut ? (
          <Link className="main-nav-item" to="/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
}
