import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/footer';
import RecipeCard from '../recipes/RecipeCard';

class RecipeGrid extends Component {
  render () {
    return (
      <div>
        <Header />
        <RecipeCard />
        <Footer />
      </div>
    )
  }
}

export default RecipeGrid;
