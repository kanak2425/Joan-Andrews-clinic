const fs = require('fs');
const html = fs.readFileSync('/tmp/chatgpt.html', 'utf8');

const titleMatch = html.match(/<title>(.*?)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'None');

const oaiMatches = html.match(/https:\/\/[a-zA-Z0-9.\-_]*oaiusercontent\.com[^\s"'\\]+/g) || [];
console.log('oaiMatches:', [...new Set(oaiMatches)]);

// Check for any images in general
const allImages = html.match(/https:\/\/[^\s"'<>]+\.(png|jpg|jpeg|webp)/gi) || [];
console.log('All image urls:', [...new Set(allImages)].slice(0, 20));

// Search for conversation content
const lines = html.split('\n');
for (const line of lines) {
  if (line.includes('teeth') || line.includes('tooth') || line.includes('enamel') || line.includes('animation') || line.includes('Denture') || line.includes('denture')) {
    console.log('Found line snippet:', line.slice(0, 300));
    break;
  }
}
