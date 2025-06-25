const { body } = require('express-validator');

const validateTicket = [
  body('visitorId')
    .isInt({ min: 1 }).withMessage('L\'ID du visiteur doit être un entier positif'),

  body('type')
    .isIn(['day', 'season', 'vip']).withMessage('Le type doit être "day", "season" ou "vip"'),

  body('price')
    .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),

  body('purchaseDate')
    .isISO8601().withMessage('La date d\'achat doit être une date valide (format ISO)'),

  body('validUntil')
    .isISO8601().withMessage('La date de validité doit être une date valide (format ISO)')
];

module.exports = { validateTicket };
