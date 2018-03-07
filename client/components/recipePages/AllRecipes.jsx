import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import miniToastr from 'mini-toastr';
import RecipeGrid from '../recipePages/RecipeGrid';
import Header from '../common/Header';
import GuestHeader from '../common/GuestHeader';
import Footer from '../common/Footer';
import RecipeCard from '../Include/cards/RecipeCard';
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
class AllRecipes extends Component {
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
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  /**
   * @description call the action to display all recipes
   *
   * @param {props} props
   *
   * @return {undefined} call getRecipe
   */
  componentDidMount() {
    this.props.getPopularRecipeAction();
    this.props.getRecipeAction(this.props.recipes.page);
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
   * @return {void} calls upvoteRecipeAction
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

  handlePaginationChange(recipes) {
    this.props.getRecipeAction(recipes.selected);
  }

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
    const { recipeData, popularRecipesData, isFetched } = this.state;
    return (
      <div>
        {
          this.props.authenticated ? <Header /> : <GuestHeader />
        }
        <div className="container pt-4">
          <div className="row">
            <section className="col-md-12">
              <h2 className="title">Popular Recipes</h2>
              <div>
                <hr />
              </div>
            </section>
            <RecipeGrid
              recipeData={popularRecipesData}
              upvoteRecipe={this.upvoteRecipe}
              downvoteRecipe={this.downvoteRecipe}
              favoriteRecipe={this.favoriteRecipe}
            />
            {/* { isFetched && popularRecipesData
                .map((recipe, i) => this.renderRecipes(popularRecipesData, i))
            } */}
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
            <RecipeGrid
              recipeData={recipeData}
              upvoteRecipe={this.upvoteRecipe}
              downvoteRecipe={this.downvoteRecipe}
              favoriteRecipe={this.favoriteRecipe}
            />
          </div>
        </div>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel={<a href="">...</a>}
          breakClassName="page-link"
          onPageChange={this.handlePaginationChange}
          pageCount={this.props.recipes.page}
          containerClassName="pagination justify-content-center"
          pageLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          disabledClassName="disabled"
          pageClassName="page-item"
          previousClassName="page-item"
          nextClassName="page-item"
          activeClassName="active"
          subContainerClassName="pages pagination"
        />
        <Footer />
      </div>
    );
  }
}

AllRecipes.propTypes = {
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
  authenticated: state.authReducer.isAuthenticated,
  recipes: state.recipeReducer,
  popularRecipes: state.getPopularRecipeReducer
});

/**
 * @description make actions available to AllRecipes as props
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

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);
