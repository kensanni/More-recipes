import React from 'react';
import EditRecipeButton from '../../Include/buttons/EditRecipeButton';
import EditModal from '../../Include/modals/EditModal';
import DeleteRecipeButton from '../../Include/buttons/DeleteRecipeButton';
import DeleteModal from '../../Include/modals/DeleteModal';

const RecipeCardFooter = (props) => {
  const {
    recipeData,
    showRecipeDetails,
    deleteRecipe,
    editRecipe,
    value,
    onChange,
    saveImageToCloud,
    handleCloseModal,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    showActionButton,
    startEdit,
    favRecipeData
  } = props.data;
  const {
    id, upvotes, downvotes, favorites
  } = recipeData;

  let component;

  component = showActionButton ? (
    <div className="card-footer card-tile">
      <div className="row">
        <div className="col-xs-6 ml-3">
          <EditRecipeButton
            recipeId={id}
            handleClick={startEdit}
            cardId={id}
            showRecipeDetails={showRecipeDetails}
          />
          <EditModal
            cardId={id}
            editRecipe={editRecipe}
            value={value}
            onChange={onChange}
            recipeId={id}
            recipeData={recipeData}
            handleCloseModal={handleCloseModal}
            saveImageToCloud={saveImageToCloud}
          />
        </div>
        <div className="col-xs-6">
          <DeleteRecipeButton
            recipeId={id}
          />
          <DeleteModal
            deleteRecipe={deleteRecipe}
            recipeId={id}
          />
        </div>
      </div>
    </div>
  ) : component = (
    <ul className="list-group list-group-flush">
      <li className="list-group-item card-tile">
        <i
          className="fa fa-heart fa-2x favorite-btn"
          aria-hidden="true"
          onClick={() => favoriteRecipe(id)}
        >
          <span className="small pr-2">{favorites}
          </span>
        </i>
        <i
          className="fa fa-thumbs-up fa-2x ml-5 favorite-btn"
          aria-hidden="true"
          onClick={() => upvoteRecipe(id)}
        >
          <span className="small pr-2">{upvotes || favRecipeData.upvotes}
          </span>
        </i>
        <i
          className="fa fa-thumbs-down fa-2x favorite-btn"
          aria-hidden="true"
          onClick={() => downvoteRecipe(id)}
        >
          <span className="small pr-2">
            {downvotes || favRecipeData.downvotes}
          </span>
        </i>
      </li>
    </ul>
  );

  return component;
};

export default RecipeCardFooter;
