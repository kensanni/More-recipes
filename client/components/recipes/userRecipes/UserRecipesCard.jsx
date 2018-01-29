import React from 'react';
import EditRecipe from '../EditRecipe';
import DeleteRecipe from '../DeleteRecipe';

const UserRecipesCard = (props) => {
  console.log('Recipe details', props);
  const { recipeData, deleteRecipe } = props,
    {
      id,
      description
    } = recipeData;
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 pt-4">
      <div className="card">
        <div className="card-body">
          <a href="">
            <h4 className="card-title"></h4>
          </a>
          <p className="card-text pt-2">
            {description}
          </p>
        </div>
        <div className="card-footer card-tile">
          <div className="row">
            <div className="col-xs-6 ml-3">
              <EditRecipe />
            </div>
            <div className="col-xs-6">
              <DeleteRecipe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRecipesCard;
