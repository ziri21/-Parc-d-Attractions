const express = require('express');
const router = express.Router();
const controller = require('../controllers/maintenanceController');

// Routes RESTful
router.post('/maintenance', controller.createMaintenance);
router.get('/maintenance', controller.getAllMaintenance);
router.get('/maintenance/:id', controller.getMaintenanceById);
router.put('/maintenance/:id', controller.updateMaintenance);
router.delete('/maintenance/:id', controller.deleteMaintenance);

module.exports = router;
