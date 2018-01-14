import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import lodash from 'lodash';
import { connect } from 'react-redux';
import Form from '../../signinPage/Form';
import backgroundImage from '../../../public/images/recipe-img-bg.jpeg';
import signInAction from '../../../actionController/signin';

/**
 * @class SignIn
 * @description Log in existing Users
 */
class SignIn extends Component {
  /**
   * @description create an instance of Signin
   * @param {*} props
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
   * @return {image} returns an image
   */
  componentWillMount() {
    /* eslint-disable no-undef */
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }

  /**
   * @description
   * @param {*} nextProps
   * @return {null} null
   */
  componentWillReceiveProps(nextProps) {
    if (!lodash.isEmpty(nextProps.signinResponse.errorMessage)) {
      this.setState({
        responseMessage: nextProps.signinResponse.errorMessage
      });
    }
  }


  /**
   * @description Handles the input value changes
   * @param {*} event
   * @return {*} null
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
   * @param {*} event
   * @return {*} n
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.state.responseMessage = '';
    this.props.signInAction(this.state);
  }

  /**
   * @description render - renders the class component
   * @return {object} returns an object
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
};

const mapStateToProps = state => ({
  signinResponse: state.signinReducer[0]
});

export default connect(mapStateToProps, { signInAction })(SignIn);
