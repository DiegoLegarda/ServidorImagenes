const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const conectarDB = async () => {
  //conexion a mongoDB
  try {
    await mongoose.connect("mongodb+srv://legarda8027:HOUMJOPOLhxqWfEV@cluster0.s4wly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
} 
};

module.exports = conectarDB;