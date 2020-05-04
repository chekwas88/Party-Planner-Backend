/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

/**
 * A class that handles authentication including generating and verifying user tokens.
 */
class Authorize {
  /**
   * Generates user tokens
   * @param {object} payload
   * @returns {string} token
   */
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1 day' });
    return token;
  }

  /**
   * Verifies user tokens
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {void}
   */
  static verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({
        status: res.statusCode,
        error: 'No authorization is provided',
      });
    }
    const token = req.headers.authorization;
    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'token not verified',
        });
      }
      req.user = decoded;
      return next();
    });
  }

   /**
   * Acknowledges user tokens
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {void}
   */
  static acknowledgeToken(req, res, next) {
    if (!req.headers.authorization) {
      return next();
    }
    const token = req.headers.authorization;
    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return next();
      }
      req.user = decoded;
      return next();
    });
  }

   /**
   * encrypts users' password
   * @function encryptPassword
   * @param {string} password
   * @returns {string} encrypted password
   */
  static encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(6));
  }

    /**
     * @function comparePassword
     * @param {string} a
     * @param {string} b
     * @return {string} boolean
     */
    static comparePassword(a, b) {
        return bcrypt.compareSync(a, b);
    }
  

  /**
   * decodes user tokens
   * @param {string} token
   * @returns {object} decoded
   */
  static decodeToken(token) {
    let payload = null;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      payload = decoded;
    });
    return payload;
  }
}

export default Authorize;
