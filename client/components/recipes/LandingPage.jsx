import React from 'react';
import Header from '../common/Header';
import Carousel from '../Include/carousel';
import IndexMain from '../Include/IndexMain';
import IndexFooter from '../common/IndexFooter';

/**
 * @description render landing page
 *
 * @returns {JSX} return JSX
 */
const LandingPage = () => ((
  <div>
    <Header />
    <Carousel />
    <IndexMain />
    <IndexFooter />
  </div>
));

export default LandingPage;
