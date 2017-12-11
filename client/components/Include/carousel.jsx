import React from 'react';
import photo1 from '../../public/images/banner-img-1.jpg';
import photo2 from '../../public/images/banner-img-2.jpg';
import photo13 from '../../public/images/banner-img-4.jpg';

const Carousel = () => {
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 img-fluid"
              src={photo1}
              alt="First slide"
            />
            <div
              className="carousel-caption d-none d-md-block"
            >
              <h3>
                More-Recipes is a platform for users
                to share the awesome
                and exciting recipe ideas they have invented or learnt
              </h3>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 img-fluid"
              src={photo13}
              alt="Second slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>
                More-Recipes is a platform for users
                to share the awesome and exciting recipe
                ideas they have invented or learnt
              </h3>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100 img-fluid"
            src={photo2}
            alt="Third slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h3>
              More-Recipes is a platform for users
              to share the awesome and exciting recipe ideas t
              hey have invented or learnt
            </h3>
          </div>
        </div>
      </div>
      <div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Carousel;
