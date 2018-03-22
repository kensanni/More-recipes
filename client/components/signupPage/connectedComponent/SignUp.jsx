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
 *
 * @description Create user account
 */
export class SignUp extends Component {
  /**
   * @description create an instance of Signup
   *
   * @param {object} props
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
   * @description mount background image
   *
   * @returns {undefined} mount a background image
   */
  componentWillMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }

  /**
   * @description mount background image
   *
   * @returns {void} mount a background image
   */
  componentDidMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }

  /**
   * @description redirect user to recipe page and set the state of error messages
   *
   * @param {object} nextProps
   *
   * @returns {void} set the state of response message
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/recipes');
    }
    if (!lodash.isEmpty(nextProps.signupResponse.errorMessage)) {
      this.setState({
        responseMessage: nextProps.signupResponse.errorMessage
      });
    }
  }

  /**
   * @description remove background image before redirecting to a new page
   *
   * @returns {void} remove background Image
   */
  componentWillUnmount() {
    document.body.style.backgroundImage = '';
  }

  /**
   * @description Handles the input value changes
   *
   * @param {object} event
   *
   * @returns {void} call setState
   *
   * @memberof SignUp
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  /**
   * @description Sign up a user when form is submitted
   *
   * @param {object} event
   *
   * @returns {void} calls signUpAction
   *
   * @memberof SignUp
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
   *
   * @returns {JSX} returns jsx
   */
  render() {
    return (
      <Form
        value={this.state}
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
  isAuthenticated: PropTypes.bool.isRequired
};

/**
 * @description make state available to signUp class as props
 *
 * @param {object} state
 *
 * @returns {void} mapStateToProps
 */
const mapStateToProps = state => ({
  signupResponse: state.authReducer,
  isAuthenticated: state.authReducer.isAuthenticated
});


export default connect(mapStateToProps, { signUpAction })(SignUp);
