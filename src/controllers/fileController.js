const fs = require('fs');

class FileController {
    constructor(filePath) {
        this.filePath = filePath;
    }

    readFile() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error al leer el archivo ${this.filePath}:`, error);
            return null;
        }
    }

    writeFile(newJson) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(newJson, null, 2), 'utf8');
        } catch (error) {
            console.error(`Error al escribir en el archivo ${this.filePath}:`, error);
        }
    }

    watchFile(callback) {
        fs.watch(this.filePath, (eventType, filename) => {
            if (eventType === 'change') {
                console.log(`Archivo ${filename} ha cambiado, actualizando productos...`);
                const data = this.readFile();
                console.log(data);
                if (data) {
                    callback(data);  // Llama al callback con el contenido del archivo
                }
            }
        });

        console.log(`Observando cambios en el archivo ${this.filePath}`);
    }
}

module.exports = FileController;
