const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  fechaCreacion: { type: Date, 
    default: Date.now },
  url: {type:String,
    required: true,
  }
});

module.exports = mongoose.model('Imagen', imagenSchema);



