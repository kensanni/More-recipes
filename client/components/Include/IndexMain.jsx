import React from 'react';

const IndexMain = () => {
  return (
    <div className="container">
      <main className="row">
        <div className="col-sm-12 col-md-12 headline text-center">
          <h1 className="heading">
            Share your amazing recipe with the world
          </h1>
          <h6 className="brief">
            More-recipe is built to allow users,
            share their amazing recipe
           and learn new recipes from different part of the world.
          </h6>
          <div className="quick-access">
            <a href="./html/signnup.html">
              <button className="btn btn-create">
                Create an account
              </button>
            </a>
            <p className="text-inline">
              Already on More-recipes?
              <a href="./html/signin.html">Sign in</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexMain;
