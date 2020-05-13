import { body, validationResult } from 'express-validator';

const partyValidator = [
    body('name')
        .notEmpty()
        .withMessage('name should not be empty')
        .isString()
        .withMessage('name should be a string'),

    body('venue')
        .notEmpty()
        .withMessage('venue should not be empty')
        .isString()
        .withMessage('venue should be a string'),
    body('description')
        .notEmpty()
        .withMessage('description should not be empty')
        .isString()
        .withMessage('description should be a string'),

    body('date')
        .notEmpty()
        .withMessage('date should not be empty ')
        .isString()
        .withMessage('date should be a string'),

    body('time')
    .notEmpty()
        .withMessage('time should not be empty ')
        .isString()
        .withMessage('time should be a string'),

    body('private')
    .optional()
    .isBoolean()
    .withMessage('invalid input type. private should be a boolean value'),

    body('budget')
    .isDecimal()
    .withMessage('budget should be a number'),

    body('expense')
    .isArray()
    .withMessage('invalid input type'),

    body('theme')
        .isString()
        .withMessage('theme should be a string'),
    function partyValidation(req, res, next) {
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


export default partyValidator;

