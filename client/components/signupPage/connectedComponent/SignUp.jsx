import React, { Component } from 'react';
import lodash from 'lodash';
import toastr from 'toastr';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import signUpAction from '../../../actionController/signup';
import Form from '../../signupPage/Form';
import backgroundImage from '../../../public/images/recipe-img-bg.jpeg';

/* eslint-disable react/no-unused-state */

/**
 * @class SignUp
 * @description Create user account
 */
class SignUp extends Component {
  /**
   * @description create an instance of Signup
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameError: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      error: '',
      responseMessage: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  /**
   * @description render - renders the class component
   * @return {object} returns an object
   */
  componentWillMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.signupResponse.authenticated) {
      this.props.history.push('/signin');
    }
    if (!lodash.isEmpty(nextProps.signupResponse.errorMessage)) {
      this.setState({
        responseMessage: nextProps.signupResponse.errorMessage
      });
    }
  }

  /**
   * @description clear error messages
   * @param {*} event
   * @return {*} null
   */
  onFocus(event) {
    const { name } = event.target;
    switch (name) {
      case 'name':
        this.setState({ responseMessage: '' });
        break;
      case 'username':
        this.setState({ usernameError: '' });
        break;
      case 'email':
        this.setState({ emailError: '' });
        break;
      case 'password':
        this.setState({ passwordError: '' });
        break;
      case 'confirmPassword':
        this.setState({ confirmPasswordError: '' });
        break;
      default:
        return this.state;
    }
  }

  /**
   * @description Handles the input value changes
   * @param {*} event
   * @return {*} null
   * @memberof SignUp
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


  /**
   *@description Sign up a user when form is submiied
   * @param {*} event
   * @returns {*} v
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.state.responseMessage = '';
    if (this.state.password === this.state.confirmPassword) {
      this.props.signUpAction(this.state);
    } else {
      toastr.error('Passwords do not match');
    }
  }

  /**
   * @description render - renders the class component
   * @return {object} returns an object
   */
  render() {
    return (
      <Form
        value={this.state}
        onFocus={this.onFocus}
        onChange={this.handleChange}
        handleSubmit={this.handleFormSubmit}
      />
    );
  }
}
SignUp.propTypes = {
  signUpAction: PropTypes.func.isRequired,
  signupResponse: PropTypes.objectOf(any).isRequired,
};

const mapStateToProps = state => ({
  signupResponse: state.signupReducer[0]
});


export default connect(mapStateToProps, { signUpAction })(SignUp);
