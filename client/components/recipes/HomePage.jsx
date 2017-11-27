import React from 'react';
import IndexHeader from '../common/IndexHeader';
import Carousel from '../Include/carousel';
import IndexMain from '../Include/IndexMain';
import IndexFooter from '../common/IndexFooter';

const HomePage = () => {
  return (
    <div>
      <IndexHeader />
      <Carousel />
      <IndexMain />
      <IndexFooter />
    </div>
  );
};

export default HomePage;
