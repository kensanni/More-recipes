import React, { Component } from 'react';
import avatar from '../../public/images/avatar.png';
import backgroundImage from '../../public/images/blog-img-01.jpg';

/**
 * @class SignIn
 * @description Log in existing Users
 */
class SignIn extends Component {
  /**
   * @description create an instance of Signin
   * @param {*} props
   */
  constructor() {
    super(props)
    this.state = {
      username: "",
      password: ""
    };
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
   * 
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
  }

}

export default SignIn;
