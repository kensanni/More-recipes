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
  const { recipe, showActionButton } = props;
  return (
    <div className="col-sm-6 col-md-4 pt-4 mb-5">
      <div className="card card-height">
        <img
          className="card-img-top img-max"
          src={recipe.image}
          alt=""
        />
        <div className="card-body word-warp">
          <Link to={`/recipes/${recipe.id}`}>
            <h4 className="card-title text-center">{recipe.name}</h4>
          </Link>
        </div>
        <RecipeCardFooter
          recipe={recipe}
          data={props}
        />
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(any).isRequired,
};

export default RecipeCard;
