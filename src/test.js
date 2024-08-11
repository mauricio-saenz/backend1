const express = require('express');
const WebSocket = require('ws');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

const FileController = require('./controllers/fileController');
const filePath = path.resolve('src/json/products.json');

// Configura Handlebars como el motor de plantillas
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Sirve archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

const fileController = new FileController(filePath);
const products = fileController.readFile();

// Ruta principal que renderiza la vista con Handlebars
app.get('/', (req, res) => {

    res.render('layouts/realTimeProducts', {
        title: 'WebSocket Cliente',
        products: products
    });

});

// Inicia el servidor HTTP
const server = app.listen(port, () => {
    console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', socket => {

    fileController.watchFile((data) => {
        //console.log('Contenido del archivo actualizado:', data);
        // Aquí puedes hacer lo que necesites con el contenido del archivo
        socket.send(data);
    });

    socket.on('close', () => {
        console.log('Cliente desconectado');
    });

});

console.log('Servidor WebSocket escuchando en ws://localhost:8080');
