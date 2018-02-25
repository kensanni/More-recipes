import React from 'react';
import PropTypes, { any } from 'prop-types';

/**
 * @description recipe card
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */

const RecipeCard = (props) => {
  const {
    recipeData, upvoteRecipe, downvoteRecipe, favoriteRecipe
  } = props;
  const {
    id,
    name,
    description,
    upvotes,
    image,
    downvotes
  } = recipeData;

  return (
    <div className="col-sm-6 col-md-4 pt-4 mb-5">
      <div className="card">
        <img className="card-img-top img-max" src={image} alt="" />
        <div className="card-body">
          <a href="recipeDetail.html">
            <h4 className="card-title">{name}</h4>
          </a>
          <p className="card-text pt-2">
            {description}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item card-tile">
            <i
              className="fa fa-heart fa-2x favorite-btn"
              aria-hidden="true"
              onClick={() => favoriteRecipe(id)}
            />
            <i
              className="fa fa-thumbs-up fa-2x ml-5 favorite-btn"
              aria-hidden="true"
              onClick={() => upvoteRecipe(id)}
            >
              <span className="small pr-2">{upvotes}
              </span>
            </i>
            <i
              className="fa fa-thumbs-down fa-2x favorite-btn"
              aria-hidden="true"
              onClick={() => downvoteRecipe(id)}
            >
              <span className="small pr-2">
                {downvotes}
              </span>
            </i>
          </li>
        </ul>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipeData: PropTypes.objectOf(any).isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  favoriteRecipe: PropTypes.func.isRequired
};

export default RecipeCard;
