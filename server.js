const express = require('express');
const path = require('path');
const app = express();

// Definimos el puerto (el proceso de entorno es para cuando lo despliegues en la nube)
const PORT = process.env.PORT || 3000;

// 1. Servir archivos estáticos desde la carpeta 'public'
// Esto permite que el navegador encuentre el CSS, JS, manifest y sw.js
app.use(express.static(path.join(__dirname, 'public')));

// 2. Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. Iniciar el servidor
app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`🚀 Aura Glow funcionando en: http://localhost:${PORT}`);
    console.log(`📂 Carpeta pública: ${path.join(__dirname, 'public')}`);
    console.log('-------------------------------------------');
});