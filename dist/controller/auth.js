"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *  user Authentication controller
 */
class UserAuth {
  /**
  * registers a user
  * @param {object} req
  *  @param {object} res
  * @returns {object} registered User
  */
  static register(req, res) {
    return _asyncToGenerator(function* () {
      var {
        firstName,
        lastName,
        email,
        password
      } = req.body;
      var user = yield _models.User.findOne({
        email
      });

      if (user) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'This user already exists'
        });
      }

      var newUser = yield _models.User.create({
        firstName,
        lastName,
        email,
        password
      });
      var {
        id
      } = newUser;
      var token = newUser.generateToken();
      return res.status(201).json({
        status: res.statusCode,
        id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        token,
        message: 'signup was successful'
      });
    })();
  }
  /**
  * login a user
  * @param {object} req
  *  @param {object} res
  * @returns {object} registered User
  */


  static login(req, res) {
    return _asyncToGenerator(function* () {
      var {
        email,
        password
      } = req.body;
      var user = yield _models.User.findOne({
        email
      });

      var failedLogin = () => {
        return res.status(401).json({
          status: res.statusCode,
          message: 'invalid email/password'
        });
      };

      if (!user) {
        failedLogin();
      }

      var isCorrectPaasword = user.comparePassword(password);
      var token = user.generateToken();

      if (isCorrectPaasword) {
        return res.status(201).json({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token,
          message: 'login was sucessful'
        });
      }

      failedLogin();
    })();
  }

}

var _default = UserAuth;
exports.default = _default;