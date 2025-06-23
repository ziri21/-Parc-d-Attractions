const fs = require('fs');
const path = require('path');
const Employee = require('../models/Employee');

const dataPath = path.join(__dirname, '../data/employees.json');

// Charger les employés depuis le fichier JSON
function loadEmployees() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }
  return [];
}

// Sauvegarder les employés dans le fichier JSON
function saveEmployees(employees) {
  fs.writeFileSync(dataPath, JSON.stringify(employees, null, 2));
}

// Générer un nouvel ID
function getNextId(employees) {
  return employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
}

// Créer un employé
const createEmployee = (req, res) => {
  const { name, position, department } = req.body;
  if (!name || !position || !department) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const employees = loadEmployees();
  const id = getNextId(employees);
  const employee = new Employee(id, name, position, department);
  employees.push(employee);
  saveEmployees(employees);
  res.status(201).json(employee);
};

// Obtenir tous les employés
const getAllEmployees = (req, res) => {
  const employees = loadEmployees();
  res.json(employees);
};

// Obtenir un employé par ID
const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  const employees = loadEmployees();
  const employee = employees.find(e => e.id === id);
  if (!employee) {
    return res.status(404).json({ error: "Employé non trouvé." });
  }
  res.json(employee);
};

// Mettre à jour un employé
const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const employees = loadEmployees();
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Employé non trouvé." });
  }

  const { name, position, department } = req.body;
  if (name) employees[index].name = name;
  if (position) employees[index].position = position;
  if (department) employees[index].department = department;

  saveEmployees(employees);
  res.json(employees[index]);
};

// Supprimer un employé
const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  let employees = loadEmployees();
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Employé non trouvé." });
  }

  employees.splice(index, 1);
  saveEmployees(employees);
  res.json({ message: "Employé supprimé avec succès." });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
