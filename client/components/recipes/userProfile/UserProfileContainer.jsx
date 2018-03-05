import React, { Component } from 'react';
import miniToastr from 'mini-toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import ReactPaginate from 'react-paginate';
import getFavoriteRecipeAction from '../../../actionController/getFavoriteRecipe';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import FavoriteRecipeTitle from '../../../components/Include/FavoriteRecipeTitle';
import UserProfile from './UserProfile';
import RecipeGrid from '../../recipes/RecipeGrid';
import upvoteRecipeAction from '../../../actionController/upvoteRecipe';
import downvoteRecipeAction from '../../../actionController/downvoteRecipe';
import favoriteRecipeAction from '../../../actionController/favoriteRecipe';


/**
 * @class UserProfileContainer
 *
 * @description container display user profile and favorited recipe of a user
 */
class UserProfileContainer extends Component {
  /**
   * @description create an instance of UserProfileContainer
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.upvoteRecipe = this.upvoteRecipe.bind(this);
    this.downvoteRecipe = this.downvoteRecipe.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  /**
   * @description call the action to display user favorite recipe
   *
   * @param {props} props
   *
   * @return {undefined} call getRecipe
   */
  componentDidMount() {
    const { userId, page } = this.props;
    this.props.getFavoriteRecipeAction(userId, page);
    console.log('userId', this.props.page);
  }
  /**
   * @description upvote a recipe
   *
   * @param {id} id id of recipe to be upvoted
   *
   * @return {void} calls upvoteRecipeAction
   */
  upvoteRecipe(id) {
    this.props.upvoteRecipeAction(id);
  }

  /**
   * @description downvote a recipe
   *
   * @param {id} id id of recipe to be updated
   *
   * @return {undefined} calls downvoteRecipeAction
   */
  downvoteRecipe(id) {
    if (this.props.authenticated) {
      return this.props.downvoteRecipeAction(id);
    }
    miniToastr.init();
    return miniToastr.error('Login to continue');
  }

  /**
   * @description favorite a recipe
   *
   * @param {id} id - id of recipe to be favorited
   *
   * @return {undefined} calls favoriteRecipeAction
   */
  favoriteRecipe(id) {
    this.props.favoriteRecipeAction(id);
  }

  handlePaginationChange(favoriteRecipes) {
    const { userId } = this.props;
    this.props.getFavoriteRecipeAction(userId, favoriteRecipes.selected);
  }


  /**
   * @description render - display component
   *
   * @return {JSX} return JSX
   */
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <UserProfile
            userData={this.props.userData}
          />
          <FavoriteRecipeTitle />
          <section className="row">
            {
             this.props.favoriteRecipes.isFetched ?
               <RecipeGrid
                 recipeData={this.props.favoriteRecipes.recipeData.data}
                 upvoteRecipe={this.upvoteRecipe}
                 downvoteRecipe={this.downvoteRecipe}
                 favoriteRecipe={this.favoriteRecipe}
               />
            :
               <h1 style={{ marginTop: '150px' }}>I am Loading</h1>
        }
          </section>
        </div>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel={<a href="">...</a>}
          breakClassName="page-link"
          onPageChange={this.handlePaginationChange}
          pageCount={this.props.page}
          containerClassName="pagination justify-content-center"
          pageLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          disabledClassName="disabled"
          pageClassName="page-item"
          previousClassName="page-item"
          nextClassName="page-item"
          activeClassName="active"
          subContainerClassName="pages pagination"
        />
        <Footer />
      </div>
    );
  }
}

UserProfileContainer.propTypes = {
  upvoteRecipeAction: PropTypes.func.isRequired,
  downvoteRecipeAction: PropTypes.func.isRequired,
  favoriteRecipeAction: PropTypes.func.isRequired,
  getFavoriteRecipeAction: PropTypes.func.isRequired,
  favoriteRecipes: PropTypes.objectOf(any).isRequired,
  authenticated: PropTypes.bool.isRequired,
  userData: PropTypes.objectOf(any).isRequired,
  userId: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.authReducer.isAuthenticated,
  recipes: state.recipeReducer,
  userId: state.authReducer.userData.id,
  page: state.getFavoriteRecipeReducer.page,
  userData: state.authReducer.userData,
  favoriteRecipes: state.getFavoriteRecipeReducer
});
/**
 * @description make actions available to AllRecipes as props
 *
 * @param {dispatch} dispatch
 *
 * @returns {undefined} call bindActionCreators function
 */
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    upvoteRecipeAction,
    downvoteRecipeAction,
    favoriteRecipeAction,
    getFavoriteRecipeAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
