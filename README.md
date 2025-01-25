# NodeJS_CLI

### How to run

- This is the content in **package.json**
```
{
  "name": "nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
- This is the command to run after opening the terminal in **Visual code**

```
node app.js
```

### Expected

- Create files, update file names, read files, search files and display details of folders containing files or open actual files such as word, pdf, txt,...

- Create folders, update folder names, search for detailed folders,...

- Simple: showing detailed content about capacity,...

### Complete

- Create file/folder.
- Update name file/folder.
- Search name file/folder.
- Show directory structure.
- Delete file/folder.
- Navigate previous/next, or by path folder.
- Read file.
- UI basic.

### Influencing factors

- Don't have much time for task.

### Apply OOP properties to the project

**1. Encapsulation**
Explain: Attributes (name, items, parent,...) and methods (addFile, addFolder, removeItem,...) are encapsulated in classes like **Folder** and **File**.

**2. Inheritance**
Explain: Class **File** và **Folder** are two independent, but extensible, objects.
Ex: You can create a MediaFile class that inherits File to add video/audio playback features.

**3. Polymorphism**
Explain: Perform different behavior based on the class **File** và **Folder** 

**4. Abstraction** 
Explain: Hides the complex details of internal operations, providing only a simple interface through methods.