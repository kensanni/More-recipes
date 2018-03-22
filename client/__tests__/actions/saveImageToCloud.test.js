import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import saveImageToCloudAction from '../../actionController/saveImageToCloud';
import * as actions from '../../actions/saveImageToCloud';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Save image to cloud Action', () => {
  describe('Initiate save image to cloud action request', () => {
    it('should create an action to initiate a request', () => {
      const image = '';
      const actionResults = actions.saveImageToCloudRequest(image);
      expect(actionResults).toEqual({
        type: actions.SAVE_IMAGE_TO_CLOUD_REQUEST,
        image,
        isUploaded: false
      });
    });
  });
  describe('Receive save image to cloud action response', () => {
    it('should create an action to receive a successful response', () => {
      const image = '';
      const actionResults = actions.saveImageToCloudSuccessful(image);
      expect(actionResults).toEqual({
        type: actions.SAVE_IMAGE_TO_CLOUD_SUCCESSFUL,
        image,
        isUploaded: true
      });
    });
  });
  describe('Receive save image to cloud action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.saveImageToCloudError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.SAVE_IMAGE_TO_CLOUD_ERROR,
        errorMessage,
        isUploaded: false
      });
    });
  });
});

// describe('Async action', () => {
//   let store;

//   beforeEach(() => {
//     moxios.install();
//     store = mockStore();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('should upload image if the request is successful', async () => {
//     const data = new FormData();
//     data.append('file', 'image.com');
//     data.append('upload_preset', process.env.CLOUD_PRESET);

//     const secure_url = 'image.com';
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           data: {
//             secure_url: 'image'
//           }
//         }
//       });
//     });

//     const expectedActions = [
//       actions.saveImageToCloudRequest(),
//       actions.saveImageToCloudSuccessful(secure_url)
//     ];

//     await store.dispatch(saveImageToCloudAction({ image: 'name.con' }));
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });
