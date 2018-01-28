import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import Header from '../common/Header';
import Footer from '../common/Footer';
import RecipeCard from '../recipes/RecipeCard';
import getRecipe from '../../actionController/getRecipe';
import upvoteRecipeAction from '../../actionController/upvoteRecipe';
import downvoteRecipeAction from '../../actionController/downvoteRecipe';
import favoriteRecipeAction from '../../actionController/favoriteRecipe';

/**
 * @class RecipeGrid
 * @description Display all recipes on the app
 */
class RecipeGrid extends Component {
  /**
   * @description create an instance of RecipeGrid
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeData: [],
      isFetched: false
    };
    this.upvoteRecipe = this.upvoteRecipe.bind(this);
    this.downvoteRecipe = this.downvoteRecipe.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
  }
  /**
   * @description check the state of isFetched and call the get recipe action
   * @param {*} props
   * @return {*} return all recipes
   */
  componentDidMount() {
    if (this.props.recipes.isFetched === false) {
      this.props.getRecipe();
    }
  }
  /**
   * @description update the state of recipe
   * @param {*} nextProps
   * @return {*} updated recipe state
   */
  componentWillReceiveProps(nextProps) {
    const { recipeData, isFetched } = nextProps.recipes;
    if (recipeData !== this.props.recipes.recipeData) {
      this.setState({
        recipeData,
        isFetched
      });
    }
  }
  /**
   * @description upvote a recipe
   * @param {*} id id of recipe to be upvoted
   * @return {object} object
   */
  upvoteRecipe(id) {
    this.props.upvoteRecipeAction(id);
  }

  /**
   * @description downvote a recipe
   * @param {*} id id of recipe to be updated
   * @return {object} object
   */
  downvoteRecipe(id) {
    this.props.downvoteRecipeAction(id);
  }

  /**
   * @description favorite a recipe
   * @param {*} id - id of recipe to be favorited
   * @return {object} object
   */
  favoriteRecipe(id) {
    this.props.favoriteRecipeAction(id);
  }

  /**
   * @description render - display all the recipes
   * @return {*} return an array
   */
  render() {
    let renderRecipeGrid = <h1>No recipes</h1>;
    if (this.state.isFetched) {
      renderRecipeGrid = this.state.recipeData.map((recipeData, key) => (
        <RecipeCard
          key={key}
          recipeData={recipeData}
          upvoteRecipe={this.upvoteRecipe}
          downvoteRecipe={this.downvoteRecipe}
          favoriteRecipe={this.favoriteRecipe}
        />
      ));
    }
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            {this.state.isFetched && renderRecipeGrid }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

RecipeGrid.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  upvoteRecipeAction: PropTypes.func.isRequired,
  downvoteRecipeAction: PropTypes.func.isRequired,
  favoriteRecipeAction: PropTypes.func.isRequired,
  recipes: PropTypes.objectOf(any).isRequired,
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer[0]
});

export default connect(
  mapStateToProps,
  {
    getRecipe,
    upvoteRecipeAction,
    downvoteRecipeAction,
    favoriteRecipeAction
  }
)(RecipeGrid);
