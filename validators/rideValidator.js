const { body } = require('express-validator');

const validateRide = [
  body('name')
    .isString().withMessage("Le nom doit être une chaîne")
    .notEmpty().withMessage("Le nom est requis"),

  body('capacity')
    .isInt({ min: 1 }).withMessage("La capacité doit être un entier supérieur à 0"),

  body('minHeight')
    .isInt({ min: 0 }).withMessage("La taille minimale doit être un entier positif"),

  body('duration')
    .isInt({ min: 1 }).withMessage("La durée doit être un entier positif"),

  body('status')
    .isIn(['operational', 'maintenance', 'closed'])
    .withMessage("Le statut doit être 'operational', 'maintenance' ou 'closed'")
];

module.exports = { validateRide };
