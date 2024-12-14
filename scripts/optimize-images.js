const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDirectory = path.join(__dirname, '../public/images');
const maxWidth = 800;

async function optimizeImage(filePath) {
  const image = sharp(filePath);
  const metadata = await image.metadata();

  if (metadata.width > maxWidth) {
    await image
      .resize(maxWidth, null, { withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer()
      .then(data => fs.writeFileSync(filePath, data));
    
    console.log(`Optimized: ${path.basename(filePath)}`);
  }
}

async function processDirectory() {
  try {
    const files = fs.readdirSync(imageDirectory);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const filePath = path.join(imageDirectory, file);
        await optimizeImage(filePath);
      }
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

processDirectory();
