import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

const secret = process.env.JWT_SECRET;

const { Users } = model;
/**
 * @class User
*/
class User {
  /**
   * @description User signup method
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} object
   */
  static async signUp(req, res) {
    const {
      name, username, email, profileImage
    } = req.body;
    let { password } = req.body;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const createUser = await Users.create({
      name,
      username,
      email,
      password,
      profileImage
    });
    if (createUser) {
      const payload = { id: createUser.id, username: createUser.username, email: createUser.email };
      const token = jwt.sign(payload, secret, {
        expiresIn: '3h',
      });
      res.status(201).send({
        message: 'User created',
        token,
      });
    }
  }
  /**
   * @description User signin method
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns  {object} object
   */
  static async signIn(req, res) {
    const findUserdetails = await Users.findOne({
      where: {
        username: req.body.username
      }
    });
    if (findUserdetails) {
      const payload = {
        id: findUserdetails.id, username: findUserdetails.username, email: findUserdetails.email
      };
      const token = jwt.sign(payload, secret, {
        expiresIn: '3h',
      });
      res.status(200).send({
        message: 'Signin successful',
        token,
      });
    }
  }
}

export default User;
