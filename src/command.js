/**
 * Add a file to the folder.
 * @param {Folder} folder
 * @param {Array} args
 */
const addFile = (folder, args) => {
    folder.addFile(args[0], args.slice(1).join(' '));
    console.log(`File "${args[0]}" added.`);
};

/**
 * Add a subfolder to the folder.
 * @param {Folder} folder
 * @param {Array} args
 */
const addFolder = (folder, args) => {
    folder.addFolder(args[0]);
    console.log(`Folder "${args[0]}" added.`);
};

/**
 * Update name folder.
 * @param {Folder} folder
 * @param {Array} args
 */
const updateNameFolder = (folder, args) => {
    const oldName = args[0];
    const newName = args[1];

    folder.updateNameFolder(oldName, newName);
    console.log(`Folder "${oldName}" updated to "${newName}".`);
};

/**
 * Update name file.
 * @param {Folder} folder
 * @param {Array} args
 */
const updateNameFile = (folder, args) => {
    const oldName = args[0];
    const newName = args[1];

    folder.updateNameFile(oldName, newName);
    console.log(`File  "${oldName}" updated to "${newName}".`);
};

/**
 * Remove an item from the folder.
 * @param {Folder} folder
 * @param {Array} args
 */
const removeItem = (folder, args) => {
    folder.removeItem(args[0]);
    console.log(`Item "${args[0]}" removed.`);
};

/**
 * Display the contents of the folder.
 * @param {Folder} folder
 */
const display = (folder) => {
    console.log(`Current folder: ${folder.name}`);
    folder.display();
};

/**
 * Search for an item by name.
 * @param {Folder} root
 * @param {Array} args
 */
const search = (root, args) => {
    const result = root.search(args[0]);
    console.log(result ? `Found: ${result.name}` : `"${args[0]}" not found.`);
};

/**
 * Navigate to a subfolder or parent folder.
 * @param {Folder} folder
 * @param {Array} args
 * @param {Array} pathStack
 * @returns {Folder}
 */
const navigate = (folder, args, pathStack) => {
    const target = args.slice(1).join(' ');
    return folder.navigateFolder(target, pathStack);
};

module.exports = { addFile, addFolder, removeItem, display, search, navigate, updateNameFolder, updateNameFile };
