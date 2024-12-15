const fs = require('fs');
const path = require('path');

const devOnlyPath = path.resolve(__dirname, './dev-only.txt');
const isDev = fs.existsSync(devOnlyPath);

if (isDev) {
  devInit();
  process.exit(0);
}

const installScriptPath = path.resolve(__dirname, './build/install.js');
require(installScriptPath);

function devInit () {
  const { execSync } = require('child_process');

  try {
    const output = execSync('npm run dev:setup', { stdio: 'inherit' });
    console.log(output);
  } catch (error) {
      console.error(error.message);
      process.exit(1);
  }
}
