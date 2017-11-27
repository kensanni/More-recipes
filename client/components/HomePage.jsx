import React from 'react';
import Header from './Header';
import photo from '../public/images/banner-img-1.jpg';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container pt-4">
        <div className="row">
          <section className="col-md-12">
            <h1 className="title">
              Favorite recipes
            </h1>
            <div>
              <hr />
            </div>
          </section>
          <div className="col-sm-6 col-md-4 pb-4">
            <div className="card">
              <img className="card-img-top" src={photo} alt="Recipe images" />
              <div className="card-body">
                <a href="./html/recipeDetail.html">
                  <h4 className="card-title">Pepper Soup with goat meat</h4>
                </a>
                <i className="fa fa-star rating-cl" aria-hidden="true" />
                <i className="fa fa-star rating-cl" aria-hidden="true" />
                <i className="fa fa-star rating-cl" aria-hidden="true" />
                <i className="fa fa-star rating-cl" aria-hidden="true" />
                <i className="fa fa-star rating-cl" aria-hidden="true" />
                <span className="small">12k</span>
                <p className="card-text pt-2">
                  Some quick example text to build on the card title
                  and make up the bulk of the cards content.
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item card-tile">
                  <i className="fa fa-heart fa-2x favorite-btn" aria-hidden="true" />
                  <i className="fa fa-thumbs-up fa-2x ml-5 favorite-btn" aria-hidden="true">
                    <span className="small pr-2">
                      1k
                    </span>
                  </i>
                  <i className="fa fa-thumbs-down fa-2x favorite-btn" aria-hidden="true">
                    <span className="small pr-2">
                      10
                    </span>
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
