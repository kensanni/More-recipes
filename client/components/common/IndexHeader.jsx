import React from 'react';
import { Link } from 'react-router-dom';


/**
 * @description render the header for the landing page
 *
 * @returns {JSX} render JSX
 */
const IndexHeader = () => ((
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/recipes" className="navbar-link nav-text">Recipe</Link>
          </li>
          <li className="nav-item">
            <Link to="/signin" className="navbar-link nav-text">Signout</Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn search-btn my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </header>
));

export default IndexHeader;
