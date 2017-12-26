import React, { Component } from 'react';
import avatar from '../../public/images/avatar.png';
import backgroundImage from '../../public/images/blog-img-01.jpg';

/**
 * @className SignIn
 * @description Log in existing Users
 */
class SignIn extends Component {
  /**
   * @description mount - mount background image
   * @return {image} returns an image
   */
  componentWillMount() {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }
  handleSubmit = (event) => {
    event.preventDefault();
  }

  /**
   * @description render - render signin page
   * @return {object} returns an object
   */
  render() {
    return (
      <div className="pt-5" style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit} className="m-x-auto app-login-form card-login">
          <h1 className="signin-text"> More-recipe</h1>
          <section className="">
            <img className="img-fluid rounded-circle img-size" src={avatar} alt="" />
          </section>
          <section className="pb-4 pt-3">
            <input className="form-control" placeholder="Username" />
          </section>
          <section className="pb-4">
            <input className="form-control" placeholder="Password" />
          </section>
          <div>
            <button className="btn btn-block btn-orange">
              <a href="recipe.html" className="signin-btn" id="signn-btn">Sign In</a>
            </button>
          </div>
          <div className="pt-2 pb-4 text-align">
            <a href="Forgotpassword" id="text-dec">Forgotten your password?</a>
          </div>
          <div>
            <hr />
          </div>
          <footer>
            <a href="signnup.html" id="text-dec">Create Account</a>
          </footer>
        </form>
      </div>
    );
  }
}

export default SignIn;
