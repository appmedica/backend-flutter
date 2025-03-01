const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 5432;

// Conectar a MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Error de conexión a MongoDB: ${err.message}`);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    
    const isProduction = process.env.NODE_ENV === 'production';
    const serverUrl = isProduction 
      ? 'https://backend-flutter-2ry3.onrender.com'
      : `http://localhost:${PORT}`;
    
    console.log(`🚀 Servidor corriendo en ${serverUrl}`);
  });
});