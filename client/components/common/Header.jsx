import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-green">
        <Link to="/recipes" className="navbar-link nav-text" id="navlink">More recipe</Link>
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
              <a className="navbar-link nav-text" href="./html/recipe.html" id="navlink">Recipe</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle nav-text"
                href="./html/userProfileFav.html"
                id="navlink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                User profile
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item nav-text" href="./html/userProfileFav.html">Profile</a>
                <a className="dropdown-item nav-text" href="./html/userFavRecipe.html">My recipe</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="navbar-link nav-text" href="./html/signin.html" id="navlink">Signout</a>
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
  );
};


export default Header;
