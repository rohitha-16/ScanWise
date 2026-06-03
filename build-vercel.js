const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname);
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

function removeDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copy(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source path: ${src}`);
  }
  fs.cpSync(src, dest, { recursive: true });
}

removeDirectory(publicDir);
fs.mkdirSync(publicDir, { recursive: true });

console.log('Building production bundle...');
execSync('npx webpack --config webpack.config.js --mode production', { stdio: 'inherit' });

console.log('Copying static files to public directory...');
copy(path.join(root, 'index.html'), path.join(publicDir, 'index.html'));
if (fs.existsSync(path.join(root, 'assets'))) {
  copy(path.join(root, 'assets'), path.join(publicDir, 'assets'));
}
if (fs.existsSync(distDir)) {
  copy(distDir, path.join(publicDir, 'dist'));
}

console.log('Build complete. public directory is ready for Vercel deployment.');
