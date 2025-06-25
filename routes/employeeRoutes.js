const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const { validateEmployee } = require('../validators/employeeValidator');
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
router.post('/employees', validateEmployee, handleValidation, createEmployee);
router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeeById);
router.put('/employees/:id', validateEmployee, handleValidation, updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;
