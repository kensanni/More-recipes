import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import editRecipeAction, { SET_EDIT_RECIPE_ID, setEditRecipeIdAction } from '../../actionController/editRecipe';
import mockData from '../__mocks__/recipeData.json';
import * as actions from '../../actions/editRecipeAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  addRecipe,
} = mockData.Recipes;

describe('Edit recipe Action', () => {
  describe('Initiate edit recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const recipeData = {};
      const actionResults = actions.editRecipeRequest(recipeId, recipeData);
      expect(actionResults).toEqual({
        type: actions.EDIT_RECIPE_REQUEST,
        recipeId,
        recipeData,
        isEdited: false,
      });
    });
  });
  describe('Receive edit recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeId = 2;
      const actionResults = actions.editRecipeSuccess(recipeId, addRecipe);
      expect(actionResults).toEqual({
        isEdited: true,
        type: actions.EDIT_RECIPE_SUCCESSFUL,
        recipeData: addRecipe,
        recipeId
      });
    });
  });
  describe('Receive edit recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.editRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.EDIT_RECIPE_ERROR,
        errorMessage,
        isEdited: false
      });
    });
  });
  describe('Check edit recipe status', () => {
    it('should create an action to check edit recipe status', () => {
      const status = null;
      const message = '';
      const actionResults = actions.editRecipeStatus(status, message);
      expect(actionResults).toEqual({
        type: actions.EDIT_RECIPE_STATUS,
        status,
        message
      });
    });
  });
  describe('Set Id of recipe to be edited', () => {
    it('should set the id of recipe', () => {
      const recipeId = 4;
      const actionResults = setEditRecipeIdAction(recipeId);
      expect(actionResults).toEqual({
        type: SET_EDIT_RECIPE_ID,
        recipeId
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

  const recipeId = 9;
  describe('Edit Recipe', () => {
    it('dispatches successful action for a successful request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Recipe updated successfully',
            data: addRecipe
          }
        });
      });

      global.$ = () => ({ modal: jest.fn() });

      const expectedActions = [
        actions.editRecipeRequest(recipeId, addRecipe),
        actions.editRecipeSuccess(recipeId, addRecipe),
        actions.editRecipeStatus(true, null)
      ];

      await store.dispatch(editRecipeAction(recipeId, addRecipe));
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
                message: 'you already have a recipe with the name yam'
              }
            ]
          }
        }
      });
    });

    const expectedActions = [
      actions.editRecipeRequest(recipeId),
      actions.editRecipeError('you already have a recipe with the name yam'),
      actions.editRecipeStatus(false, 'you already have a recipe with the name yam')
    ];

    await store.dispatch(editRecipeAction(recipeId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
