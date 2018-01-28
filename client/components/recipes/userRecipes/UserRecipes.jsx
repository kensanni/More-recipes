import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';

import getUserRecipe from '../../../actionController/getUserRecipe';
import AddRecipe from './AddRecipe';
import UserRecipesCard from './UserRecipesCard';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

/**
 * @class UserRecipes
 * @description UserRecipes
 */
class UserRecipes extends Component {
  /**
   * @description create an instance of UserRecipes
   * @param {*} props
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
   * @param {*} props
   * @return {*} return all recipes
   */
  componentDidMount() {
    if (this.props.recipes.isFetched === false) {
      this.props.getUserRecipe(this.props.userId);
    }
  }

  /**
   * @description update the state of user recipes
   * @param {*} nextProps
   * @return {*} updated user recipe
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
   * @description
   * @return {*} e
   */
  editRecipe() {

  }

  /**
   * @description
   * @return {*} e
   */
  deleteRecipe() {

  }

  /**
   *@description
   * @return {*} e
   */
  addRecipe() {

  }
  /**
   * @description render user recipes
   * @return {*} wfdgsfd
   */
  render() {
    let renderUserRecipes = <h1>No recipes in your catalog</h1>
    if (this.state.isFetched) {
      renderUserRecipes = this.state.recipeData.map((recipeData, key) => (
        <UserRecipesCard
          key={key}
          recipeData={recipeData}
          deleteRecipe={this.deleteRecipe}
          editRecipe={this.addRecipe}
          addRecipe={this.addRecipe}
        />
      ));
    }
    return (
      <div>
        <Header />
        <div className="container">
          <div className="top-nav-bar">
            <AddRecipe />
          </div>
          <div className="row">
            { this.state.isFetched && renderUserRecipes }
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
UserRecipes.propTypes = {
  getUserRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.objectOf(any).isRequired,
  // userId: PropTypes.objectOf(any).isRequired,
};

const mapStateToProps = state => ({
  recipes: state.getUserRecipeReducer[0],
  userId: state.signinReducer[0].userData.id
});

export default connect(mapStateToProps, { getUserRecipe, })(UserRecipes);
