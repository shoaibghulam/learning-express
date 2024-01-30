// const { validationResult, body } = require('express-validator');

import { body } from "express-validator";



export const userValidateFields = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // You might have additional validation rules for the avatar field
];