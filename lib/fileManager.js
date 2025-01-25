const fs = require('fs');
const Folder = require('../src/Folder');

const loadFolderData = () => {
    if (fs.existsSync('data/folderData.json')) {
        const data = fs.readFileSync('data/folderData.json', 'utf-8');
        return Folder.fromJSON(JSON.parse(data));
    }
    return new Folder('root');
};

const saveFolderData = (folder) => {
    const jsonData = JSON.stringify(folder.toJSON(), null, 2);
    fs.writeFileSync('data/folderData.json', jsonData, 'utf-8');
};

module.exports = { loadFolderData, saveFolderData };
