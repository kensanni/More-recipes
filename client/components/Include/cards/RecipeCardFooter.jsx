import React from 'react';
import EditRecipeButton from '../../Include/buttons/EditRecipeButton';
import EditModal from '../../Include/modals/EditModal';
import DeleteRecipeButton from '../../Include/buttons/DeleteRecipeButton';
import DeleteModal from '../../Include/modals/DeleteModal';

/**
 * @description functional component to display recipe card footer based on input received
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const RecipeCardFooter = (props) => {
  const {
    id, upvotes, downvotes, favorites
  } = props.recipe;
  const { showActionButton, setEditRecipeId, deleteRecipe } = props;
  let component;

  component = showActionButton ? (
    <div className="card-footer card-tile">
      <div className="row">
        <div className="col-xs-6 ml-3">
          <EditRecipeButton
            setEditRecipeId={() => setEditRecipeId(id)}
          />
          <EditModal />
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
          className="fa fa-heart fa-2x btn-white"
          aria-hidden="true"
        >
          <span className="small pr-2">{favorites}
          </span>
        </i>
        <i
          className="fa fa-thumbs-up fa-2x ml-5 btn-white"
          aria-hidden="true"
        >
          <span className="small pr-2">{upvotes}
          </span>
        </i>
        <i
          className="fa fa-thumbs-down fa-2x btn-white"
          aria-hidden="true"
        >
          <span className="small pr-2">
            {downvotes}
          </span>
        </i>
      </li>
    </ul>
  );

  return component;
};

export default RecipeCardFooter;
