import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { bindActionCreators } from 'redux';
import Header from '../common/Header';
import Footer from '../common/Footer';
import RecipeCard from '../recipes/RecipeCard';
import getRecipeAction from '../../actionController/getRecipe';

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
      isFetched: false
    };
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
    if (recipeData !== this.props.recipes.recipeData) {
      this.setState({
        recipeData,
        isFetched
      });
    }
  }

  /**
   * @description render - display all the recipes
   *
   * @return {JSX} return JSX
   */
  render() {
    let renderRecipeGrid = <h1>No recipes</h1>;
    if (this.state.isFetched) {
      renderRecipeGrid = this.state.recipeData.map(recipeData => (
        <RecipeCard
          key={recipeData.id}
          recipeData={recipeData}
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
  getRecipeAction: PropTypes.func.isRequired,
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
  recipes: state.recipeReducer[0]
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
    getRecipeAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGrid);
