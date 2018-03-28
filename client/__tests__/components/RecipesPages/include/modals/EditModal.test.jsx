import React from 'react';
import { shallow } from 'enzyme';
import { EditModal } from '../../../../../components/Include/modals/EditModal';
import mockData from '../../../../__mocks__/recipeData.json';

const {
  addRecipe
} = mockData.Recipes;

describe('Edit modal component', () => {
  it('matches snapshot', () => {
    const props = {
      editRecipeStatus: '',
    };
    const output = shallow(<EditModal {...props} />);
    expect(output).toMatchSnapshot();
  });
  describe('instance and lifecycle methods', () => {
    const props = {
      editRecipeAction: jest.fn(),
      saveImageToCloudAction: jest.fn(),
      image: '',
      editRecipeStatus: false,
    };
    // const state = {
    //   recipe: {
    //     id: 6,
    //     name: Coke,
    //     description: cook for 10mins,
    //     ingredient: bla,
    //     views: 0,
    //     image: rice,
    //     userId: 4,
    //     upvotes: 0,
    //     downvotes: 0,
    //     favorites: 1,
    //   }
    // };
    it('calls componentWillRecieveProps', () => {
      const wrapper = shallow(<EditModal {...props} />);
      const cwrp = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({ image: 'image' });
      expect(cwrp).toHaveBeenCalled();
    });
    it('handleEditRecipeChanges', () => {
      const wrapper = shallow(<EditModal {...props} />);
      wrapper.setState({ recipe: null });
      const setState = jest.spyOn(wrapper.instance(), 'setState');
      wrapper.instance().editChangeHandler({ target: { name: 'description', value: '' } });
      expect(setState).toHaveBeenCalledWith({
        recipe: {
          description: '', image: '', ingredient: '', name: ''
        }
      });
    });
    it('handles edit recipe submission', () => {
      const wrapper = shallow(<EditModal {...props} />);
      wrapper.setState({ recipe: addRecipe });
      wrapper.instance().onSubmit();
      expect(props.editRecipeAction).toBeCalled();
    });
    it('handles saveImageToCloud', () => {
      const wrapper = shallow(<EditModal {...props} />);
      wrapper.instance().saveImageToCloud({ target: { files: [{ image: 'recipe' }] } });
      expect(props.saveImageToCloudAction).toBeCalled();
    });
  });
});
