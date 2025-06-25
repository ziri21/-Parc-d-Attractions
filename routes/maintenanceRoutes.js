const express = require('express');
const router = express.Router();
const {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance
} = require('../controllers/maintenanceController');

const { validateMaintenance } = require('../validators/maintenanceValidator');
const { validationResult } = require('express-validator');

// Middleware pour les erreurs de validation
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post('/maintenance', validateMaintenance, handleValidation, createMaintenance);
router.get('/maintenance', getAllMaintenance);
router.get('/maintenance/:id', getMaintenanceById);
router.put('/maintenance/:id', validateMaintenance, handleValidation, updateMaintenance);
router.delete('/maintenance/:id', deleteMaintenance);

module.exports = router;
