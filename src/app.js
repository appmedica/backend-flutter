const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');


const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

module.exports = app;
