import React from 'react';
import { shallow } from 'enzyme';
import { RecipeDetailPageContainer } from '../../../../components/recipePages/userRecipes/RecipeDetailPageContainer';
import localStorage from '../../../__mocks__/localStorage';

window.localStorage = localStorage;
describe('Recipe details page component', () => {
  it('matches snapshot', () => {
    const props = {
      match: {
        params: {}
      },
      history: {
        push: jest.fn()
      },
      signOutAction: jest.fn()
    };
    const output = shallow(<RecipeDetailPageContainer {...props} />);
    expect(output).toMatchSnapshot();
  });
  describe('instance and lifecycle methods', () => {
    const props = {
      match: {
        params: {}
      },
      history: { push: jest.fn() },
      push: jest.fn(),
      signOutAction: jest.fn(),
      upvoteRecipeAction: jest.fn(),
      downvoteRecipeAction: jest.fn(),
      favoriteRecipeAction: jest.fn(),
      authenticated: true
    };
    it('handle upvote recipe else condition', () => {
      const wrapper = shallow(<RecipeDetailPageContainer {...props} />);
      wrapper.setProps({ authenticated: false });
      wrapper.instance().upvoteRecipe();
      expect(props.upvoteRecipeAction).not.toBeCalled();
    });

    it('handles upvote recipe', () => {
      const wrapper = shallow(<RecipeDetailPageContainer {...props} />);
      wrapper.instance().upvoteRecipe();
      expect(props.upvoteRecipeAction).toBeCalled();
    });
    it('handle downvote recipe else condition', () => {
      const wrapper = shallow(<RecipeDetailPageContainer {...props} />);
      wrapper.setProps({ authenticated: false });
      wrapper.instance().downvoteRecipe();
      expect(props.downvoteRecipeAction).not.toBeCalled();
    });
    it('handles downvote recipe', () => {
      const wrapper = shallow(<RecipeDetailPageContainer {...props} />);
      wrapper.instance().downvoteRecipe();
      expect(props.downvoteRecipeAction).toBeCalled();
    });
    it('handles favorite recipe', () => {
      const wrapper = shallow(<RecipeDetailPageContainer {...props} />);
      wrapper.instance().favoriteRecipe();
      expect(props.favoriteRecipeAction).toBeCalled();
    });
    it('handleChanges', () => {
      const wrapper = shallow(<RecipeDetailPageContainer {...props} />);
      const setState = jest.spyOn(wrapper.instance(), 'setState');
      wrapper.instance().handleReviewChange({ target: { name: 'review', value: '' } });
      expect(setState).toHaveBeenCalledWith({ review: '' });
    });
  });
});
