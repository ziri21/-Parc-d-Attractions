const fs = require('fs');
const path = require('path');
const Maintenance = require('../models/Maintenance');

const dataPath = path.join(__dirname, '../data/maintenance.json');

function loadMaintenance() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }
  return [];
}

function saveMaintenance(maintenanceList) {
  fs.writeFileSync(dataPath, JSON.stringify(maintenanceList, null, 2));
}

function getNextId(data) {
  return data.length > 0 ? Math.max(...data.map(m => m.id)) + 1 : 1;
}

// POST /api/maintenance
const createMaintenance = (req, res) => {
  const { rideId, employeeId, date, description, status } = req.body;
  if (!rideId || !employeeId || !date || !description || !status) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const data = loadMaintenance();
  const id = getNextId(data);
  const maintenance = new Maintenance(id, rideId, employeeId, date, description, status);
  data.push(maintenance);
  saveMaintenance(data);
  res.status(201).json(maintenance);
};

// GET /api/maintenance
const getAllMaintenance = (req, res) => {
  const data = loadMaintenance();
  res.json(data);
};

// GET /api/maintenance/:id
const getMaintenanceById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = loadMaintenance();
  const m = data.find(item => item.id === id);
  if (!m) return res.status(404).json({ error: "Maintenance non trouvée." });
  res.json(m);
};

// PUT /api/maintenance/:id
const updateMaintenance = (req, res) => {
  const id = parseInt(req.params.id);
  const data = loadMaintenance();
  const index = data.findIndex(item => item.id === id);
  if (index === -1) return res.status(404).json({ error: "Maintenance non trouvée." });

  const { rideId, employeeId, date, description, status } = req.body;

  if (rideId) data[index].rideId = rideId;
  if (employeeId) data[index].employeeId = employeeId;
  if (date) data[index].date = date;
  if (description) data[index].description = description;
  if (status) data[index].status = status;

  saveMaintenance(data);
  res.json(data[index]);
};

// DELETE /api/maintenance/:id
const deleteMaintenance = (req, res) => {
  const id = parseInt(req.params.id);
  const data = loadMaintenance();
  const index = data.findIndex(item => item.id === id);
  if (index === -1) return res.status(404).json({ error: "Maintenance non trouvée." });

  data.splice(index, 1);
  saveMaintenance(data);
  res.json({ message: "Maintenance supprimée avec succès." });
};

module.exports = {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance
};
