const fs = require('fs');
const path = require('path');
const Ride = require('../models/Ride');

const dataPath = path.join(__dirname, '../data/rides.json');

function loadRides() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }
  return [];
}

function saveRides(rides) {
  fs.writeFileSync(dataPath, JSON.stringify(rides, null, 2));
}

function getNextId(rides) {
  return rides.length > 0 ? Math.max(...rides.map(r => r.id)) + 1 : 1;
}

// POST /api/rides
const createRide = (req, res) => {
  const { name, capacity, minHeight, duration, status } = req.body;
  if (!name || !capacity || !minHeight || !duration || !status) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const rides = loadRides();
  const id = getNextId(rides);
  const ride = new Ride(id, name, capacity, minHeight, duration, status);
  rides.push(ride);
  saveRides(rides);
  res.status(201).json(ride);
};

// GET /api/rides
const getAllRides = (req, res) => {
  const rides = loadRides();
  res.json(rides);
};

// GET /api/rides/:id
const getRideById = (req, res) => {
  const id = parseInt(req.params.id);
  const rides = loadRides();
  const ride = rides.find(r => r.id === id);
  if (!ride) return res.status(404).json({ error: "Attraction non trouvée." });
  res.json(ride);
};

// PUT /api/rides/:id
const updateRide = (req, res) => {
  const id = parseInt(req.params.id);
  const rides = loadRides();
  const index = rides.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: "Attraction non trouvée." });

  const { name, capacity, minHeight, duration, status } = req.body;

  if (name) rides[index].name = name;
  if (capacity) rides[index].capacity = capacity;
  if (minHeight) rides[index].minHeight = minHeight;
  if (duration) rides[index].duration = duration;
  if (status) rides[index].status = status;

  saveRides(rides);
  res.json(rides[index]);
};

// DELETE /api/rides/:id
const deleteRide = (req, res) => {
  const id = parseInt(req.params.id);
  const rides = loadRides();
  const index = rides.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: "Attraction non trouvée." });

  rides.splice(index, 1);
  saveRides(rides);
  res.json({ message: "Attraction supprimée avec succès." });
};

module.exports = {
  createRide,
  getAllRides,
  getRideById,
  updateRide,
  deleteRide
};
