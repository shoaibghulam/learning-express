// const { validationResult, body } = require('express-validator');

import { body } from "express-validator";



export const userValidateFields = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // You might have additional validation rules for the avatar field
];

export const postValidateField=[
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('thumbnail').notEmpty().withMessage('Thumbnail is required'),
]

export const updateUserValidateField=[
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
]

export const updateUserAvatarValidate=[
    body('thumbnail').notEmpty().withMessage('Thumbnail is required'),
   
]