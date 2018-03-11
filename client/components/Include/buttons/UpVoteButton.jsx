import React from 'react';
import PropTypes from 'prop-types';

const UpVoteButton = (props) => {
  const { upvoteRecipe, recipeId, upvotes } = props;
  return (
    <div>
      <button className="btn btn-orange mr-2" type="button">
        <i
          className="fa fa-thumbs-up fa-2x btn-white"
          aria-hidden="true"
          onClick={() => upvoteRecipe(recipeId)}
        />
      </button>
      <span className="mr-2">
        {upvotes}
      </span>
    </div>
  );
};

UpVoteButton.propTypes = {
  upvoteRecipe: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired,
  upvotes: PropTypes.number.isRequired
};

export default UpVoteButton;
