import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';

const { User } = model;
/**
 * @class userController
*/
class handleUserMethod {
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static userSignUp(req, res) {
    // Initialize the req.body attributes to a const
    const {
      firstname, lastname, username, email, image
    } = req.body;
    let { password } = req.body;
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return User
      // Create the  user details
      .create({
        firstname,
        lastname,
        username,
        email,
        password,
        image,
      })
      .then(user => res.status(201).send({
        success: true,
        messge: 'Account successfully created',
        username: user.username,
        id: user.id,
      }))
      .catch(error => res.status(400).send(error));
  }
  /**
   * @param {*} req
   * @param {*} res
   * @returns  {JSON} Returns a JSON object
   */
  static userSignIn(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User not found',
          });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = { id: user.id, username: user.username };
          const token = jwt.sign(payload, 'sannikay', {
            expiresIn: '3h',
          });
          res.status(200).send({
            success: true,
            message: 'Token Generated. Signin successful',
            userId: user.id,
            token,
          });
        } else {
          res.status(400).send({
            error: 'Incorrect Login details',
          });
        }
      })
      .catch(error => res.status(400).send(error));
  }
}

export default handleUserMethod;
