import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { any } from 'prop-types';

/**
 * @description functional component for rendering signUp form
 *
 * @param {p} props
 *
 * @returns {JSX} return JSX
 */
const Form = (props) => {
  const {
    onChange, handleSubmit, value
  } = props;
  const {
    name, username, email, password, confirmPassword, responseMessage
  } = value;
  return (
    <div className="container">
      <div className="pt-5 text-center">
        <form className="m-x-auto app-login-form card-login">
          <h1 className="signin-text"> More-recipe</h1>
          <section className="signin-text">
            <h3>Create an account</h3>
          </section>
          <div className="error-message">
            { responseMessage }
          </div>
          <section className="pb-4 pt-3">
            <input
              name="name"
              className="form-control"
              placeholder="Name"
              onChange={onChange}
              value={name || ''}
              type="text"
              required
            />
          </section>
          <section className="pb-4">
            <input
              name="username"
              className="form-control"
              placeholder="Username"
              onChange={onChange}
              value={username || ''}
              type="text"
              required
            />
          </section>
          <section className="pb-4">
            <input
              name="email"
              className="form-control"
              placeholder="Email"
              type="email"
              onChange={onChange}
              value={email || ''}
              required
            />
          </section>
          <section className="pb-4">
            <input
              name="password"
              className="form-control"
              placeholder="Password"
              type="password"
              onChange={onChange}
              value={password || ''}
              required
            />
          </section>
          <section className="pb-4">
            <input
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              type="password"
              onChange={onChange}
              value={confirmPassword || ''}
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
                <a href="terms">
                  Terms &amp; Conditions
                </a>
              </small>
            </p>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="btn btn-block btn-orange"
            >
              Create Account
            </button>
          </div>
          <div className="text-left">
            <a href="f" id="text-dec">Forgotten your password?</a>
          </div>
          <div>
            <hr />
          </div>
          <footer>
            <Link to="/signin">Sign In</Link>
          </footer>
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.objectOf(any).isRequired,
};

export default Form;
