"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

var partyValidator = [(0, _expressValidator.body)('name').notEmpty().withMessage('name should not be empty').isString().withMessage('name should be a string'), (0, _expressValidator.body)('venue').notEmpty().withMessage('venue should not be empty').isString().withMessage('venue should be a string'), (0, _expressValidator.body)('description').notEmpty().withMessage('description should not be empty').isString().withMessage('description should be a string'), (0, _expressValidator.body)('date').notEmpty().withMessage('date should not be empty ').isString().withMessage('date should be a string'), (0, _expressValidator.body)('time').notEmpty().withMessage('time should not be empty ').isString().withMessage('time should be a string'), (0, _expressValidator.body)('private').optional().isBoolean().withMessage('invalid input type. private should be a boolean value'), (0, _expressValidator.body)('budget').isDecimal().withMessage('budget should be a number'), (0, _expressValidator.body)('expense').isArray().withMessage('invalid input type'), (0, _expressValidator.body)('theme').isString().withMessage('theme should be a string'), function partyValidation(req, res, next) {
  var errorValidation = (0, _expressValidator.validationResult)(req);

  if (!errorValidation.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errorValidation.array()
    });
  }

  next();
}];
var _default = partyValidator;
exports.default = _default;