import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { bindActionCreators } from 'redux';
import Header from '../common/Header';
import Footer from '../common/Footer';
import RecipeCard from '../recipes/RecipeCard';
import getRecipeAction from '../../actionController/getRecipe';
import getPopularRecipeAction from '../../actionController/getPopularRecipe';
import upvoteRecipeAction from '../../actionController/upvoteRecipe';
import downvoteRecipeAction from '../../actionController/downvoteRecipe';
import favoriteRecipeAction from '../../actionController/favoriteRecipe';

/**
 * @class RecipeGrid
 *
 * @description Display all recipeCard on the app
 */
class RecipeGrid extends Component {
  /**
   * @description create an instance of RecipeGrid
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeData: [],
      popularRecipesData: [],
      isFetched: false
    };
    this.upvoteRecipe = this.upvoteRecipe.bind(this);
    this.downvoteRecipe = this.downvoteRecipe.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
  }
  /**
   * @description check the state of isFetched and call the get recipe action
   *
   * @param {props} props
   *
   * @return {undefined} call getRecipe
   */
  componentDidMount() {
    if (this.props.recipes.isFetched === false) {
      this.props.getPopularRecipeAction();
      this.props.getRecipeAction();
    }
  }
  /**
   * @description update the state of recipe
   *
   * @param {nextProps} nextProps
   *
   * @return {object} updated recipe state
   */
  componentWillReceiveProps(nextProps) {
    const { recipeData, isFetched } = nextProps.recipes;
    const { popularRecipesData } = nextProps.popularRecipes;
    if (recipeData !== this.props.recipes.recipeData) {
      this.setState({
        recipeData,
        isFetched
      });
    }
    if (popularRecipesData !== this.props.popularRecipes.popularRecipesData) {
      this.setState({
        popularRecipesData,
        isFetched,
      });
    }
  }
  /**
   * @description upvote a recipe
   *
   * @param {id} id id of recipe to be upvoted
   *
   * @return {undefined} calls upvoteRecipeAction
   */
  upvoteRecipe(id) {
    this.props.upvoteRecipeAction(id);
  }

  /**
   * @description downvote a recipe
   *
   * @param {id} id id of recipe to be updated
   *
   * @return {undefined} calls downvoteRecipeAction
   */
  downvoteRecipe(id) {
    this.props.downvoteRecipeAction(id);
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


  // renderPopularRecipes(recipes) {
  //   const rendersRecipes = recipes.map(recipeData => (
  //     <RecipeCard
  //       key={recipeData.id}
  //       recipeData={recipeData}
  //       upvoteRecipe={this.upvoteRecipe}
  //       downvoteRecipe={this.downvoteRecipe}
  //       favoriteRecipe={this.favoriteRecipe}
  //     />
  //   ));
  //   return (
  //     <section className="row">
  //       <h2>Popular Recipes</h2>
  //       {rendersRecipes}
  //     </section>
  //   );
  // }

  /**
   * @description
   *
   * @param {*} recipes
   * @param {*} index
   *
   * @returns {*} yfhdhd
   */
  renderRecipes(recipes, index) {
    const recipe = recipes[index];
    return (<RecipeCard
      key={recipe.id}
      recipeData={recipe}
      upvoteRecipe={this.upvoteRecipe}
      downvoteRecipe={this.downvoteRecipe}
      favoriteRecipe={this.favoriteRecipe}
    />);
  }
  /**
   * @description render - display all the recipes
   *
   * @return {JSX} return JSX
   */
  render() {
    let renderRecipeGrid = <h1>No recipes</h1>;
    const { recipeData, popularRecipesData, isFetched } = this.state;
    // if (this.state.isFetched) {
    //   renderRecipeGrid = this.state.recipeData.map(recipeData => (
    //     <RecipeCard
    //       key={recipeData.id}
    //       recipeData={recipeData}
    //       upvoteRecipe={this.upvoteRecipe}
    //       downvoteRecipe={this.downvoteRecipe}
    //       favoriteRecipe={this.favoriteRecipe}
    //     />
    //   ));
    // }
    if (this.state.isFetched) {
      renderRecipeGrid = recipeData.map((recipe, i) =>
        this.renderRecipes(recipeData, i));
    }
    return (
      <div>
        <Header />
        <div className="container pt-4">
          <div className="row">
            <section className="col-md-12">
              <h2 className="title">Popular Recipes</h2>
              <div>
                <hr />
              </div>
            </section>
            { isFetched && popularRecipesData
                .map((recipe, i) => this.renderRecipes(popularRecipesData, i))
            }
          </div>
          <div className="row">
            <section className="col-md-12">
              <h2 className="title">All Recipes</h2>
              <div>
                <hr />
              </div>
            </section>
          </div>
          <div className="row">
            {isFetched && renderRecipeGrid }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

RecipeGrid.propTypes = {
  getRecipeAction: PropTypes.func.isRequired,
  upvoteRecipeAction: PropTypes.func.isRequired,
  downvoteRecipeAction: PropTypes.func.isRequired,
  favoriteRecipeAction: PropTypes.func.isRequired,
  getPopularRecipeAction: PropTypes.func.isRequired,
  recipes: PropTypes.objectOf(any).isRequired,
};

/**
 * @description make state available to recipeGrid as props
 *
 * @param {state} state
 *
 * @returns {object} object
 */
const mapStateToProps = state => ({
  recipes: state.recipeReducer[0],
  popularRecipes: state.getPopularRecipeReducer[0]
});

/**
 * @description make actions available to recipeGrid as props
 *
 * @param {dispatch} dispatch
 *
 * @returns {undefined} call bindActionCreators function
 */
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getRecipeAction,
    upvoteRecipeAction,
    downvoteRecipeAction,
    favoriteRecipeAction,
    getPopularRecipeAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGrid);
