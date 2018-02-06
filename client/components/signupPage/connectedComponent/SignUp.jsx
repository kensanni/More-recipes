import React, { Component } from 'react';
import lodash from 'lodash';
import miniToastr from 'mini-toastr';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import signUpAction from '../../../actionController/signup';
import Form from '../../signupPage/Form';
import backgroundImage from '../../../public/images/recipe-img-bg.jpeg';


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
      password: '',
      confirmPassword: '',
      responseMessage: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @description mount - mount background image
   * @return {image} returns an image
   */
  componentWillMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }

  /**
   * @description jhj
   * @param {*} nextProps
   * @return {*} null
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.signupResponse.isAuthenticated) {
      this.props.history.push('/recipes');
    }
    if (!lodash.isEmpty(nextProps.signupResponse.errorMessage)) {
      this.setState({
        responseMessage: nextProps.signupResponse.errorMessage
      });
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
   * @return {*} v
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.state.responseMessage = '';
    if (this.state.password === this.state.confirmPassword) {
      this.props.signUpAction(this.state);
    } else {
      miniToastr.init();
      miniToastr.error('Passwords do not match');
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
  history: PropTypes.objectOf(any).isRequired,
};

const mapStateToProps = state => ({
  signupResponse: state.signupReducer[0]
});


export default connect(mapStateToProps, { signUpAction })(SignUp);
