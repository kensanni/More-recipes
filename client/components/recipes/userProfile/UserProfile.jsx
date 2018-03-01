import React from 'react';

const UserProfile = props => (
  <div className="row pb-3">
    <div className="col-sm-12 profile-bg user-profile">
      <img className="img-fluid rounded-circle" src="../image/avatar.png" alt="avatar" />
      <h3>Sannikay</h3>
      <p>recipe added: 20
        <span className="vl user-text" />
        <span>email: kensanni@gmail.com </span>
        <span className="vl user-text">favorite recipe: 20</span>
      </p>
    </div>
  </div>
);

export default UserProfile;
