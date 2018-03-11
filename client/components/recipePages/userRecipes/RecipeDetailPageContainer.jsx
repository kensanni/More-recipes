import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes, { any } from 'prop-types';
import miniToastr from 'mini-toastr';
import { Lines } from 'react-preloading-component';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import upvoteRecipeAction from '../../../actionController/upvoteRecipe';
import downvoteRecipeAction from '../../../actionController/downvoteRecipe';
import favoriteRecipeAction from '../../../actionController/favoriteRecipe';
import getRecipeDetailsAction from '../../../actionController/getRecipeDetails';
import addReviewsAction from '../../../actionController/addReviews';
import RecipeDetailsCard from '../../Include/cards/RecipeDetailsCard';

/**
 * @class recipeDetailPageContainer
 *
 * @description container displaying recipe details and reviews
 */
class RecipeDetailPageContainer extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      review: '',
    };
    this.upvoteRecipe = this.upvoteRecipe.bind(this);
    this.downvoteRecipe = this.downvoteRecipe.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.addReview = this.addReview.bind(this);
    this.mainJsx = this.mainJsx.bind(this);
    this.errorJsx = this.errorJsx.bind(this);
    this.fetchingJsx = this.fetchingJsx.bind(this);
    this.renderJsx = this.renderJsx.bind(this);
  }

  /**
   * @description call the action to get a recipes
   *
   * @param {object} props
   *
   * @return {void} call getRecipeDetails action
   */
  componentDidMount() {
    const { recipeId } = this.props.match.params;
    if (!Number.isInteger(parseInt(recipeId, 10))) {
      this.props.history.push('/recipes');
    }

    if (this.props.authenticated) {
      return this.props.getRecipeDetailsAction(recipeId);
    }
    this.props.history.push('/recipes');
    miniToastr.init();
    return miniToastr.error('Login to continue');
  }

  /**
   * @description upvote a recipe
   *
   * @param {number} id id of recipe to be upvoted
   *
   * @return {void} calls upvoteRecipeAction
   */
  upvoteRecipe(id) {
    if (this.props.authenticated) {
      return this.props.upvoteRecipeAction(id);
    }
    miniToastr.init();
    return miniToastr.error('Login to continue');
  }

  /**
   * @description downvote a recipe
   *
   * @param {number} id id of recipe to be updated
   *
   * @return {void} calls downvoteRecipeAction
   */
  downvoteRecipe(id) {
    if (this.props.authenticated) {
      return this.props.downvoteRecipeAction(id);
    }
    miniToastr.init();
    return miniToastr.error('Login to continue');
  }

  /**
   * @description favorite a recipe
   *
   * @param {number} id - id of recipe to be favorited
   *
   * @return {void} calls favoriteRecipeAction
   */
  favoriteRecipe(id) {
    this.props.favoriteRecipeAction(id);
  }
  /**
   * @description set the state of value inputs on form
   *
   * @param {object} event
   *
   * @returns {void} set the state of value inputs on form
   */
  handleReviewChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  /**
   * @description component to display recipe details
   *
   * @returns {JSX} return JSX
   */
  mainJsx() {
    return (
      <div className="container">
        <RecipeDetailsCard
          recipeData={this.props.recipeDetails}
          upvoteRecipe={this.upvoteRecipe}
          downvoteRecipe={this.downvoteRecipe}
          favoriteRecipe={this.favoriteRecipe}
          addReview={this.addReview}
          value={this.state}
          reviews={this.props.reviews}
          onChange={this.handleReviewChange}
        />
        <div className="pb-5" />
      </div>
    );
  }

  /**
   * @description set the state of value inputs on form
   *
   * @returns {JSX} return JSX
   */
  fetchingJsx() {
    return (
      <div>
        <Lines />;
      </div>
    );
  }

  /**
   * @description component to be rendered when there is an error fetching recipe detail
   *
   * @returns {JSX} return JSX
   */
  errorJsx() {
    return (
      <div className="text-center error-margin">
        <div>
          <i className="fa fa-exclamation-circle fa-5x" />
        </div>
        <h1>{this.props.errorMessage}</h1>
      </div>
    );
  }

  /**
   * @description add a review
   *
   * @param {number} id - id of recipe to review
   *
   * @return {void} calls addReviews action
   */
  addReview(id) {
    const { review } = this.state;
    this.props.addReviewsAction(id, review);
  }

  /**
   * @description render recipe detail page based on input
   *
   * @returns {JSX} render JSX
   */
  renderJsx() {
    const { recipeDetailStatus } = this.props;
    if (recipeDetailStatus === 'fetched') return this.mainJsx();
    if (recipeDetailStatus === 'fetching') return this.fetchingJsx();
    if (recipeDetailStatus === 'error') return this.errorJsx();
    return null;
  }

  /**
   * @description render - display component
   *
   * @return {JSX} return JSX
   */
  render() {
    return (
      <div>
        <Header />
        { this.renderJsx() }
        <Footer />
      </div>
    );
  }
}

RecipeDetailPageContainer.defaultProps = {
  recipeDetailStatus: null,
  reviews: undefined
};

RecipeDetailPageContainer.propTypes = {
  getRecipeDetailsAction: PropTypes.func.isRequired,
  upvoteRecipeAction: PropTypes.func.isRequired,
  downvoteRecipeAction: PropTypes.func.isRequired,
  favoriteRecipeAction: PropTypes.func.isRequired,
  recipeDetails: PropTypes.objectOf(any).isRequired,
  match: PropTypes.objectOf(any).isRequired,
  authenticated: PropTypes.bool.isRequired,
  addReviewsAction: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  recipeDetailStatus: PropTypes.string,
  history: PropTypes.objectOf(any).isRequired,
  reviews: PropTypes.arrayOf(any)
};

const mapStateToProps = state => ({
  recipeDetails: state.getRecipeDetailsReducer,
  errorMessage: state.getRecipeDetailsReducer.errorMessage,
  recipeDetailStatus: state.getRecipeDetailsReducer.recipeDetailStatus,
  authenticated: state.authReducer.isAuthenticated,
  reviews: state.getRecipeDetailsReducer.recipeDetails.Reviews
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getRecipeDetailsAction,
    upvoteRecipeAction,
    downvoteRecipeAction,
    favoriteRecipeAction,
    addReviewsAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailPageContainer);
