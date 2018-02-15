import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import { filter } from 'lodash';
import getUserRecipe from '../../../actionController/getUserRecipe';
import addRecipeAction from '../../../actionController/addRecipe';
import saveImageToCloudAction from '../../../actionController/saveImageToCloud';
import AddRecipe from './AddRecipe';
import deleteRecipeAction from '../../../actionController/deleteRecipe';
import editRecipeAction from '../../../actionController/editRecipe';
import UserRecipesCard from './UserRecipesCard';
import Header from '../../common/Header';
import Footer from '../../common/Footer';


/**
 * @class UserRecipes
 * @description UserRecipes
 */
class UserRecipes extends Component {
  /**
   * @description create an instance of UserRecipes
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeData: [],
      isFetched: false,
      recipe: [],
      name: '',
      isChanged: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.saveImageToCloud = this.saveImageToCloud.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.handleShowRecipe = this.handleShowRecipe.bind(this);
  }
  /**
   * @description check the state of isFetched and call the get recipe action
   * @param {*} props
   * @return {*} return all recipes
   */
  componentDidMount() {
    if (this.props.recipes.isFetched === false) {
      this.props.getUserRecipe(this.props.userId);
    }
  }

  /**
   * @description update the state of user recipes
   * @param {*} nextProps
   * @return {*} updated user recipe
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
   * @description ui
   * @param {recipeData id} recipeData id
   * @return {null} l
   */
  editRecipe(id, recipeData) {
    console.log("@@@@@@@@@@@@@@", recipeData);
    event.preventDefault();
    this.props.editRecipeAction(id, recipeData);
  }

  /**
   * @description ui
   * @param {id} id
   * @return {null} l
   */
  deleteRecipe(id) {
    this.props.deleteRecipeAction(id);
  }

  /**
   * @description ui
   * @param {event} event
   * @return {null} l
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isChanged: true
    });
  }

  handleShowRecipe(recipeId) {
    const recipe = filter(this.state.recipeData, recipe => recipe.id === recipeId)
    this.setState({
      recipe
    })
  }

  /**
   * @description ui
   * @param {event} event
   * @return {null} l
   */
  addRecipe(event) {
    event.preventDefault();
    const {
      name,
      image,
      description,
      ingredient
    } = this.state;
    const newRecipe = {
      name,
      image,
      description,
      ingredient
    };
    this.props.addRecipeAction(newRecipe);
    this.setState({
      name: '', image: '', description: '', ingredient: ''
    });
  }

  /**
   * @description ui
   * @param {event} event
   * @return {null} l
   */
  saveImageToCloud(event) {
    const image = event.target.files[0];
    if (image) {
      this.props.saveImageToCloudAction(image);
    }
  }
  /**
   * @description render user recipes
   * @return {*} wfdgsfd
   */
  render() {
    let renderUserRecipes = <h1>No recipes in your catalog</h1>;
    if (this.state.isFetched) {
      renderUserRecipes = this.state.recipeData.map((recipeData, key) => (
        <UserRecipesCard
          key={key}
          cardId={key}
          recipeData={recipeData}
          showRecipeDetails={this.handleShowRecipe}
          deleteRecipe={this.deleteRecipe}
          editRecipe={this.editRecipe}
          addRecipe={this.addRecipe}
          value={this.state}
          onChange={this.handleChange}
          saveImageToCloud={this.saveImageToCloud}
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
  getUserRecipe: PropTypes.func.isRequired,
  addRecipeAction: PropTypes.func.isRequired,
  deleteRecipeAction: PropTypes.func.isRequired,
  editRecipeAction: PropTypes.func.isRequired,
  recipes: PropTypes.objectOf(any).isRequired,
  // recipeImageUrl: PropTypes.string.isRequired,
  saveImageToCloudAction: PropTypes.func.isRequired,
  // userId: PropTypes.objectOf(any).isRequired,
};

const mapStateToProps = state => ({
  recipes: state.getUserRecipeReducer[0],
  userId: state.signinReducer[0].userData.id,
  recipeImageUrl: state.saveImageToCloud[0].image
});

export default connect(mapStateToProps, {
  getUserRecipe,
  addRecipeAction,
  deleteRecipeAction,
  editRecipeAction,
  saveImageToCloudAction
})(UserRecipes);
