const fs = require('fs');
const path = require('path');

function getPShop() {
    const filePath = path.join(__dirname, 'data', 'lista.rpg');
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
}

function getPVile(){
    const filePath = path.join(__dirname, 'data', 'plista.rpg');
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
}

module.exports = {
    getPShop,
    getPVile
};