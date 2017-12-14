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
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static async signUp(req, res) {
    const {
      firstname, lastname, username, email, profileImage
    } = req.body;
    let { password } = req.body;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const createUser = await Users.create({
      firstname,
      lastname,
      username,
      email,
      password,
      profileImage
    });
    if (createUser) {
      const payload = { id: createUser.id };
      const token = jwt.sign(payload, secret, {
        expiresIn: '3h',
      });
      res.status(201).send({
        success: true,
        message: 'User created',
        token
      });
    }
  }
  /**
   * @description User signin method
   * @param {object} req
   * @param {object} res
   * @returns  {JSON} Returns a JSON object
   */
  static signIn(req, res) {
    const findUserdetails = Users.findOne({
      where: {
        username: req.body.username
      }
    });
    if (findUserdetails) {
      const payload = { id: findUserdetails.id };
      const token = jwt.sign(payload, secret, {
        expiresIn: '3h',
      });
      res.status(200).send({
        success: true,
        message: 'Signin successful',
        token,
      });
    }
  }
}

export default User;
