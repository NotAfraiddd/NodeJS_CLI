const fs = require('fs');
const Folder = require('./src/Folder');

const loadFolderData = () => {
  if (fs.existsSync('folderData.json')) {
    const data = fs.readFileSync('folderData.json', 'utf-8');
    return Folder.fromJSON(JSON.parse(data));
  }
  return new Folder('root');
};

const saveFolderData = (folder) => {
  const jsonData = JSON.stringify(folder.toJSON(), null, 2);
  fs.writeFileSync('folderData.json', jsonData, 'utf-8');
};

const root = loadFolderData();
let currentFolder = root;
let pathStack = [];

const readline = require('readline');
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

// CLI handler
const executeCommand = (input) => {
  const [cmd, ...args] = input.trim().split(' ');

  try {
    switch (cmd) {
      case '1': // Add file
        currentFolder.addFile(args[0], args.slice(1).join(' '));
        console.log(`File "${args[0]}" added.`);
        saveFolderData(root);
        break;

      case '2': // Add folder
        currentFolder.addFolder(args[0]);
        console.log(`Folder "${args[0]}" added.`);
        saveFolderData(root);
        break;

      case '3': // Remove item
        currentFolder.removeItem(args[0]);
        console.log(`Item "${args[0]}" removed.`);
        saveFolderData(root);
        break;

      case '4': // Display current folder
        console.log(`Current folder: ${currentFolder.name}`);
        currentFolder.display();
        break;

      case '5': // Search
        const result = root.search(args[0]);
        if (result) {
          console.log(`Found: ${result.name}`);
        } else {
          console.log(`"${args[0]}" not found.`);
        }
        break;

      case '6': // navigate
        if (args[0] === 'cd') {
          const target = args.slice(1).join(' ');
          currentFolder = currentFolder.navigateFolder(target, pathStack);
        } else {
          console.log('Invalid command. Use "6 cd <folder>" to navigate.');
        }
        break;

      case '7': // Exit
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

console.log('Folder Tree CLI');
console.log(commands);

rl.on('line', (input) => {
  executeCommand(input);
  console.log(commands);
});
