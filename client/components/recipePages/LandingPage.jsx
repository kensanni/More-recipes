import React from 'react';
import IndexHeader from '../common/IndexHeader';
import Carousel from '../Include/carousel';
import IndexMain from '../Include/IndexMain';
import IndexFooter from '../common/IndexFooter';

/**
 * @description functional component to render the landing page
 *
 * @returns {JSX} return JSX
 */
const LandingPage = () => (
  <div>
    <IndexHeader />
    <Carousel />
    <IndexMain />
    <IndexFooter />
  </div>
);


export default LandingPage;
