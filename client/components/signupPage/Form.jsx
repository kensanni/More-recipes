import React from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
  const { onChange, onFocus, handleSubmit } = props;
  return (
    <div className="container form-bg">
      <div className="pt-5" style={{ textAlign: 'center' }}>
        <form className="m-x-auto app-login-form card-login">
          <h1 className="signin-text"> More-recipe</h1>
          <section className="signin-text">
            <h3>Create an account</h3>
          </section>
          <div className="error-message">
            { props.value.responseMessage && `*${props.value.responseMessage}*`}
          </div>
          <section className="pb-4 pt-3">
            <input
              name="name"
              className="form-control"
              placeholder="Name"
              onChange={onChange}
              onFocus={onFocus}
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
              onFocus={onFocus}
              value={props.value.username}
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
              onFocus={onFocus}
              value={props.value.email}
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
              onFocus={onFocus}
              value={props.value.password}
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
              onFocus={onFocus}
              value={props.value.confirmPassword}
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
            <button
              onClick={handleSubmit}
              className="btn btn-block btn-orange"
            >
              Create Account
            </button>
          </div>
          <div style={{ textAlign: 'left' }}>
            <a href="f" id="text-dec">Forgotten your password?</a>
          </div>
          <div>
            <hr />
          </div>
          <footer>
            <a href="signin">Sign In</a>
          </footer>
        </form>
      </div>
    </div>
  );
};

// Form.propTypes = {
//   value: PropTypes.
// }

export default Form;
