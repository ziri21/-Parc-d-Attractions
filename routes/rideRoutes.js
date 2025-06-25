const express = require('express');
const router = express.Router();
const {
  createRide,
  getAllRides,
  getRideById,
  updateRide,
  deleteRide
} = require('../controllers/rideController');

const { validateRide } = require('../validators/rideValidator');
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
router.post('/rides', validateRide, handleValidation, createRide);
router.get('/rides', getAllRides);
router.get('/rides/:id', getRideById);
router.put('/rides/:id', validateRide, handleValidation, updateRide);
router.delete('/rides/:id', deleteRide);

module.exports = router;
