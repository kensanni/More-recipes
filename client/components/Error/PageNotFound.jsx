import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description functional component to render 404 pages
 *
 * @returns {JSX} return JSX
 */
const PageNotFound = () => ((
  <div className="bg-color">
    <div className="container bg-color">
      <div className="section-margin">
        <img className="image-fluid image-position" src="https://www.fg-a.com/faces/not-so-smiley-face.png" alt="" />
      </div>
      <div className="row">
        <div className="col-md-12 text-center pb-2">
          <h1 className="text-font pb-3 pt-3">OOPS!</h1>
          <p className="text-desc pb-5">Page Not Found. That Page Does not Exist!</p>
          <button className="btn btn-lg button-lg">
            <Link to="/recipes"> <span className="btn-white">Go Home</span> </Link>
          </button>
        </div>
      </div>
    </div>
  </div>
));

export default PageNotFound;
