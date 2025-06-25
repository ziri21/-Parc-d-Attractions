const express = require('express');
const router = express.Router();
const {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor
} = require('../controllers/visitorController');

const { validateVisitor } = require('../validators/visitorValidator');
const { validationResult } = require('express-validator');

// Middleware pour gérer les erreurs de validation
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post('/visitors', validateVisitor, handleValidation, createVisitor);
router.get('/visitors', getAllVisitors);
router.get('/visitors/:id', getVisitorById);
router.put('/visitors/:id', validateVisitor, handleValidation, updateVisitor);
router.delete('/visitors/:id', deleteVisitor);

module.exports = router;
