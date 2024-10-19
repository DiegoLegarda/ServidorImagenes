const express = require('express');
const cors = require('cors');
const conectarDB=require('./Basedatos/ConexionMongoDB.js')
const RutasImagen = require('./Rutas/rutasImagen.js');
const dotenv = require('dotenv');
const path = require('path');
const multer=require('multer');
const {upload,upload2}=require('./Intermediarios/archivos.js')
const puerto= process.env.PORT || 3000;
const app = express();

// Middleware para manejar JSON
app.use(express.json());

//Permitir acceso desde otras IP
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

// app.post('/api/imagenes', upload.single('imagen'),(req, res) => {
//     console.log(req.body); // Aquí deberías ver los datos del formulario
//     console.log(req.file); // Aquí deberías ver el archivo si se envió
// });
// Middleware para manejar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Servir documentos estáticas
app.use('/imagenes', express.static(path.join(__dirname, '../imagenes')));

// ruta get "hola mundo"
app.get('/', (req, res) => {
    res.send('Hola mundo');
});
// ruta get "adios mundo"
app.get('/adios', (req, res) => {
    res.send('Adios mundo');
});

//ruta saludo con nombre de entrada
app.get('/saludo/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.send(`Hola ${nombre}`);
});



//Manejo de MongoDB

// Conectar a la base de datos
conectarDB();

// Rutas
app.use('/api/imagenes', RutasImagen);

//listener del servidor

app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${puerto}`);
});

