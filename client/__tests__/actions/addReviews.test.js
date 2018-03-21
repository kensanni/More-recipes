import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import addReviewAction from '../../actionController/addReviews';
import mockData from '../__mocks__/recipeData.json';
import * as actions from '../../actions/addReviewsAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  reviewData
} = mockData.Recipes;

describe('Add reviews for recipe Action', () => {
  describe('Initiate get recipe details action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const review = '';
      const actionResults = actions.addReviewsRequest(recipeId, review);
      expect(actionResults).toEqual({
        type: actions.ADD_REVIEWS_REQUEST,
        recipeId,
        review,
        isAdded: false
      });
    });
  });
  describe('Receive add reviews action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = '';
      const review = '';
      const username = '';
      const createdAt = '';
      const actionResults =
        actions.addReviewsSuccessful(responseMessage, review, username, createdAt);
      expect(actionResults).toEqual({
        type: actions.ADD_REVIEWS_SUCCESSFUL,
        responseMessage,
        review,
        username,
        createdAt,
        isAdded: true
      });
    });
  });
  describe('Receive add reviews action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.addReveiwsError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.ADD_REVIEWS_ERROR,
        errorMessage,
        isAdded: false,
      });
    });
  });
});

describe('Async action', () => {
  const recipeId = 9;
  let store;

  beforeEach(() => {
    moxios.install(instance);
    store = mockStore();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Add reviews', () => {
    it('dispatches successful action for a successful request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Review successfully posted',
            data: reviewData
          }
        });
      });

      const expectedActions = [
        actions.addReviewsRequest(recipeId, reviewData.review),
        actions.addReviewsSuccessful('Review successfully posted', reviewData.review, reviewData.username, reviewData.createdAt)
      ];

      await store.dispatch(addReviewAction(recipeId, reviewData.review));
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
                message: 'Please input a review'
              }
            ]
          }
        }
      });
    });

    const expectedActions = [
      actions.addReviewsRequest(recipeId),
      actions.addReveiwsError('Please input a review')
    ];

    await store.dispatch(addReviewAction(recipeId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
