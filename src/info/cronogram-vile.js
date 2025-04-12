const fs = require('fs');
const path = require('path');

function getCronogram() {
    const filePath = path.join(__dirname, 'data', 'cronogram.rpg');
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
}

module.exports = { 
    getCronogram
};
