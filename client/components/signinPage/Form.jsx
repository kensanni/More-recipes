import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../public/images/avatar.png';

const Form = (props) => {
  const { onChange, handleSubmit } = props;
  return (
    <div className="pt-5 mt-5" style={{ textAlign: 'center' }}>
      <form className="m-x-auto app-login-form card-login">
        <h1 className="signin-text"> More-recipe</h1>
        <section className="">
          <img className="img-fluid rounded-circle img-size" src={avatar} alt="" />
        </section>
        <div className="error-message">
          { props.value.responseMessage && `*${props.value.responseMessage}*`}
        </div>
        <section className="pb-4 pt-3">
          <input
            name="username"
            className="form-control"
            placeholder="Username"
            onChange={onChange}
            type="name"
            value={props.value.username}
          />
        </section>
        <section className="pb-4">
          <input
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={onChange}
            type="password"
            value={props.value.password}
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
          <a href="Forgotpassword" id="text-dec">Forgotten your password?</a>
        </div>
        <div>
          <hr />
        </div>
        <footer>
          <a href="signup" id="text-dec">Create Account</a>
        </footer>
      </form>
    </div>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // value: PropTypes.objectOf.isRequired,
};

export default Form;
