import {body} from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль слишком короткий. Минимум 5 символов').isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль слишком короткий. Минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isString(),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи (не менее трех символов)').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи (не менее 10 символов)').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]

export const commentCreateValidation = [
    body('text', 'Введите текст комментария').isLength({ min: 3 }).isString()
]