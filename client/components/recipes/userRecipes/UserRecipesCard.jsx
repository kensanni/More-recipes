import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Link } from 'react-router-dom';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import EditModal from '../../Include/EditModal';
import DeleteModal from '../../Include/DeleteModal';

/**
 * @description single recipe card for users
 *
 * @param {props} props
 *
 * @returns {JSX} return JSX
 */
const UserRecipesCard = (props) => {
  const {
    recipeData,
  } = props;
  const {
    id, name, description, image
  } = recipeData;
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 pt-4">
      <div className="card">
        <img className="card-img-top img-max" src={image} alt="" />
        <div className="card-body">
          <Link to="">
            <h4 className="card-title">{name}</h4>
          </Link>
          <p className="card-text pt-2">
            {description}
          </p>
        </div>
        <div className="card-footer card-tile">
          <div className="row">
            <div className="col-xs-6 ml-3">
              <EditRecipe />
              <EditModal />
            </div>
            <div className="col-xs-6">
              <DeleteRecipe />
              <DeleteModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserRecipesCard.propTypes = {
  recipeData: PropTypes.objectOf(any).isRequired,
};

export default UserRecipesCard;
