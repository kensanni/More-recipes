import React from 'react';
import { shallow } from 'enzyme';
import { UserRecipes } from '../../../../components/recipePages/userRecipes/UserRecipes';

describe('Recipe details page component', () => {
  it('matches snapshot', () => {
    const props = {
      history: {
        push: jest.fn()
      }
    };
    const output = shallow(<UserRecipes {...props} />);
    expect(output).toMatchSnapshot();
  });
  describe('instance and lifecycle methods', () => {
    const props = {
      getUserRecipe: jest.fn(),
      addRecipeAction: jest.fn(),
      editRecipeAction: jest.fn(),
      clearImageAction: jest.fn(),
      deleteRecipeAction: jest.fn(),
      setEditRecipeIdAction: jest.fn(),
      saveImageToCloudAction: jest.fn(),
      history: {
        push: jest.fn()
      },
      addRecipeResponse: {},
      recipes: {
        recipeData: ''
      }
    };
    it('calls componentWillRecieveProps', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      const cwrp = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({ addRecipeResponse: { errorMessage: 'error message' }, });
      expect(cwrp).toHaveBeenCalled();
    });
    it('handleChange', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      const setState = jest.spyOn(wrapper.instance(), 'setState');
      wrapper.instance().handleChange({ target: { name: 'description', value: '' } });
      expect(setState).toHaveBeenCalledWith({ description: '', isChanged: true });
    });
    it('handleAddRecipe', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      wrapper.instance().addRecipe({ preventDefault: jest.fn() });
      expect(props.addRecipeAction).toBeCalled();
    });
    it('handles clearImageState', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      wrapper.instance().clearImageState();
      expect(props.clearImageAction).toBeCalled();
    });
    it('handles deleteRecipe', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      wrapper.instance().deleteRecipe();
      expect(props.deleteRecipeAction).toBeCalled();
    });
    it('handles setEditRecipeId', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      wrapper.instance().setEditRecipeId();
      expect(props.setEditRecipeIdAction).toBeCalled();
    });
    it('handles handlePaginationChange', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      wrapper.instance().handlePaginationChange({ recipes: {} });
      expect(props.getUserRecipe).toBeCalled();
    });
    it('handles editRecipe', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      wrapper.instance().editRecipe();
      expect(props.editRecipeAction).toBeCalled();
    });
    it('handles saveImageToCloud', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      wrapper.instance().saveImageToCloud({ target: { files: [{ image: 'recipe' }] } });
      expect(props.saveImageToCloudAction).toBeCalled();
    });
  });
});
