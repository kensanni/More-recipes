import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import getReviewsAction from '../../actionController/getReviews';
import mockData from '../__mocks__/recipeData.json';
import * as actions from '../../actions/getReviewsAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  review,
} = mockData.Recipes;

describe('Get reviews Action', () => {
  describe('Initiate get review action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = 3;
      const actionResults = actions.getReviewsRequest(recipeId);
      expect(actionResults).toEqual({
        type: actions.GET_REVIEWS_REQUEST,
        recipeId,
        isFetched: false
      });
    });
  });
  describe('Receive get recipe details action response', () => {
    it('should create an action to receive a successful response', () => {
      const reviews = [review];
      const pages = 4;
      const actionResults = actions.getReviewsSuccess(reviews, pages);
      expect(actionResults).toEqual({
        type: actions.GET_REVIEWS_SUCCESSFUL,
        pages,
        reviews,
        isFetched: true
      });
    });
  });
  describe('Receive get recipe details action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = 'Reviews not found';
      const actionResults = actions.getReviewsError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_REVIEWS_ERROR,
        errorMessage,
        isFetched: false,
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

  const pages = 0;
  const recipeId = 7;
  it('dispatches success for successful request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          getAllReviews: [
            review
          ],
          pages
        }
      });
    });

    const expectedActions = [
      actions.getReviewsRequest(recipeId),
      actions.getReviewsSuccess([review], pages)
    ];

    await store.dispatch(getReviewsAction(recipeId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches success for next paginated reviews', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          getAllReviews: [
            review
          ],
          pages
        }
      });
    });

    const expectedActions = [
      actions.getReviewsRequest(recipeId),
      actions.getNextReviewsSuccess([review], pages)
    ];

    const page = 6;
    await store.dispatch(getReviewsAction(recipeId, page));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches error for a failed request', async () => {
    const errorMessage = 'Reviews not found';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject([
        {
          message: 'Reviews not found'
        }
      ]);
    });

    const expectedActions = [
      actions.getReviewsRequest(),
      actions.getReviewsError(errorMessage)
    ];

    await store.dispatch(getReviewsAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
