const readline = require('readline');
const { loadFolderData } = require('./lib/fileManager');
const { addFile, addFolder, removeItem, display, search, navigate } = require('./src/command');

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
3. remove [name]                          ==> 3 [name]
4. display                                ==> 4
5. search [name]                          ==> 5 [name]
6. cd [folderName] / cd ..                ==> 6 cd [folderName] / 6 cd .. ( back to nearest parent directory )
7. exit                                   ==> 7
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
        removeItem(currentFolder, args);
        break;

      case '4': 
        display(currentFolder);
        break;

      case '5': 
        search(root, args);
        break;

      case '6': 
        currentFolder = navigate(currentFolder, args, pathStack);
        break;

      case '7': 
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
