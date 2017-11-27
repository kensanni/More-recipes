import React from 'react';

const IndexFooter = () => {
  return (
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
              <a href="">
                <i className="fa fa-google-plus" />
              </a>
            </li>
            <li>
              <a href="https://github.com/kensanni/More-recipes">
                <i className="fa fa-github" />
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-facebook" />
             </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-twitter" />
              </a>
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
  );
};

export default IndexFooter;
