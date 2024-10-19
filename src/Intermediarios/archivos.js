const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configuración de almacenamiento archivos con UUID
const almacenamiento = multer.diskStorage({
  
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, '../../imagenes'); 
        cb(null, dir);
      
    },
    filename: function (req, file, cb) {
      const uniqueName = uuidv4() + path.extname(file.originalname);
      cb(null, uniqueName); 
    }
  });
const upload = multer({ storage: almacenamiento });


// Configuración de almacenamiento archivos con nombre original
const almacenamiento2 = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, '../../imagenes'); 
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  });
const upload2 = multer({ storage: almacenamiento2 });

module.exports={
    upload,
    upload2,
}