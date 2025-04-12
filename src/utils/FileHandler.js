const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/ame-pontos.json');

module.exports = {
  readData: () => JSON.parse(fs.readFileSync(filePath, 'utf-8')),
  
  saveData: (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8')
};
