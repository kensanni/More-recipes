import React from 'react';
import { shallow } from 'enzyme';
import RecipeDetailsCard from '../../../../../components/Include/cards/RecipeDetailsCard';

describe('Recipe details card component', () => {
  it('matches snapshot', () => {
    const props = {
      recipeData: {
        recipeDetails: {
          id: '', name: '', description: '', ingredient: '', image: '', downvotes: '', upvotes: '', favorites: '',
        }
      },
      value: {}
    };
    const output = shallow(<RecipeDetailsCard {...props} />);
    expect(output).toMatchSnapshot();
  });
  it('calls onClick', () => {
    const props = {
      value: {},
      onEditClicked: jest.fn(),
      recipeData: {
        recipeDetails: {
          id: '', name: '', description: '', ingredient: '', image: '', downvotes: '', upvotes: '', favorites: ''
        }
      },
      addReview: jest.fn()
    };
    const output = shallow(<RecipeDetailsCard {...props} />);
    const button = output.find('button[type="button"]');
    button.simulate('click');
    expect(props.addReview).toHaveBeenCalled();
  });
});
