const express = require('express');
const router = express.Router();
const {upload,upload2}=require('../Intermediarios/archivos.js')

const { subirImagen, 
    listarImagenes, 
    eliminarImagen, 
    actualizarImagen,
    consultarImagen } = require('../Controladores/controladorImagen.js');



// Rutas del microservicio
router.get('/', listarImagenes); 
router.get('/:id', consultarImagen);          
router.post('/', upload.single('imagen'), subirImagen);   
router.delete('/:id', eliminarImagen);     
router.put('/:id', actualizarImagen);      

module.exports = router;