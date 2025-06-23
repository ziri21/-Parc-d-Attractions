const express = require('express');
const router = express.Router();
const controller = require('../controllers/visitorController');

// Routes RESTful
router.post('/visitors', controller.createVisitor);
router.get('/visitors', controller.getAllVisitors);
router.get('/visitors/:id', controller.getVisitorById);
router.put('/visitors/:id', controller.updateVisitor);
router.delete('/visitors/:id', controller.deleteVisitor);

module.exports = router;
