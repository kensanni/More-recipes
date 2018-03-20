import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import deleteRecipeAction from '../../actionController/deleteRecipe';
import * as actions from '../../actions/deleteRecipeAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const recipeId = 9;

describe('Delete recipe Action', () => {
  describe('Initiate delete recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipe = {};
      const actionResults = actions.deleteRecipeRequest(recipe);
      expect(actionResults).toEqual({
        type: actions.DELETE_RECIPE_REQUEST,
        recipe,
        isDeleted: false,
      });
    });
  });
  describe('Receive delete recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = '';
      const recipeId = null;
      const actionResults = actions.deleteRecipeSuccessful(responseMessage, recipeId);
      expect(actionResults).toEqual({
        type: actions.DELETE_RECIPE_SUCCESSFUL,
        responseMessage,
        recipeId,
        isDeleted: true
      });
    });
  });
  describe('Receive delete recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.deleteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.DELETE_RECIPE_ERROR,
        errorMessage,
        isDeleted: false,
      });
    });
  });
});

describe('Async action', () => {
  let store;

  beforeEach(() => {
    moxios.install(instance);
    store = mockStore();
  });

  afterEach(() => {
    moxios.uninstall();
  });


  describe('Delete recipe', () => {
    it('dispatches successful action for a successful request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Recipe successfully deleted',
          }
        });
      });

      const expectedActions = [
        actions.deleteRecipeRequest(recipeId),
        actions.deleteRecipeSuccessful('Recipe successfully deleted', recipeId)
      ];

      await store.dispatch(deleteRecipeAction(recipeId));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches error for a failed request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          data: {
            errors: [
              {
                message: 'recipe doesn\'t exist in your catalog'
              }
            ]
          }
        }
      });
    });

    const expectedActions = [
      actions.deleteRecipeRequest(0),
      actions.deleteRecipeError('recipe doesn\'t exist in your catalog')
    ];

    await store.dispatch(deleteRecipeAction(0));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
