// const express = require('express');
// const bodyParser = require('body-parser');

// const rideRoutes = require('./routes/rideRoutes');
// const visitorRoutes = require('./routes/visitorRoutes');
// const ticketRoutes = require('./routes/ticketRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');
// const maintenanceRoutes = require('./routes/maintenanceRoutes');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());

// app.use('/api/rides', rideRoutes);
// app.use('/api/visitors', visitorRoutes);
// app.use('/api/tickets', ticketRoutes);
// app.use('/api/employees', employeeRoutes);
// app.use('/api/maintenance', maintenanceRoutes);

// app.listen(PORT, () => {
//   console.log(`🚀 Serveur lancé sur le port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const rideRoutes = require('./routes/rideRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', ticketRoutes);

// Routes API
app.use('/api', employeeRoutes);
app.use('/api', maintenanceRoutes);
app.use('/api', rideRoutes);
app.use('/api', visitorRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


