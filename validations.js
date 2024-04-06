import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Неверный формат пароля').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Неверный формат пароля').isLength({ min: 5 }),
    body('fullName', 'Неверный формат логина').isLength({ min: 3 }),
    body('avatar', 'Неверный формат аватарки').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тэга (укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];