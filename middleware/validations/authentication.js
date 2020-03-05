import { body, validationResult } from 'express-validator';

const signUpValidator = [
  body('firstName')
    .notEmpty()
    .withMessage('firstName should not be empty')
    .trim(),
  body('lastName')
        .notEmpty()
        .withMessage('lastName should not be empty')
        .trim(),
  body('email')
    .isEmail()
    .withMessage('email should not be empty and should be a valid email')
    .normalizeEmail()
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('password should not be empty ')
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage('password should be at least 8 characters')
    .trim(),
  function signUpValidation(req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: errorValidation.array(),
      });
    }
    next();
  },
];

const loginValidator = [
  
  body('email')
    .isEmail()
    .withMessage('email should not be empty and should be a valid email')
    .normalizeEmail()
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('password should not be empty ')
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage('password should be at least 8 characters')
    .trim(),
  function loginValidation(req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: errorValidation.array(),
      });
    }
    next();
  },
];
export {signUpValidator, loginValidator};

