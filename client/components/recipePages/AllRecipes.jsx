import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import { Lines } from 'react-preloading-component';
import RecipeGrid from '../recipePages/RecipeGrid';
import Header from '../common/Header';
import GuestHeader from '../common/GuestHeader';
import Footer from '../common/Footer';
import getRecipeAction from '../../actionController/getRecipe';
import getPopularRecipeAction from '../../actionController/getPopularRecipe';

/**
 * @class RecipeGrid
 *
 * @description Display all recipeCard on the app
 */
class AllRecipes extends Component {
  /**
   * @description create an instance of RecipeGrid
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeData: [],
      popularRecipesData: [],
    };
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  /**
   * @description call the action to display all recipes
   *
   * @param {object} props
   *
   * @return {void} call getRecipe
   */
  componentDidMount() {
    this.props.getPopularRecipeAction();
    this.props.getRecipeAction(this.props.recipes.page);
  }
  /**
   * @description update the state of recipe
   *
   * @param {object} nextProps
   *
   * @return {object} updated recipe state
   */
  componentWillReceiveProps(nextProps) {
    const { recipeData } = nextProps.recipes;
    const { popularRecipesData } = nextProps.popularRecipes;
    if (recipeData !== this.props.recipes.recipeData) {
      this.setState({
        recipeData,
      });
    }
    if (popularRecipesData !== this.props.popularRecipes.popularRecipesData) {
      this.setState({
        popularRecipesData,
      });
    }
  }

  /**
   * @description get new recipes to be displayed on the new page
   *
   * @param {object} recipes
   *
   * @return {void} calls getRecipeAction
   */
  handlePaginationChange(recipes) {
    this.props.getRecipeAction(recipes.selected);
  }

  /**
   * @description render - display all the recipes
   *
   * @return {JSX} return JSX
   */
  render() {
    const { recipeData, popularRecipesData } = this.state;
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
            {
              !this.props.popularRecipes.isFetched ? <Lines /> : <RecipeGrid
                recipeData={popularRecipesData}
              />
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
            {
              !this.props.recipes.isFetched ? <Lines /> : <RecipeGrid
                recipeData={recipeData}
              />
            }
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
  getPopularRecipeAction: PropTypes.func.isRequired,
  recipes: PropTypes.objectOf(any).isRequired,
  authenticated: PropTypes.bool.isRequired,
  popularRecipes: PropTypes.objectOf(any).isRequired

};

/**
 * @description make state available to recipeGrid as props
 *
 * @param {object} state
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
 * @param {function} dispatch
 *
 * @returns {void} call bindActionCreators function
 */
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getRecipeAction,
    getPopularRecipeAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);
