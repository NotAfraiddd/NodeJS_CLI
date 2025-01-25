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
1. add-file                               ==> a-file [name] [content]
2. add-folder                             ==> a-folder [name]
3. update-name-file                       ==> u-file [oldFile] [newFile]
4. update-name-folder                     ==> u-folder [oldFolder] [newFolder]
5. read file                              ==> r-file [name-file]
6. delete                                 ==> d [name file/folder]
7. display                                ==> show
8. search                                 ==> s [name file/folder]
9. cd [folderName] / cd ..                ==> g-cd [folderName] / go cd .. ( back to nearest parent directory )
10. exit                                  ==> e
`;

console.log('Folder Tree CLI');
console.log(commands);

const executeCommand = (input) => {
  const [cmd, ...args] = input.trim().split(' ');

  try {
    console.log(cmd);

    switch (cmd) {
      case 'a-file':
        addFile(currentFolder, args);
        break;

      case 'a-folder':
        addFolder(currentFolder, args);
        break;

      case 'u-file':
        updateNameFile(currentFolder, args);
        break;

      case 'u-folder':
        updateNameFolder(currentFolder, args);
        break;

      case 'r-file':
        currentFolder.readFile(args);
        break;

      case 'd':
        removeItem(currentFolder, args);
        break;

      case 'show':
        display(currentFolder);
        break;

      case 's':
        search(root, args);
        break;

      case 'g':
        currentFolder = navigate(currentFolder, args, pathStack);
        break;

      case 'e':
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
