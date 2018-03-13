import React from 'react';

const RecipeNotFound = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="not-found-container">
          <div className="text-center error-margin">
            <div>
              <i className="fa fa-exclamation-circle fa-5x" />
            </div>
            <h1>You do not have any recipe in your catalog </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RecipeNotFound;
