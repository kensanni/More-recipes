import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import lodash from 'lodash';
import { connect } from 'react-redux';
import Form from '../../signinPage/Form';
import backgroundImage from '../../../public/images/recipe-img-bg.jpeg';
import signInAction from '../../../actionController/signin';

/**
 * @class SignIn
 *
 * @description Log in existing Users
 */
class SignIn extends Component {
  /**
   * @description create an instance of Signin
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      responseMessage: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * @description mount - mount background image
   *
   * @returns {undefined} mount an image in the background
   */
  componentWillMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }

  componentDidMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }

  /**
   * @description remove background image before redirecting to a new page
   */
  componentWillUnmount() {
    document.body.style.backgroundImage = '';
  }
  
  /**
   * @description update the state of error message and redirect to a new page
   *
   * @param {nextProps} nextProps
   *
   * @returns {object} object
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.signinResponse.isAuthenticated) {
      this.props.history.push('/recipes');
    }
    if (!lodash.isEmpty(nextProps.signinResponse.errorMessage)) {
      this.setState({
        responseMessage: nextProps.signinResponse.errorMessage
      });
    }
  }


  /**
   * @description Handles the input value changes
   *
   * @param {event} event
   *
   * @returns {object} object
   *
   * @memberof SignIn
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


  /**
   * @description log a user in when form is submitted
   *
   * @param {event} event
   *
   * @returns {undefined} calls signInAction
   *;
   * @memberof SignIn
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.state.responseMessage = '';
    this.props.signInAction(this.state);
  }

  /**
   * @description render - renders the class component
   *
   * @returns {JSX} returns JSX
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

SignIn.propTypes = {
  signInAction: PropTypes.func.isRequired,
  signinResponse: PropTypes.objectOf(any).isRequired,
  history: PropTypes.objectOf(any).isRequired,
};

/**
 * @description make state available to sigIn class as props
 *
 * @param {state} state
 *
 * @returns {object} object
 */
const mapStateToProps = state => ({
  signinResponse: state.signinReducer[0],
});

export default connect(mapStateToProps, { signInAction })(SignIn);
