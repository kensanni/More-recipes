import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description functional component to render the header for unauthenticated user
 *
 * @returns {JSX} return JSX
 */
const GuestHeader = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-green">
      <Link to="/" className="navbar-link nav-text" id="navlink">More-recipe</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="navbar-link nav-text" id="navlink" to="/signup">Signup</Link>
          </li>
          <li className="nav-item">
            <Link className="navbar-link nav-text" id="navlink" to="/signin">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default GuestHeader;
