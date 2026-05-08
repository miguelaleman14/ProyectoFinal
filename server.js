const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`Aura Glow funcionando en: http://localhost:${PORT}`);
    console.log(`Carpeta pública: ${path.join(__dirname, 'public')}`);
    console.log('-------------------------------------------');
});