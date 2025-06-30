import { body } from 'express-validator';

export const registerValidation = [
    body('username')
        .isString()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),

    body('password')
        .isString()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    body('role')
        .isString()
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['admin', 'user']) // adjust allowed roles
        .withMessage('Role must be either admin or user'),
];