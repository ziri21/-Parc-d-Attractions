const fs = require('fs');
const path = require('path');
const Employee = require('../models/Employee');

const dataPath = path.join(__dirname, '../data/employees.json');

// Charger les employés
function loadEmployees() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }
  return [];
}

// Sauvegarder les employés
function saveEmployees(employees) {
  fs.writeFileSync(dataPath, JSON.stringify(employees, null, 2));
}

// Générer un nouvel ID
function getNextId(data) {
  return data.length > 0 ? Math.max(...data.map(e => e.id)) + 1 : 1;
}

// POST /api/employees
const createEmployee = (req, res) => {
  const { name, position, department } = req.body;
  if (!name || !position || !department) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const data = loadEmployees();
  const id = getNextId(data);
  const employee = new Employee(id, name, position, department);
  data.push(employee);
  saveEmployees(data);
  res.status(201).json(employee);
};

// GET /api/employees
const getAllEmployees = (req, res) => {
  const data = loadEmployees();
  res.json(data);
};

// GET /api/employees/:id
const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = loadEmployees();
  const employee = data.find(e => e.id === id);
  if (!employee) return res.status(404).json({ error: "Employé non trouvé." });
  res.json(employee);
};

// PUT /api/employees/:id
const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const data = loadEmployees();
  const index = data.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: "Employé non trouvé." });

  const { name, position, department } = req.body;
  if (name) data[index].name = name;
  if (position) data[index].position = position;
  if (department) data[index].department = department;

  saveEmployees(data);
  res.json(data[index]);
};

// DELETE /api/employees/:id
const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const data = loadEmployees();
  const index = data.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: "Employé non trouvé." });

  data.splice(index, 1);
  saveEmployees(data);
  res.json({ message: "Employé supprimé avec succès." });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
