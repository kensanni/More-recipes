import React from 'react';
import avatar from '../../../public/images/avatar.png';

const UserProfile = (props) => {
  const { email, username } = props.userData;
  const { favoriteCount, recipeCount } = props
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

export default UserProfile;
