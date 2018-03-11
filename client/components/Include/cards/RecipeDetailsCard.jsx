import React from 'react';
import PropTypes, { any } from 'prop-types';
import DownVoteButton from '../buttons/DownVoteButton';
import UpVoteButton from '../buttons/UpVoteButton';
import FavoriteButton from '../buttons/FavoriteButton';

const RecipeDetailsCard = (props) => {
  const {
    recipeData,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    onChange,
    reviews,
    value,
    addReview
  } = props;
  const {
    id, name, description, ingredient, image, downvotes, upvotes, favorites
  } = recipeData.recipeDetails;
  return (
    <div>
      <div className="card mt-5">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <div>
                <img className="img img-fluid img-thumbnail img-width" src={image} alt="" />
                <h1 className="text-center">{name}</h1>
              </div>
            </div>
          </div>
          <div className="row">
            {ingredient.split(',').map((ingredients, i) => (
              <li
                className="col-sm-6"
                key={i}
              >
                {ingredients}
              </li>
                ))}
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ol>
                {
                  description.split('\n').map((descriptions, i) => (
                    <li key={i}>
                      {description}
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 inline-button">
              <UpVoteButton
                upvoteRecipe={upvoteRecipe}
                recipeId={id}
                upvotes={upvotes}
              />
              <DownVoteButton
                downvoteRecipe={downvoteRecipe}
                recipeId={id}
                downvotes={downvotes}
              />
              <FavoriteButton
                favoriteRecipe={favoriteRecipe}
                recipeId={id}
                favorites={favorites}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-3">
              <h2 className="header-bg">Reviews</h2>
              {
                props.reviews && !props.reviews.length &&
                <h6 style={{ textAlign: 'center' }}>This recipe have not been reviewed</h6>
              }
              {
                props.reviews && <ul style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                  {
                  props.reviews.map((review, i) => (
                    <li key={i} className="review-list">
                      <div>
                        <div >
                          <div className="header">
                            <strong className="primary-font">{review.username}</strong>
                          </div>
                          <p>
                            { review.review }
                          </p>
                          <hr />
                        </div>
                      </div>
                    </li>
                  ))
                }
                                 </ul>
              }
            </div>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="comment">Post a comment</label>
              <textarea
                name="review"
                onChange={onChange}
                value={value.review}
                className="form-control"
                rows="5"
              />
              <button
                type="button"
                className="btn btn-orange rfloat mt-3"
                onClick={() => addReview(id)}
              >
             Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeDetailsCard.propTypes = {
  recipeData: PropTypes.objectOf(any).isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  favoriteRecipe: PropTypes.func.isRequired,
};

export default RecipeDetailsCard;
