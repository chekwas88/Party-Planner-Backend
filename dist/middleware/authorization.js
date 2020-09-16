"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
_dotenv.default.config();
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
    var token = _jsonwebtoken.default.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1 day'
    });

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
        error: 'No authorization is provided'
      });
    }

    var token = req.headers.authorization;
    return _jsonwebtoken.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'token not verified'
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

    var token = req.headers.authorization;
    return _jsonwebtoken.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
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
    return _bcrypt.default.hashSync(password, _bcrypt.default.genSaltSync(6));
  }
  /**
   * @function comparePassword
   * @param {string} a
   * @param {string} b
   * @return {string} boolean
   */


  static comparePassword(a, b) {
    return _bcrypt.default.compareSync(a, b);
  }
  /**
   * decodes user tokens
   * @param {string} token
   * @returns {object} decoded
   */


  static decodeToken(token) {
    var payload = null;

    _jsonwebtoken.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      payload = decoded;
    });

    return payload;
  }

}

var _default = Authorize;
exports.default = _default;