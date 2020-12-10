// import libs 
const fs = require('fs');
const path = require('path');

// import utility functions 
const generateRandomId = require('../utils/generateRandomId.js');

async function addImage(image, filePath) {
  let imageFullPath;
 
  let fileName = `${generateRandomId(12)}__${image.name}`;
  // read image data
  let imageData = await fs.promises.readFile(image.path);
  imageFullPath = path.join(filePath, fileName);

  // create directory if not exists
  if(!fs.existsSync(filePath)) await fs.promises.mkdir(filePath, { recursive: true });

  // write to disk
  fs.promises.writeFile(imageFullPath, imageData);

  return imageFullPath
}

module.exports = addImage;