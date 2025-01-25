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
    if (this.parent) {
      if (this.parent.items[newName]) {
        console.log(`A folder with the name "${newName}" already exists in the parent folder.`);
        return;
      }
      const folderItem = this.parent.items[oldName];
      if (!folderItem) {
        console.log(`Folder with name "${oldName}" not found in parent.`);
        return;
      }
      folderItem.name = newName;
      this.parent.items[newName] = folderItem;
      delete this.parent.items[oldName];
    }

    this.name = newName;
    console.log(`Folder name successfully updated to "${newName}".`);
  }

  /**
* Update name of a file.
* @param {string} oldName - Old file name.
* @param {string} newName - New file name.
*/
  updateNameFile(oldName, newName) {
    if (this.items[newName]) {
      console.log(`A file or folder with the name "${newName}" already exists.`);
      return;
    }

    const fileItem = this.items[oldName];
    if (!fileItem || fileItem instanceof Folder) {
      console.log(`File with name "${oldName}" not found.`);
      return;
    }

    fileItem.name = newName;
    this.items[newName] = fileItem;
    delete this.items[oldName];

    console.log(`File name successfully updated from "${oldName}" to "${newName}".`);
  }

  /**
 * Read the content of a file.
 * @param {string} data - The name of the file to read.
 */
  readFile(data) {
    if (!data || data.length < 1) {
      console.log("No file name provided.");
      return;
    }

    const fileName = data[0];
    const fileItem = this.items[fileName];

    if (!fileItem) {
      console.log(`File with name "${fileName}" not found.`);
      return;
    }

    if (fileItem instanceof Folder) {
      console.log(`"${fileName}" is a folder, not a file.`);
      return;
    }

    console.log(`Content of "${fileName}":`, fileItem.content);
  }

}

module.exports = Folder;
