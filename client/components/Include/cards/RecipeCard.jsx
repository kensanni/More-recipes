import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeCardFooter from './RecipeCardFooter';

/**
 * @description recipe card
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */

const RecipeCard = (props) => {
  const { recipeData, favRecipeData } = props;
  return (
    <div className="col-sm-6 col-md-4 pt-4 mb-5">
      <div className="card">
        <img
          className="card-img-top img-max"
          src={recipeData.image || favRecipeData.image}
          alt=""
        />
        <div className="card-body">
          <Link to={`/recipes/${recipeData.id || favRecipeData.id}`}>
            <h4 className="card-title">{recipeData.name || favRecipeData.name}</h4>
          </Link>
          <p className="card-text pt-2">
            {recipeData.description || favRecipeData.description}
          </p>
        </div>
        <RecipeCardFooter
          data={props}
        />
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipeData: PropTypes.objectOf(any).isRequired
};

export default RecipeCard;
