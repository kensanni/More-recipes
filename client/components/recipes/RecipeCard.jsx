import React, { Component } from 'react';

/**
 * @class RecipeCard
 */
class RecipeCard extends Component {
  /**
   * @description create an instance of recipe card
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  /**
   * @description - upvote recipe
   * @param {*} event
   * @return {object} object
   */
  upvoteRecipe(event) {
    
  }

  downvoteRecipe(event) {

  }

  favoriteRecipe(event) {

  }
  /**
   * @description render - Display the recipe card
   * @return {object} return an object
   */
  render() {
    return (
      <div className="col-sm-6 col-md-4 pb-4 mb-5">
        <div className="card">
          <img className="card-img-top" src="..\image\banner-img-1.jpg" alt="recipe" />
          <div className="card-body">
            <a href="recipeDetail.html">
              <h4 className="card-title">Pepper Soup with goat meat</h4>
            </a>
            <p className="card-text pt-2">
              Some quick example text to
              build on the card title
              and make up the bulk of the cards content.
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item card-tile">
              <i className="fa fa-heart fa-2x favorite-btn" aria-hidden="true" />
              <i className="fa fa-thumbs-up fa-2x ml-5 favorite-btn" aria-hidden="true">
                <span className="small pr-2">1k
                </span>
              </i>
              <i className="fa fa-thumbs-down fa-2x favorite-btn" aria-hidden="true">
                <span className="small pr-2">
                  10
                </span>
              </i>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
