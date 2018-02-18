import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description render the footer for landing page
 *
 * @returns {JSX} return JSX
 */
const IndexFooter = () => ((
  <footer className="container page-footer">
    <div className="row">
      <div className="col-sm-12">
        <div className="divider" />
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6 col-md-4 rfloat">
        <ul className="pt-2">
          <li>
            <Link to="">
              <i className="fa fa-google-plus" />
            </Link>
          </li>
          <li>
            <Link to="https://github.com/kensanni/More-recipes">
              <i className="fa fa-github" />
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="fa fa-facebook" />
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="fa fa-twitter" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-sm-6 col-md-8 left">
        <div className="copyright">
          <small>
            More-Recipes © 2017,
            All Rights Reserved,
            Design &amp; Developed By: Sanni Kehinde
          </small>
        </div>
      </div>
    </div>
  </footer>
));

export default IndexFooter;
