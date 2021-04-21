import { body, param } from 'express-validator';

export const loginUserRequest = [
  body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Wrong credentials'),
  body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage(`Mail is invalid.`)
];

export const deleteUser = [
  body('email')
    .not().isEmpty().withMessage('User id is required')
    .isEmail().withMessage('User id is not valid')
];

export const registerUserRequest = [
  body('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be 8 or more characters long'),
  body('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage(`Mail is invalid.`)
];

export const changePasswordRequest = [
  body('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage(`Mail is invalid.`),
  body('oldPassword')
    .not().isEmpty().withMessage('Old password must be sent.'),
  body('newPassword')
    .not().isEmpty().withMessage('New password must be sent.')
    .isLength({ min: 8 }).withMessage('New password must have at least 8 characters')
];
