import React from 'react';
import { shallow } from 'enzyme';
import { AllRecipes } from '../../../components/recipePages/AllRecipes';

describe('Landing page component', () => {
  it('matches snapshot', () => {
    const props = {
      getPopularRecipeAction: jest.fn(),
      getRecipeAction: jest.fn(),
      popularRecipes: {},
      recipes: {}
    };
    const output = shallow(<AllRecipes {...props} />);
    expect(output).toMatchSnapshot();
  });
  describe('instances and life cycle methods', () => {
    const props = {
      popularRecipes: {},
      recipes: {},
      getRecipeAction: jest.fn(),
      getPopularRecipeAction: jest.fn()
    };
    it('handlePaginationChanges', () => {
      const wrapper = shallow(<AllRecipes {...props} />);
      wrapper.instance().handlePaginationChange({ recipes: {} });
      expect(props.getRecipeAction).toBeCalled();
    });
  });
});
