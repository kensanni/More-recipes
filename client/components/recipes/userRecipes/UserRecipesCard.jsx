import React from 'react';
import EditRecipe from '../EditRecipe';
import DeleteRecipe from '../DeleteRecipe';

const UserRecipesCard = (props) => {
  console.log('Recipe details', props);
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 pt-4">
      <div className="card">
        <div className="card-body">
          <a href="">
            <h4 className="card-title">Pepper Soup with goat meat</h4>
          </a>
          <p className="card-text pt-2">
            Some quick example text to build on the card title and make up the
            bulk of the card content.
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
