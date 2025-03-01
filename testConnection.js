require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

async function testConnection() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Conectado a MongoDB Atlas');
    await client.close();
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err.message);
  }
}

testConnection();
