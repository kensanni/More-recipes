import React from 'react';
import EditRecipe from '../EditRecipe';
import DeleteRecipe from '../DeleteRecipe';
import EditModal from '../../Include/EditModal';
import DeleteModal from '../../Include/DeleteModal';

const UserRecipesCard = (props) => {
  console.log('Recipe details', props);
  const { recipeData, deleteRecipe } = props,
    {
      id,
      name,
      description,
      image
    } = recipeData;
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 pt-4">
      <div className="card">
        <img className="card-img-top" src={image} alt="" />
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
              <EditRecipe />
              <EditModal />
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

export default UserRecipesCard;
