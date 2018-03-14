import React from 'react';
import PropTypes, { any } from 'prop-types';
import DownVoteButton from '../buttons/DownVoteButton';
import UpVoteButton from '../buttons/UpVoteButton';
import FavoriteButton from '../buttons/FavoriteButton';

/**
 * @description functional component to render recipe details page
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const RecipeDetailsCard = (props) => {
  const {
    recipeData,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    onChange,
    reviews,
    value,
    addReview,
  } = props;
  const {
    id, name, description, ingredient, image, downvotes, upvotes, favorites,
  } = recipeData.recipeDetails;
  const time = timeCreated => new Date(timeCreated).toLocaleString();
  return (
    <div>
      <div className="card mt-5">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <div>
                <img className="img img-fluid img-thumbnail img-width" src={image} alt="" />
                <h1 className="text-center pt-3">{name}</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <p>Ingredient</p>
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
              <p className="pt-3">Directions</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ol>
                {
                  description.split('\n').map((descriptions, i) => (
                    <li key={i}>
                      {descriptions}
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
                reviews && !reviews.length &&
                <h6 style={{ textAlign: 'center' }}>This recipe have not been reviewed</h6>
              }
              {
                reviews &&
                <ul style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                  {
                  props.reviews.map((review, i) => (
                    <div key={i} className="review-list">
                      <div>
                        <div >
                          <div className="header">
                            <strong className="primary-font">{review.username}</strong>
                          </div>
                          <p>
                            { review.review }
                          </p>
                          <small className="small">{time(review.createdAt)}</small>
                          <hr />
                        </div>
                      </div>
                    </div>
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
  onChange: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(any).isRequired,
  value: PropTypes.objectOf(any).isRequired,
  addReview: PropTypes.func.isRequired
};

export default RecipeDetailsCard;
