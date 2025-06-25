const express = require('express');
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');

const { validateTicket } = require('../validators/ticketValidator');
const { validationResult } = require('express-validator');

// Middleware de gestion des erreurs de validation
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post('/tickets/purchase', validateTicket, handleValidation, createTicket);
router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);
router.put('/tickets/:id', validateTicket, handleValidation, updateTicket);
router.delete('/tickets/:id', deleteTicket);

module.exports = router;
