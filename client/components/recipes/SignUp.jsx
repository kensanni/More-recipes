import React, { Component } from 'react';
import { render } from 'react-dom';
import backgroundImage from '../../public/images/blog-img-01.jpg';

/**
 * @class SignUp
 * @description Create user account
 */
class SignUp extends Component {
  /**
   * @description render - renders the class component
   * @return {object} returns an object
   */
  componentWillMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }
  /**
   * @description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      <div className="container">
        <div className="pt-5" style={{ textAlign: 'center' }}>
          <form onSubmit={this.handleSubmit} className="m-x-auto app-login-form card-login">
            <h1 className="signin-text"> More-recipe</h1>
            <section className="signin-text">
              <h3>Create an account</h3>
            </section>
            <section className="pb-4 pt-3">
              <input
                className="form-control"
                placeholder="Username"
                type="text"
                required
              />
            </section>
            <section className="pb-4">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                required
              />
            </section>
            <section className="pb-4">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                required
              />
            </section>
            <section className="pb-4">
              <input
                className="form-control"
                placeholder="Confirm password"
                type="password"
                required
              />
            </section>
            <div>
              <p>
                <small>
                  By clicking &#39;
                    Create Account&#39;,
                    you are agreeing to our
                  <a
                    href="Policy"
                    id="text-dec"
                  > Policy
                  </a>
                  <span>  and  </span>
                  <a href="terms" id="text-dec">
                    Terms &amp; Conditions
                  </a>
                </small>
              </p>
            </div>
            <div>
              <button className="btn btn-block btn-orange">
                <a href="signin.html" className="signin-btn" id="signn-btn">Create Account</a>
              </button>
            </div>
            <div style={{ textAlign: 'left' }}>
              <a href="f" id="text-dec">Forgotten your password?</a>
            </div>
            <div>
              <hr />
            </div>
            <footer>
              <a href="signin.html" id="text-dec">Sign In</a>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
