const File = require('./File');

class Folder {
  constructor(name, parent = null) {
    this.name = name;
    this.items = {};
    this.parent = parent;
  }

  /**
   * Add new file
   * @param {string} fileName 
   * @param {string} content 
   */
  addFile(fileName, content = '') {
    if (this.items[fileName]) {
      throw new Error(`File or folder with name "${fileName}" already exists.`);
    }
    this.items[fileName] = new File(fileName, content);
  }

  /**
   * Add new folder
   * @param {Folder} folderName 
   */
  addFolder(folderName) {
    if (this.items[folderName]) {
      throw new Error(`Folder with name "${folderName}" already exists.`);
    }
    this.items[folderName] = new Folder(folderName, this);
  }

  /**
   * Remove an item (file or folder) from the current folder by name.
   * @param {string} name 
   * @throws {Error} - Throws an error if the item does not exist.
   */
  removeItem(name) {
    if (!this.items[name]) {
      throw new Error(`Item with name "${name}" does not exist.`);
    }
    delete this.items[name];
  }

  /**
   * Search for an item (file or folder)
   * @param {string} name 
   * @returns Returns the found File or Folder if found
   */
  search(name) {
    if (this.items[name]) {
      return this.items[name];
    }
    for (const key in this.items) {
      if (this.items[key] instanceof Folder) {
        const result = this.items[key].search(name);
        if (result) return result;
      }
    }
    return null;
  }

  /**
   * Display the current folder and a tree-like structure.
   * @param {number} indent 
   */
  display(indent = 0) {
    console.log(`${'  '.repeat(indent)}- ${this.name}/`);
    for (const key in this.items) {
      if (this.items[key] instanceof Folder) {
        this.items[key].display(indent + 1);
      } else {
        console.log(`${'  '.repeat(indent + 1)}- ${this.items[key].name}`);
      }
    }
  }

  /**
   * Convert the Folder object into a JSON representation.
   * @returns {Object} - A plain object representing the Folder.
   */
  toJSON() {
    const items = {};
    for (const key in this.items) {
      items[key] = this.items[key] instanceof Folder ? this.items[key].toJSON() : this.items[key];
    }
    return { name: this.name, items };
  }

  /**
   * Reconstruct a Folder object from a JSON representation.
   * @param {Object} json - The JSON object representing a folder and its items.
   * @returns {Folder} - A Folder instance reconstructed from the JSON data.
   */
  static fromJSON(json) {
    const folder = new Folder(json.name);
    for (const key in json.items) {
      if (json.items[key].items) {
        folder.items[key] = Folder.fromJSON(json.items[key]);
      } else {
        folder.items[key] = new File(key, json.items[key].content);
      }
    }
    return folder;
  }

  /**
   * Move to a subfolder or parent folder
   * @param {string} target
   * @param {Array} pathStack
   * @returns {Folder} - The current folder after navigation.
   */
  navigateFolder(target, pathStack) {
    if (target === '..') {
      if (pathStack.length > 0) {
        let prevFolder = pathStack.pop();
        console.log(`Moved to folder "${prevFolder.name}".`);
        return prevFolder;
      } else {
        console.log('Already at the root folder.');
      }
    } else {
      const path = target.split('/');
      let tempFolder = this;

      for (const folderName of path) {
        if (tempFolder.items[folderName] && tempFolder.items[folderName] instanceof Folder) {
          pathStack.push(tempFolder);
          tempFolder = tempFolder.items[folderName];
        } else {
          console.log(`Folder "${folderName}" does not exist.`);
          return tempFolder;
        }
      }

      console.log(`Moved to folder "${tempFolder.name}".`);
      return tempFolder;
    }
  }

  /**
   * Update name folder
   * @param {string} oldName - Old folder name.
   * @param {string} newName - New folder name.
   */
  updateNameFolder(oldName, newName) {
    if (this.items[newName]) {
      console.log(`A folder with the name "${newName}" already exists.`);
      return;
    }

    const folderItem = this.items[oldName];
    folderItem.name = newName;
    this.items[newName] = folderItem;
    delete this.items[oldName];

    console.log(`Folder name updated from "${oldName}" to "${newName}".`);
  }
}

module.exports = Folder;
