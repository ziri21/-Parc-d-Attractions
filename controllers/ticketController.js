const fs = require('fs');
const path = require('path');
const Ticket = require('../models/Ticket');

const dataPath = path.join(__dirname, '../data/tickets.json');

function loadTickets() {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }
  return [];
}

function saveTickets(tickets) {
  fs.writeFileSync(dataPath, JSON.stringify(tickets, null, 2));
}

function getNextId(tickets) {
  return tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
}

// POST /api/tickets/purchase
const createTicket = (req, res) => {
  const { visitorId, type, price, purchaseDate, validUntil } = req.body;
  if (!visitorId || !type || !price || !purchaseDate || !validUntil) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const tickets = loadTickets();
  const id = getNextId(tickets);
  const ticket = new Ticket(id, visitorId, type, price, purchaseDate, validUntil);
  tickets.push(ticket);
  saveTickets(tickets);
  res.status(201).json(ticket);
};

// GET /api/tickets
const getAllTickets = (req, res) => {
  const tickets = loadTickets();
  res.json(tickets);
};

// GET /api/tickets/:id
const getTicketById = (req, res) => {
  const id = parseInt(req.params.id);
  const tickets = loadTickets();
  const ticket = tickets.find(t => t.id === id);
  if (!ticket) return res.status(404).json({ error: "Billet non trouvé." });
  res.json(ticket);
};

// PUT /api/tickets/:id
const updateTicket = (req, res) => {
  const id = parseInt(req.params.id);
  const tickets = loadTickets();
  const index = tickets.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Billet non trouvé." });

  const { visitorId, type, price, purchaseDate, validUntil } = req.body;
  if (visitorId) tickets[index].visitorId = visitorId;
  if (type) tickets[index].type = type;
  if (price) tickets[index].price = price;
  if (purchaseDate) tickets[index].purchaseDate = purchaseDate;
  if (validUntil) tickets[index].validUntil = validUntil;

  saveTickets(tickets);
  res.json(tickets[index]);
};

// DELETE /api/tickets/:id
const deleteTicket = (req, res) => {
  const id = parseInt(req.params.id);
  const tickets = loadTickets();
  const index = tickets.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Billet non trouvé." });

  tickets.splice(index, 1);
  saveTickets(tickets);
  res.json({ message: "Billet supprimé avec succès." });
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
};
