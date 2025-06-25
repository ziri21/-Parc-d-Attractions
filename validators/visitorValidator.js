const { body } = require('express-validator');

const validateVisitor = [
  body('name')
    .isString().withMessage('Le nom doit être une chaîne de caractères.')
    .notEmpty().withMessage('Le nom est requis.'),

  body('age')
    .isInt({ min: 0 }).withMessage("L'âge doit être un entier positif."),

  body('height')
    .isInt({ min: 0 }).withMessage('La taille doit être un entier positif.')
];

module.exports = { validateVisitor };
