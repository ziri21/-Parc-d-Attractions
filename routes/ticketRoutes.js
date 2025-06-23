const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticketController');

// Routes RESTful
router.post('/tickets/purchase', controller.createTicket);
router.get('/tickets', controller.getAllTickets);
router.get('/tickets/:id', controller.getTicketById);
router.put('/tickets/:id', controller.updateTicket);
router.delete('/tickets/:id', controller.deleteTicket);

module.exports = router;
