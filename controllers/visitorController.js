const fs = require('fs');
const path = require('path');
const Visitor = require('../models/Visitor');

const dataPath = path.join(__dirname, '../data/visitors.json');

function loadVisitors() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }
  return [];
}

function saveVisitors(visitors) {
  fs.writeFileSync(dataPath, JSON.stringify(visitors, null, 2));
}

function getNextId(visitors) {
  return visitors.length > 0 ? Math.max(...visitors.map(v => v.id)) + 1 : 1;
}

// POST /api/visitors
const createVisitor = (req, res) => {
  const { name, age, height } = req.body;
  if (!name || !age || !height) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const visitors = loadVisitors();
  const id = getNextId(visitors);
  const visitor = new Visitor(id, name, age, height);
  visitors.push(visitor);
  saveVisitors(visitors);
  res.status(201).json(visitor);
};

// GET /api/visitors
const getAllVisitors = (req, res) => {
  const visitors = loadVisitors();
  res.json(visitors);
};

// GET /api/visitors/:id
const getVisitorById = (req, res) => {
  const id = parseInt(req.params.id);
  const visitors = loadVisitors();
  const visitor = visitors.find(v => v.id === id);
  if (!visitor) return res.status(404).json({ error: "Visiteur non trouvé." });
  res.json(visitor);
};

// PUT /api/visitors/:id
const updateVisitor = (req, res) => {
  const id = parseInt(req.params.id);
  const visitors = loadVisitors();
  const index = visitors.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).json({ error: "Visiteur non trouvé." });

  const { name, age, height } = req.body;
  if (name) visitors[index].name = name;
  if (age) visitors[index].age = age;
  if (height) visitors[index].height = height;

  saveVisitors(visitors);
  res.json(visitors[index]);
};

// DELETE /api/visitors/:id
const deleteVisitor = (req, res) => {
  const id = parseInt(req.params.id);
  const visitors = loadVisitors();
  const index = visitors.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).json({ error: "Visiteur non trouvé." });

  visitors.splice(index, 1);
  saveVisitors(visitors);
  res.json({ message: "Visiteur supprimé avec succès." });
};

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor
};
