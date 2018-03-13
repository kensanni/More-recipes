import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description functional component to render downvote button
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const DownVoteButton = (props) => {
  const { downvoteRecipe, recipeId, downvotes } = props;
  return (
    <div>
      <button className="btn btn-orange mr-2" type="button">
        <i
          className="fa fa-thumbs-down fa-2x btn-white"
          aria-hidden="true"
          onClick={() => downvoteRecipe(recipeId)}
        />
      </button>
      <span className="mr-2">
        {downvotes}
      </span>
    </div>
  );
};

DownVoteButton.propTypes = {
  downvoteRecipe: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired
};

export default DownVoteButton;
