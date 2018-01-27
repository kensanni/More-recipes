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
      this.props.getUserRecipe();
    }
  }
  /**
   * @description render user recipes
   * @return {*} wfdgsfd
   */
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="top-nav-bar">
            <AddRecipe />
          </div>
          <UserRecipesCard />
          <Footer />
        </div>
      </div>
    );
  }
}
UserRecipes.propTypes = {
  getUserRecipe: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  recipes: state.getUserRecipeReducer[0]
});

export default connect(mapStateToProps, { getUserRecipe })(UserRecipes);
