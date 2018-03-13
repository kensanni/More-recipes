import React from 'react';

/**
 * @description functional component to render section for displaying favorite recipe title
 *
 * @returns {JSX} return JSX
 */
const FavoriteRecipeTitle = () => ((
  <div className="row">
    <section className="col-md-12">
      <h1 className="title">
        Favorite recipes
      </h1>
      <div>
        <hr />
      </div>
    </section>
  </div>
));

export default FavoriteRecipeTitle;
