import axios from 'axios';
import { saveImageToCloudRequest, saveImageToCloudSuccessful, saveImageToCloudError } from '../actions/saveImageToCloud';

/**
 * @description action controller for uploading recipe image to cloud
 * @param {*} image
 * @return {*} Redux action to be dispatch to the store
 */
export default function saveImageToCloud(image) {
  console.log('@@@@@@@###############@@@@@@@@@@@@@@@@!', image);
  const cloudinaryUrl = process.env.REQUEST;
  const cloudinaryPreset = process.env.CLOUD_PRESET;
  console.log('@@@@@@@88888888888@@@@@@@', cloudinaryPreset);
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryPreset);
  delete axios.defaults.headers.common.Authorization;
  return (dispatch) => {
    dispatch(saveImageToCloudRequest(formData));
    axios.post(cloudinaryUrl, formData)
      .then((res) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers['x-access-token'].Authorization = token;
        const { public_id } = res.data;
        console.log('@@@@@@@@@@@@@@@@@@', public_id);
        dispatch(saveImageToCloudSuccessful(public_id));
      })
      .catch((error) => {
        dispatch(saveImageToCloudError(error));
      });
  };
}
