import React, { Component } from 'react';
import AddRecipe from './AddRecipe';
import UserRecipesCard from './UserRecipesCard';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

/**
 * @description UserRecipes
 */
class UserRecipes extends Component {
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
    )
  }
}

export default UserRecipes;
