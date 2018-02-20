import axios from 'axios';

/**
 * @class Helper
 */
class Helper {
  /**
   * @description This set a default header which would be sent with every axios request
   * @param {*} token
   * @returns {*} mon
   */
  static setAuthorizationToken(token) {
    if (token) {
      axios.defaults.headers.common['x-access-token'] = token;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }
}

export default Helper;
