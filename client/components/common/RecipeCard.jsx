import React from 'react';
import PropTypes, { any } from 'prop-types';
import RecipeCardFooter from '../Include/RecipeCardFooter';

/**
 * @description recipe card
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */

const RecipeCard = (props) => {
  const { recipeData } = props;
  const {
    name, description, image
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
