const fs = require('fs');

class FileManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    readFile() {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    writeFile(newJson) {
        fs.writeFileSync(this.filePath, JSON.stringify(newJson, null, 2), 'utf8');
    };
}

module.exports = FileManager;
