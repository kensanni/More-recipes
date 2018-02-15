import React from 'react';
import PropTypes, { any } from 'prop-types';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import EditModal from '../../Include/EditModal';
import DeleteModal from '../../Include/DeleteModal';

const UserRecipesCard = (props) => {
  const {
    recipeData,
    showRecipeDetails,
    cardId,
    deleteRecipe,
    editRecipe,
    value,
    onChange,
    saveImageToCloud
  } = props;
  const {
    id, name, description, image
  } = recipeData;
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 pt-4">
      <div className="card">
        <img className="card-img-top img-max" src={image} alt="" />
        <div className="card-body">
          <a href="">
            <h4 className="card-title">{name}</h4>
          </a>
          <p className="card-text pt-2">
            {description}
          </p>
        </div>
        <div className="card-footer card-tile">
          <div className="row">
            <div className="col-xs-6 ml-3">
              <EditRecipe
                recipeId={id}
                cardId={cardId}
                showRecipeDetails={showRecipeDetails}
              />
              <EditModal
                cardId={cardId}
                editRecipe={editRecipe}
                value={value}
                onChange={onChange}
                recipeId={id}
                recipeData={recipeData}
                saveImageToCloud={saveImageToCloud}
              />
            </div>
            <div className="col-xs-6">
              <DeleteRecipe />
              <DeleteModal
                deleteRecipe={deleteRecipe}
                recipeId={id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserRecipesCard.propTypes = {
  recipeData: PropTypes.objectOf(any).isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  // value: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saveImageToCloud: PropTypes.func.isRequired
};

export default UserRecipesCard;
