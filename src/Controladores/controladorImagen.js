const Imagen = require('../Modelos/modeloImagen.js');
const fs = require('fs');
const path = require('path');

// Subir una nueva imagen
const subirImagen = async (req, res) => {
  
  try {
    const nuevaImagen = new Imagen({
      nombre: req.file.filename,
      url: `/imagenes/${req.file.filename}`
    });
    await nuevaImagen.save();
    res.status(201).json({ filePath: `/imagenes/${req.file.filename}` });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas las imágenes
const listarImagenes = async (req, res) => {
  try {
    const imagenes = await Imagen.find();
    res.json(imagenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una imagen
const eliminarImagen = async (req, res) => {
  try {
    const imagen = await Imagen.findById(req.params.id);
    if (!imagen) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }

    const newPath = path.resolve('imagenes', imagen.nombre);
    console.log(newPath);
    // Eliminar el archivo del sistema de archivos
    fs.unlinkSync(newPath);

    // Eliminar el documento de MongoDB
    await Imagen.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar el nombre de la imagen
const actualizarImagen = async (req, res) => {
  try {
    const { nombre } = req.body;
    const imagen = await Imagen.findById(req.params.id);

    if (!imagen) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }

    if (nombre) {
      const oldPath = path.resolve('imagenes', imagen.nombre); 
      const newPath = path.resolve('imagenes', nombre); 

      console.log(oldPath);
      console.log(newPath);
      
      // Verificar si el archivo existe
      if (!fs.existsSync(oldPath)) {
        return res.status(404).json({ mensaje: 'El archivo no existe en el servidor' });
      }

      // Renombrar el archivo físico
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('Error al renombrar el archivo:', err);
          return res.status(500).json({ error: 'Error al renombrar el archivo' });
        }
      });

      // Actualizar el nombre y la URL
      imagen.nombre = nombre;
      imagen.url = `/imagenes/${nombre}`;
    }

    await imagen.save();
    res.json({ mensaje: 'Imagen actualizada correctamente', imagen });
  } catch (error) {
    console.error('Error al actualizar la imagen:', error);
    res.status(400).json({ error: error.message });
  }
};

//consultar URL de imagen
const consultarImagen = async (req, res) => {
  try {
    const imagen = await Imagen.findById(req.params.id);
    if (!imagen) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
      }
      console.log(imagen);
      res.json({ imagen });
  }
  catch (error) {
    console.error('Error al consultar la imagen:', error);
  }
  };


module.exports = { subirImagen, 
  listarImagenes, 
  eliminarImagen, 
  actualizarImagen,
  consultarImagen,
 };

