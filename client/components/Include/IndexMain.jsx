import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description functional component to render the body of landing page
 *
 * @returns {JSX} return JSX
 */
const IndexMain = () => ((
  <div className="container">
    <main className="row">
      <div className="col-sm-12 col-md-12 headline text-center">
        <h1 className="heading">
          Share your amazing recipe with the world
        </h1>
        <h6 className="brief">
          More-recipe is built to allow users,
          share their amazing recipe
          and learn new recipes from different part of the world.
        </h6>
        <div className="quick-access">
          <Link to="/signup">
            <button className="btn btn-create">
              Create an account
            </button>
          </Link>
          <p className="text-inline">
            Already on More-recipes?
            <Link to="/signin">  Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  </div>
));

export default IndexMain;
