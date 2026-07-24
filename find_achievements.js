const fs = require('fs');
const content = fs.readFileSync('assets/index-957fd289.js', 'utf8');

const matches = content.match(/\/mulearn-mbccet assets\//g);
if (matches) {
    console.log("Found", matches.length, "occurrences of '/mulearn-mbccet assets/'");
} else {
    console.log("Not found.");
}
