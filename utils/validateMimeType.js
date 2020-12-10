function validateMimeType(image) {
  let validMimeTypes = [
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/x-icon",
  ];

  return validMimeTypes.includes(image.type)
}

module.exports = validateMimeType;