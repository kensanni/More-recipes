import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { bindActionCreators } from 'redux';
import addRecipeAction from '../../../actionController/addRecipe';
import AddRecipe from './AddRecipe';
import saveImageToCloudAction from '../../../actionController/saveImageToCloud';
import UserRecipesCard from './UserRecipesCard';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

/**
 * @class UserRecipes
 *
 * @description UserRecipes
 */
class UserRecipes extends Component {
  /**
   * @description create an instance of UserRecipes
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeData: [],
      isFetched: false,
      name: '',
      isChanged: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveImageToCloud = this.saveImageToCloud.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  /**
   * @description update the state of user recipes
   *
   * @param {nextProps} nextProps
   *
   * @return {undefined} updated user recipe
   */
  componentWillReceiveProps(nextProps) {
    const { recipeImageUrl, recipes } = nextProps;
    const { recipeData, isFetched } = recipes;
    if (recipeData !== this.props.recipes.recipeData) {
      this.setState({
        recipeData,
        isFetched
      });
    }
    if (recipeImageUrl !== this.props.recipeImageUrl) {
      this.setState({
        image: recipeImageUrl
      });
    }
  }

  /**
   * @description set the state of value inputs on form
   *
   * @param {event} event
   *
   * @returns {undefined} set the state of value inputs on form
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isChanged: true
    });
  }

  /**
   * @description function to add a recipe
   *
   * @param {event} event
   *
   * @returns {undefined} calls add recipe action
   */
  addRecipe(event) {
    event.preventDefault();
    const {
      name, image, description, ingredient
    } = this.state;
    const newRecipe = {
      name, image, description, ingredient
    };
    this.props.addRecipeAction(newRecipe);
    this.setState({
      name: '', image: '', description: '', ingredient: ''
    });
  }
  /**
   * @description upload Image to cloud
   *
   * @param {event} event
   *
   * @returns {undefined} call saveImageToCloudAction to save images
   */
  saveImageToCloud(event) {
    const image = event.target.files[0];
    if (image) {
      this.props.saveImageToCloudAction(image);
    }
  }
  /**
   * @description render user recipes
   *
   * @returns {JSX} JSX
   */
  render() {
    let renderUserRecipes = <h1>No recipes in your catalog</h1>;
    if (this.state.isFetched) {
      renderUserRecipes = this.state.recipeData.map((recipeData, key) => (
        <UserRecipesCard
          key={recipeData.id}
          cardId={key}
          recipeData={recipeData}
          addRecipe={this.addRecipe}
          value={this.state}
        />
      ));
    }
    return (
      <div>
        <Header />
        <div className="container">
          <div className="top-nav-bar">
            <AddRecipe
              value={this.state}
              onChange={this.handleChange}
              addRecipe={this.addRecipe}
              saveImageToCloud={this.saveImageToCloud}
            />

          </div>
          <div className="row">
            {this.state.isFetched && renderUserRecipes}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
UserRecipes.propTypes = {
  addRecipeAction: PropTypes.func.isRequired,
  recipeImageUrl: PropTypes.string.isRequired,
  saveImageToCloudAction: PropTypes.func.isRequired,
};

/**
 * @description allow state to be available to UserRecipes class as props
 * @param {state} state
 * @returns {object} object
 */
const mapStateToProps = state => ({
  userId: state.signinReducer[0].userData.id,
  recipeImageUrl: state.saveImageToCloud[0].image
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addRecipeAction,
    saveImageToCloudAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
