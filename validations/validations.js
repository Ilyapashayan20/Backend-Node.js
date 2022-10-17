import { body } from 'express-validator'

export const loginValidation = [
    body('email','voch chisht format el hascei').isEmail(),
    body('password', 'gaxnabary petq e lini nvazaguyny 5 simvol').isLength({min:5}),
]

export const registerValidation = [
    body('email','voch chisht format el hascei').isEmail(),
    body('password', 'gaxnabary petq e lini nvazaguyny 5 simvol').isLength({min:5}),
    body('fullName','Nsheq Anun').isLength({min:3}),
    body('avatarUrl', "anhayt hxum nkari").optional().isURL()
]

export const postCreateValidation = [
    body('title','greq vernagir').isLength({min:3}).isString(),
    body('text', 'greq text').isLength({min:10}).isString(),
    body('tags','Nsheq Anun').optional().isArray(),
    body('imageUrl', "anhayt hxum nkari").optional().isString()
]