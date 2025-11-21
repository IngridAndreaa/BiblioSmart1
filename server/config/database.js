const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout después de 5 segundos
    });
    isConnected = true;
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.error(`❌ Error conectando a MongoDB: ${error.message}`);
    console.error(`⚠️  El servidor continuará sin MongoDB. Asegúrate de iniciar MongoDB para usar la aplicación.`);
    console.error(`💡 Para MongoDB local, ejecuta: mongod`);
    console.error(`💡 O verifica tu MONGODB_URI en el archivo .env`);
    return false;
  }
};

// Función para verificar si MongoDB está conectado
const checkConnection = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

module.exports = { connectDB, checkConnection };
