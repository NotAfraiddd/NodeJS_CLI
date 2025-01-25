const readline = require('readline');
const { loadFolderData } = require('./lib/fileManager');
const { addFile, addFolder, removeItem, display, search, navigate, updateNameFolder, updateNameFile } = require('./src/command');

const root = loadFolderData();
let currentFolder = root;
let pathStack = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = `
Commands:
1. add-file                               ==> 1 [name] [content]
2. add-folder [name]                      ==> 2 [name]
3. update-name-file                       ==> 3 [oldFile] [newFile]
4. update-name-folder                     ==> 4 [oldFolder] [newFolder]
5. remove [name]                          ==> 5 [name]
6. display                                ==> 6
7. search [name]                          ==> 7 [name]
8. cd [folderName] / cd ..                ==> 8 cd [folderName] / 6 cd .. ( back to nearest parent directory )
9. exit                                   ==> 9
`;

console.log('Folder Tree CLI');
console.log(commands);

const executeCommand = (input) => {
  const [cmd, ...args] = input.trim().split(' ');

  try {
    switch (cmd) {
      case '1':
        addFile(currentFolder, args);
        break;

      case '2':
        addFolder(currentFolder, args);
        break;

      case '3':
        updateNameFile(currentFolder, args);
        break;

      case '4':
        updateNameFolder(currentFolder, args);
        break;

      case '5':
        removeItem(currentFolder, args);
        break;

      case '6':
        display(currentFolder);
        break;

      case '7':
        search(root, args);
        break;

      case '8':
        currentFolder = navigate(currentFolder, args, pathStack);
        break;

      case '9':
        console.log('Goodbye!');
        rl.close();
        return;

      default:
        console.log('Invalid command.');
    }
  } catch (error) {
    console.error(error.message);
  }
};

rl.on('line', (input) => {
  executeCommand(input);
  console.log(commands);
});
