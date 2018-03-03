import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => ((
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-green">
      <Link
        to="/recipes"
        className="navbar-link nav-text"
        id="navlink"
      >
        More recipe
      </Link>
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
        <form className="form-inline my-2 my-lg-0 ml-auto">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn search-btn my-2 my-sm-0" type="submit">Search</button>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <Link
              to=""
              className="nav-link dropdown-toggle nav-text"
              id="navlink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link
                to="/profile"
                className="dropdown-item nav-text"
              >
                Profile
              </Link>
              <Link
                to="/myRecipe"
                className="dropdown-item nav-text"
              >
                My recipe
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link
              to="/signin"
              className="navbar-link nav-text"
              id="navlink"
            >
              Signout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
));

export default Header;
