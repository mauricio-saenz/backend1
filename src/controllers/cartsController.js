const FileController = require('./fileController');
const path = require('path');
const filePath = path.resolve('src/json/carts.json');

const cartsController = {

    createCart: (req, res) => {
        const fileController = new FileController(filePath);

        const { products } = req.body;

        if (
            !Array.isArray(products) || !products.every(product => product.id > 0 && product.quantity > 0)
        ) {
            return res.status(400).json({ message: 'Invalid data'});
        }

        try {
            const carts = fileController.readFile();
            const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

            const newElement = {
                id: newId,
                products 
            };

            carts.push(newElement);
            fileController.writeFile(carts);

            res.status(200).json({ message: 'Element added', id: newId });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    },

    getCartById: (req, res) => {
        const fileController = new FileController(filePath);

        try {
            const carts = fileController.readFile();
            const cid = parseInt(req.params.cid, 10);
            const result = carts.find(cart => cart.id === cid);

            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: 'Cart not found'});
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    },

    addProductToCart: (req, res) => {
        const fileController = new FileController(filePath);

        const { quantity } = req.body;

        if (quantity < 0) {
            return res.status(400).json({ message: 'Invalid data'});
        }

        try {
            const carts = fileController.readFile();
            const cid = parseInt(req.params.cid, 10);
            const pid = parseInt(req.params.pid, 10);
            const cart = carts.find(cart => cart.id === cid);

            const index = cart.products.findIndex(productElement => productElement.id === pid);

            if (index === -1) {

                const newElement = {
                    id:pid,
                    quantity 
                };
    
                cart.products.push(newElement);

            } else {

                cart.products[index].quantity += quantity; 

            }

            fileController.writeFile(carts);

            res.status(200).json({ message: 'Element added', id: newId });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    }

};

module.exports = cartsController;
