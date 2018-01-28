import React from 'react';

const RecipeCard = (props) => {
  // console.log('Recipe details', props);
  const { recipeData, upvoteRecipe, downvoteRecipe, favoriteRecipe } = props,
    {
      id,
      description,
      upvotes,
      downvotes
    } = recipeData;

  return (
    <div className="col-sm-6 col-md-4 pt-4 mb-5">
      <div className="card">
        <div className="card-body">
          <a href="recipeDetail.html">
            <h4 className="card-title">Pepper Soup with goat meat</h4>
          </a>
          <p className="card-text pt-2">
            {description}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item card-tile">
            <i
              className="fa fa-heart fa-2x favorite-btn"
              aria-hidden="true"
              onClick={() => favoriteRecipe(id)}
            />
            <i
              className="fa fa-thumbs-up fa-2x ml-5 favorite-btn"
              aria-hidden="true"
              onClick={() => upvoteRecipe(id)}
            >
              <span className="small pr-2">{upvotes}
              </span>
            </i>
            <i
              className="fa fa-thumbs-down fa-2x favorite-btn"
              aria-hidden="true"
              onClick={() => downvoteRecipe(id)}
            >
              <span className="small pr-2">
                {downvotes}
              </span>
            </i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;
