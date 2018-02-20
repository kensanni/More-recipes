import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { any } from 'prop-types';
import avatar from '../../public/images/avatar.png';

/**
 * @description functional component for rendering signIn form
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const Form = (props) => {
  const { onChange, handleSubmit, value } = props;
  const { username, password, responseMessage } = value;
  return (
    <div className="pt-5 mt-5 text-center">
      <form className="m-x-auto app-login-form card-login">
        <h1 className="signin-text"> More-recipe</h1>
        <section className="">
          <img className="img-fluid rounded-circle img-size" src={avatar} alt="" />
        </section>
        <div className="error-message">
          { responseMessage }
        </div>
        <section className="pb-4 pt-3">
          <input
            name="username"
            className="form-control"
            placeholder="Username"
            onChange={onChange}
            type="name"
            value={username || ''}
          />
        </section>
        <section className="pb-4">
          <input
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={onChange}
            type="password"
            value={password || ''}
          />
        </section>
        <div>
          <button
            onClick={handleSubmit}
            className="btn btn-block btn-orange"
          >
            Sign In
          </button>
        </div>
        <div className="pt-2 pb-4 text-align">
          <a href="Forgotpassword">Forgotten your password?</a>
        </div>
        <div>
          <hr />
        </div>
        <footer>
          <Link to="/signup">Create Account</Link>
        </footer>
      </form>
    </div>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.objectOf(any).isRequired,
};

export default Form;
