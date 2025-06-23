const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Routes RESTful
router.post('/rides', rideController.createRide);
router.get('/rides', rideController.getAllRides);
router.get('/rides/:id', rideController.getRideById);
router.put('/rides/:id', rideController.updateRide);
router.delete('/rides/:id', rideController.deleteRide);

module.exports = router;
