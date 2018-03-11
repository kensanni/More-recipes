import React from 'react';
import PropTypes, { any } from 'prop-types';
import avatar from '../../../public/images/avatar.png';

/**
 * @description functional component to render user profile section
 *
 * @param {object} props
 *
 * @returns {JSX} return JSX
 */
const UserProfile = (props) => {
  const { email, username } = props.userData;
  const { favoriteCount, recipeCount } = props;
  return (
    <div className="row mt-5 pb-3">
      <div className="col-sm-12 profile-bg user-profile">
        <img
          className="img-fluid rounded-circle"
          src={avatar}
          alt="avatar"
        />
        <h3>{username}</h3>
        <p>recipe added: {recipeCount}
          <span className="vl ml-2 user-text" />
          <span>email: {email}</span>
          <span className="vl ml-2 user-text">favorite recipe: {favoriteCount} </span>
        </p>
      </div>
    </div>
  );
};

UserProfile.defaultProps = {
  favoriteCount: undefined,
  recipeCount: undefined
};

UserProfile.propTypes = {
  userData: PropTypes.objectOf(any).isRequired,
  favoriteCount: PropTypes.number,
  recipeCount: PropTypes.number
};

export default UserProfile;
