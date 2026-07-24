const fs = require('fs');
const content = fs.readFileSync('assets/index-957fd289.js', 'utf8');

const updatedContent = content.replace(/\/mulearn-mbccet assets\//g, '/mulearn-mbccet-assets/');
fs.writeFileSync('assets/index-957fd289.js', updatedContent, 'utf8');
console.log("Successfully replaced paths.");
