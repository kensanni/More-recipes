import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import 'react-select/dist/react-select.css';
import signOutAction from '../../actions/signOutAction';
import searchRecipe from '../../actionController/searchRecipes';


/**
 * @class Header
 *
 * @description Header to be display for authenticated users
 */
export class Header extends Component {
  /**
   * @description get the searched recipes
   *
   * @param {string} input
   *
   * @returns {void}
   */
  static getRecipes(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return searchRecipe(input);
  }

  /**
   * @description create an instance of Header
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      multi: false,
    };
    this.gotoRecipe = this.gotoRecipe.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.gotoRecipe = this.gotoRecipe.bind(this);
    this.toggleBackspaceRemoves = this.toggleBackspaceRemoves.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  /**
   * @description checks for update in search field
   *
   * @param {string} value
   *
   * @memberof Header
   *
   * @returns {void}
  */
  onSearchChange(value) {
    this.setState({
      value,
    });
  }

  /**
   * @description redirect to selected recipe
   *
   * @param {object} value
   *
   * @returns {void}
  */
  gotoRecipe(value) {
    this.context.router.history.push(`/recipes/${value.id}`);
  }


  /**
   * @description removes searched recipe on backspace  entered
   *
   * @memberof authHeader
   *
   * @returns {void}
  */
  toggleBackspaceRemoves() {
    this.setState({
      backspaceRemoves: !this.state.backspaceRemoves
    });
  }

  /**
   * @description log user out
   *
   * @returns {void}
  */
  signOut() {
    this.props.signOutAction();
    this.context.router.history.push('/');
  }

  /**
   * @description render - display header
   *
   * @return {JSX} return JSX
   */
  render() {
    const AsyncComponent = Select.Async;
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-green">
          <Link
            to="/recipes"
            className="navbar-link nav-text"
            id="navlink"
          >
          More-recipe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="form-inline my-2 my-lg-0 ml-auto">
              {
              this.props.details ? <div /> :
              <div className="section search-box">
                <AsyncComponent
                  multi={this.state.multi}
                  value={this.state.value}
                  onChange={this.onSearchChange}
                  onValueClick={this.gotoRecipe}
                  valueKey="id"
                  labelKey="name"
                  filterOptions={false}
                  loadOptions={Header.getRecipes}
                  backspaceRemoves={this.state.backspaceRemoves}
                  noResultsText="No recipe found"
                  placeholder="Search for recipe"
                  searchPromptText="Type to search for recipe"
                />
              </div>
            }
            </div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <Link
                  to=""
                  className="nav-link dropdown-toggle nav-text"
                  id="navlink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                Account
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    to="/profile"
                    className="dropdown-item nav-text"
                  >
                  Profile
                  </Link>
                  <Link
                    to="/my-recipes"
                    className="dropdown-item nav-text"
                  >
                  My recipe
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="navbar-link nav-text signout"
                  id="navlink"
                  role="none"
                  onClick={this.signOut}
                >
                Signout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.objectOf(any).isRequired
};

Header.defaultProps = {
  details: null
};

Header.propTypes = {
  signOutAction: PropTypes.func.isRequired,
  details: PropTypes.string
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signOutAction
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(Header);
