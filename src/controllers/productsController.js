const FileController = require('./fileController');
const path = require('path');
const filePath = path.resolve('src/json/products.json');

const productsController = {

    getAllProducts: (req, res) => {
        const fileController = new FileController(filePath);

        try {
            const products = fileController.readFile();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    },

    getProductById: (req, res) => {
        const fileController = new FileController(filePath);

        try {
            const products = fileController.readFile();
            const pid = parseInt(req.params.pid, 10);
            const result = products.find(product => product.id === pid);

            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: 'Product not found'});
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    },

    createProduct: (req, res) => {
        const fileController = new FileController(filePath);

        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof code !== 'string' ||
            typeof price !== 'number' ||
            typeof status !== 'boolean' ||
            typeof stock !== 'number' ||
            typeof category !== 'string' ||
            !Array.isArray(thumbnails) || !thumbnails.every(thumbnail => typeof thumbnail === 'string')
        ) {
            return res.status(400).json({ message: 'Invalid data'});
        }

        try {
            const products = fileController.readFile();
            const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

            const newElement = {
                id: newId,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            };

            products.push(newElement);
            fileController.writeFile(products);

            res.status(200).json({ message: 'Element added', id: newId });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    },

    updateProduct: (req, res) => {
        const fileController = new FileController(filePath);

        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof code !== 'string' ||
            typeof price !== 'number' ||
            typeof status !== 'boolean' ||
            typeof stock !== 'number' ||
            typeof category !== 'string' ||
            !Array.isArray(thumbnails) || !thumbnails.every(thumbnail => typeof thumbnail === 'string')
        ) {
            return res.status(400).json({ message: 'Invalid data'});
        }

        try {
            const products = fileController.readFile();
            const pid = parseInt(req.params.pid, 10);
            const index = products.findIndex(product => product.id === pid);

            if (index !== -1) {
                products[index] = { ...products[index], title, description, code, price, status, stock, category, thumbnails };
                fileController.writeFile(products);
                res.status(200).json({ message: 'Element updated', id: pid });
            } else {
                res.status(404).json({ message: 'Product not found'});
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    },

    deleteProduct: (req, res) => {
        const fileController = new FileController(filePath);

        try {
            const products = fileController.readFile();
            const pid = parseInt(req.params.pid, 10);
            const newProducts = products.filter(product => product.id !== pid);

            if (newProducts.length < products.length) {
                fileController.writeFile(newProducts);
                res.status(200).json({ message: 'Element deleted', id: pid });
            } else {
                res.status(404).json({ message: 'Product not found'});
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    }
};

module.exports = productsController;
