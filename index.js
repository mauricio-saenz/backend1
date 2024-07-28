const express = require('express');
const app = express();
const port = 8080;
const FileManager = require('./fileManager');
const path = require('path');

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

app.get('/api/products/', (req, res) => {
    const filePath = path.resolve('products.json');
    const fileManager = new FileManager(filePath);

    try {
        const products = fileManager.readFile();
        res.json(products);  // Devuelve el contenido del archivo como respuesta en formato JSON
    } catch (error) {
        res.status(500).send('Internal Server Error');  // Envía una respuesta de error en caso de fallo
    }
});

app.get('/api/products/:pid', (req, res) => {
    const filePath = path.resolve('products.json');
    const fileManager = new FileManager(filePath);

    try {
        const products = fileManager.readFile();
        const pid = req.params.pid;
        const result = products.find(product => product.id == pid); // Ajusta esta línea

        if (result) {
            res.json(result);  // Devuelve el producto encontrado en formato JSON
        } else {
            res.status(404).send('Product not found');  // Envía una respuesta de error si no se encuentra el producto
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');  // Envía una respuesta de error en caso de fallo
    }
});

app.post('/api/products/', (req, res) => {
    const filePath = path.resolve('products.json');
    const fileManager = new FileManager(filePath);
    
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  
    if (
      typeof title !== 'string' ||
      typeof description !== 'string' ||
      typeof code !== 'string' ||
      typeof price !== 'number' ||
      typeof status !== 'boolean' ||
      typeof stock !== 'number' ||
      typeof category !== 'string'
      /*typeof category !== 'string' ||
      !Array.isArray(thumbnails) || !thumbnails.every(thumbnail => typeof thumbnail === 'string')*/
    ) {
      return res.status(400).send('Datos inválidos');
    }

    try {

        const products = fileManager.readFile();

        const lastElement = products[products.length - 1];

        const lastIndex = products.indexOf(lastElement);

        const newIndex = lastIndex + 1;

        const newElement = { id: newIndex,
			title: "Product Title"+newIndex, 
			description: "Product Description"+newIndex,
			code: "Product Code"+newIndex,
			price: 10,
			status: true,
			stock: 1,
			category: "Categoria"+newIndex,
			thumbnail: ["ImagePath1", "ImagePath2", "ImagePath3"] };
        
        products.push(newElement);

        fileManager.writeFile(products);

        res.status(200).send('Elemento agregado (id):', index);

    } catch (error) {
        res.status(500).send('Internal Server Error');  // Envía una respuesta de error en caso de fallo
    }
});

app.put('/api/products/:pid', (req, res) => {
    const filePath = path.resolve('products.json');
    const fileManager = new FileManager(filePath);
    
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  
    if (
      typeof title !== 'string' ||
      typeof description !== 'string' ||
      typeof code !== 'string' ||
      typeof price !== 'number' ||
      typeof status !== 'boolean' ||
      typeof stock !== 'number' ||
      typeof category !== 'string'
      /*typeof category !== 'string' ||
      !Array.isArray(thumbnails) || !thumbnails.every(thumbnail => typeof thumbnail === 'string')*/
    ) {
      return res.status(400).send('Datos inválidos');
    }

    try {

        const products = fileManager.readFile();

        const index = req.params.pid -1;

        products[index].title = title
        products[index].description = description
        products[index].code = code
        products[index].price = price
        products[index].status = status
        products[index].stock = stock
        products[index].category = category
        products[index].thumbnails = thumbnails

        fileManager.writeFile(products);

        res.status(200).send('Elemento actualizado (id):', index);


    } catch (error) {
        res.status(500).send('Internal Server Error');  // Envía una respuesta de error en caso de fallo
    }
});

app.delete('/api/products/:pid', (req, res) => {
    const filePath = path.resolve('products.json');
    const fileManager = new FileManager(filePath);

    try {

        const products = fileManager.readFile();

        const index = req.params.pid -1;

        const newProducts = products.filter(product => products.indexOf(product) !== index);

        fileManager.writeFile(newProducts);

        res.status(200).send('Elemento eliminado (id):', index);

    } catch (error) {
        res.status(500).send('Internal Server Error');  // Envía una respuesta de error en caso de fallo
    }
});