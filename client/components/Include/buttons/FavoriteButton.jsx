import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description functional component to render favorite button
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const FavoriteButton = (props) => {
  const { favoriteRecipe, recipeId, favorites } = props;
  return (
    <div>
      <button className="btn btn-orange mr-2 favorite" type="button">
        <i
          className="fa fa-heart fa-2x favorite-btn"
          aria-hidden="true"
          onClick={() => favoriteRecipe(recipeId)}
        />
      </button>
      <span className="mr-2">
        {favorites}
      </span>
    </div>
  );
};

FavoriteButton.propTypes = {
  favoriteRecipe: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired,
  favorites: PropTypes.number.isRequired
};

export default FavoriteButton;
