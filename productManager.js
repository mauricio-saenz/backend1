const path = require('path');
const FileManager = require('./fileManager');

class ProductManager {
    constructor(filePath = 'products.json') {
        this.filePath = path.resolve(filePath);
        this.fileManager = new FileManager(this.filePath);
    }

    addProduct(product) {
        const newProduct = { 
            title: product.title, 
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock 
        };

        try {
            // Obtener los productos actuales del archivo
            const products = this.fileManager.readFile() || [];
            
            // Agregar el nuevo producto a la lista
            products.push(newProduct);
            
            // Guardar los productos actualizados en el archivo
            this.fileManager.write(products); 
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    getProducts() {
        try {
            // Obtener los productos actuales del archivo
            const products = this.fileManager.readFile();
            return products || [];
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    }

    getProductById(id) {
        try {
            // Obtener los productos actuales del archivo
            const products = this.fileManager.readFile() || [];
            console.log(products)
            
            // Buscar el producto por su ID
            const product = products.find(p => p.id === id);
            return product;
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            return null;
        }
    }
}

module.exports = ProductManager;
