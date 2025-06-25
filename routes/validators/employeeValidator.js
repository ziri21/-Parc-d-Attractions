const { body } = require('express-validator');

const validateEmployee = [
  body('name')
    .isString().withMessage('Le nom doit être une chaîne de caractères.')
    .notEmpty().withMessage('Le nom est requis.'),

  body('position')
    .isString().withMessage('Le poste doit être une chaîne.')
    .notEmpty().withMessage('Le poste est requis.'),

  body('department')
    .isString().withMessage('Le département doit être une chaîne.')
    .notEmpty().withMessage('Le département est requis.')
];

module.exports = { validateEmployee };
