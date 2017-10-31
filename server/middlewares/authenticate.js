import jwt from 'jsonwebtoken';

const secret = 'sannikay';

const authenticaton = {
  verifyUser: (req, res, next) => {
    // jsonwebtoken string
    const token = req.header['x-access-token'] || req.header.token;
    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'Not Authorized',
      });
    }
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).send({
          success: false,
          message: 'Invalid token',
        });
      }
      req.decoded = decoded;
      next();
    });
  },
};
export default authenticaton;
