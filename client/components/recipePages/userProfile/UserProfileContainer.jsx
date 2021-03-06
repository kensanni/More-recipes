import React, { Component } from 'react';
import miniToastr from 'mini-toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes, { any } from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Lines } from 'react-preloading-component';
import { validateToken } from '../../../Helpers/helper';
import getFavoriteRecipeAction from '../../../actionController/getFavoriteRecipe';
import getUserRecipeAction from '../../../actionController/getUserRecipe';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import FavoriteRecipeTitle from '../../../components/Include/FavoriteRecipeTitle';
import UserProfile from './UserProfile';
import RecipeGrid from '../../recipePages/RecipeGrid';
import upvoteRecipeAction from '../../../actionController/upvoteRecipe';
import downvoteRecipeAction from '../../../actionController/downvoteRecipe';
import favoriteRecipeAction from '../../../actionController/favoriteRecipe';


/**
 * @class UserProfileContainer
 *
 * @description container displaying user profile and favorited recipe of a user
 */
 export class UserProfileContainer extends Component {
  /**
   * @description create an instance of UserProfileContainer
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.upvoteRecipe = this.upvoteRecipe.bind(this);
    this.downvoteRecipe = this.downvoteRecipe.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.renderFavoriteRecipeGrid = this.renderFavoriteRecipeGrid.bind(this);
  }
  /**
   * @description call the action to display user favorite recipe
   *
   * @param {object} props
   *
   * @return {void} call action creator
   */
  componentDidMount() {
    const { userId } = this.props;
    if (this.props.authenticated && validateToken() !== 'Session expired') {
      this.props.getUserRecipeAction(userId, 0);
      this.props.getFavoriteRecipeAction(userId, 0);
      return;
    }
    this.props.history.push('/recipes');
    miniToastr.init();
    return miniToastr.error('Login to continue');
  }
  /**
   * @description upvote a recipe
   *
   * @param {number} id id of recipe to be upvoted
   *
   * @return {void} calls upvoteRecipeAction
   */
  upvoteRecipe(id) {
    this.props.upvoteRecipeAction(id);
  }

  /**
   * @description downvote a recipe
   *
   * @param {number} id id of recipe to be updated
   *
   * @return {void} calls downvoteRecipeAction
   */
  downvoteRecipe(id) {
    this.props.downvoteRecipeAction(id);
  }

  /**
   * @description favorite a recipe
   *
   * @param {number} id - id of recipe to be favorited
   *
   * @return {void} calls favoriteRecipeAction
   */
  favoriteRecipe(id) {
    this.props.favoriteRecipeAction(id);
  }

  /**
   * @description get favorite recipes to be displayed on the new page
   *
   * @param {object} favoriteRecipes
   *
   * @return {void} calls favoriteRecipeAction
   */
  handlePaginationChange(favoriteRecipes) {
    const { userId } = this.props;
    this.props.getFavoriteRecipeAction(userId, favoriteRecipes.selected);
  }

  /**
   * @description display a favorite recipe grid based on input
   *
   * @returns {JSX} return jsx
   */
  renderFavoriteRecipeGrid() {
    const { favoriteRecipes } = this.props;
    return (
      <div className="row">
        { favoriteRecipes.recipeData.data &&
          this.props.favoriteRecipes.recipeData.data.length === 0 ?
            <div className="col-sm-12">
              <h1 className="text-center pt-5">No recipe has been favorited</h1>
            </div> :
            <RecipeGrid
              recipes={this.props.favoriteRecipes.recipeData.data}
              upvoteRecipe={this.upvoteRecipe}
              downvoteRecipe={this.downvoteRecipe}
              favoriteRecipe={this.favoriteRecipe}
            />
      }
      </div>
    );
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
            favoriteCount={this.props.favoriteCount}
            recipeCount={this.props.recipeCount}
          />
          <FavoriteRecipeTitle />
          <section>
            {
             !this.props.favoriteRecipes.isFetched ? <Lines /> :
              this.renderFavoriteRecipeGrid()
        }
          </section>
        </div>
        {
          this.props.favoriteRecipes.recipeData.data &&
          this.props.favoriteRecipes.recipeData.data.length === 0 ? null :
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
        }
        <Footer />
      </div>
    );
  }
}

UserProfileContainer.defaultProps = {
  recipeCount: undefined,
  favoriteCount: undefined
};

UserProfileContainer.propTypes = {
  upvoteRecipeAction: PropTypes.func.isRequired,
  downvoteRecipeAction: PropTypes.func.isRequired,
  favoriteRecipeAction: PropTypes.func.isRequired,
  getFavoriteRecipeAction: PropTypes.func.isRequired,
  favoriteRecipes: PropTypes.objectOf(any).isRequired,
  authenticated: PropTypes.bool.isRequired,
  userData: PropTypes.objectOf(any).isRequired,
  userId: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  getUserRecipeAction: PropTypes.func.isRequired,
  favoriteCount: PropTypes.number,
  recipeCount: PropTypes.number,
  history: PropTypes.objectOf(any).isRequired
};

const mapStateToProps = state => ({
  authenticated: state.authReducer.isAuthenticated,
  recipes: state.recipeReducer,
  userId: state.authReducer.userData.id,
  page: state.getFavoriteRecipeReducer.page,
  userData: state.authReducer.userData,
  favoriteRecipes: state.getFavoriteRecipeReducer,
  favoriteCount: state.getFavoriteRecipeReducer.count,
  recipeCount: state.getUserRecipeReducer.count
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
    getFavoriteRecipeAction,
    getUserRecipeAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
