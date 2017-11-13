import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

const secret = process.env.JWT_SECRET;

const User = model.Users;
/**
 * @class User
*/
class Users {
  /**
   * @description User signup method
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static signUp(req, res) {
    const {
      firstname, lastname, username, email, profileImage
    } = req.body;
    let { password } = req.body;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    if (!firstname) {
      return res.status(400).send({
        message: 'Please input your first name'
      });
    }
    if (!lastname) {
      return res.status(400).send({
        message: 'Please input your last name'
      });
    }
    if (!username) {
      return res.status(400).send({
        message: 'Please input your username'
      });
    }
    if (!email) {
      return res.status(400).send({
        message: 'Please input  a valid email address'
      });
    }
    return User
      .create({
        firstname,
        lastname,
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
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static signIn(req, res) {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).send({
        message: 'Please input your username'
      });
    }
    if (!password) {
      return res.status(400).send({
        message: 'Please input your password to signin'
      });
    }
    return User
      .findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'Incorrect Login details',
          });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = { id: user.id };
          const token = jwt.sign(payload, secret, {
            expiresIn: '3h',
          });
          res.status(200).send({
            success: true,
            message: 'Signin successful',
            token,
          });
        } else {
          res.status(400).send({
            message: 'Incorrect Login details',
          });
        }
      })
      .catch(error => res.status(400).send(error));
  }
}

export default Users;
