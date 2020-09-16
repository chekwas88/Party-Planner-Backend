"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidator = exports.signUpValidator = void 0;

var _expressValidator = require("express-validator");

var signUpValidator = [(0, _expressValidator.body)('firstName').notEmpty().withMessage('firstName should not be empty').isString().withMessage('firstName should be a string').trim(), (0, _expressValidator.body)('lastName').notEmpty().withMessage('lastName should not be empty').isString().withMessage('lastName should be a string').trim(), (0, _expressValidator.body)('email').isEmail().withMessage('email should not be empty and should be a valid email').normalizeEmail().trim(), (0, _expressValidator.body)('password').notEmpty().withMessage('password should not be empty ').isAlphanumeric().isLength({
  min: 8
}).withMessage('password should be at least 8 characters').trim(), function signUpValidation(req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errorValidation.array()
    });
  }

  next();
}];
exports.signUpValidator = signUpValidator;
var loginValidator = [(0, _expressValidator.body)('email').isEmail().withMessage('email should not be empty and should be a valid email').normalizeEmail().trim(), (0, _expressValidator.body)('password').notEmpty().withMessage('password should not be empty ').isAlphanumeric().isLength({
  min: 8
}).withMessage('password should be at least 8 characters').trim(), function loginValidation(req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errorValidation.array()
    });
  }

  next();
}];
exports.loginValidator = loginValidator;