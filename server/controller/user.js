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
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static signUp(req, res) {
    const {
      username, email, profileImage
    } = req.body;
    let { password } = req.body;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return Users
      .create({
        username,
        email,
        password,
        profileImage,
      })
      .then((created) => {
        const payload = { id: created.id };
        const token = jwt.sign(payload, secret, {
          expiresIn: '3h',
        });
        res.status(201).send({
          success: true,
          message: 'User created',
          token
        });
      });
  }
  /**
   * @description User signin method
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static signIn(req, res) {
    return Users
      .findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        const payload = { id: user.id };
        const token = jwt.sign(payload, secret, {
          expiresIn: '3h',
        });
        res.status(200).send({
          success: true,
          message: 'Signin successful',
          token,
        });
      });
  }
}

export default User;
