const { body } = require('express-validator');

const validateMaintenance = [
  body('rideId')
    .isInt({ min: 1 }).withMessage("L'ID de l'attraction doit être un entier positif"),

  body('employeeId')
    .isInt({ min: 1 }).withMessage("L'ID de l'employé doit être un entier positif"),

  body('date')
    .isISO8601().toDate().withMessage("La date doit être une date valide"),

  body('description')
    .isString().notEmpty().withMessage("La description est requise"),

  body('status')
    .isIn(['scheduled', 'in progress', 'completed'])
    .withMessage("Le statut doit être 'scheduled', 'in progress' ou 'completed'")
];

module.exports = { validateMaintenance };
