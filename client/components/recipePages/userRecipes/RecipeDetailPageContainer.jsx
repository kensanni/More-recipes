import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes, { any } from 'prop-types';
import miniToastr from 'mini-toastr';
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
    this.props.getRecipeDetailsAction(recipeId);
  }

  /**
   * @description upvote a recipe
   *
   * @param {id} id id of recipe to be upvoted
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
   * @param {id} id id of recipe to be updated
   *
   * @return {undefined} calls downvoteRecipeAction
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
   * @param {id} id - id of recipe to be favorited
   *
   * @return {undefined} calls favoriteRecipeAction
   */
  favoriteRecipe(id) {
    this.props.favoriteRecipeAction(id);
  }
  /**
   * @description set the state of value inputs on form
   *
   * @param {event} event
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
   * @description add a review
   *
   * @param {id} id - id of recipe to review
   *
   * @return {void} calls addReviews action
   */
  addReview(id) {
    const { review } = this.state;
    this.props.addReviewsAction(id, review);
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
        <Footer />
      </div>
    );
  }
}

RecipeDetailPageContainer.propTypes = {
  getRecipeDetailsAction: PropTypes.func.isRequired,
  upvoteRecipeAction: PropTypes.func.isRequired,
  downvoteRecipeAction: PropTypes.func.isRequired,
  favoriteRecipeAction: PropTypes.func.isRequired,
  recipeDetails: PropTypes.objectOf(any).isRequired,
  match: PropTypes.objectOf(any).isRequired,
  authenticated: PropTypes.bool.isRequired,
  addReviewsAction: PropTypes.func.isRequired,
  // reviews: PropTypes.arrayOf(any).isRequired
};

const mapStateToProps = state => (
  console.log('reviewsghbj', state.getRecipeDetailsReducer.recipeDetails.Reviews),
  {
    recipeDetails: state.getRecipeDetailsReducer,
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
