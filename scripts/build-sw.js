const { injectManifest } = require('workbox-build');
const config = require('../config/workbox-config.js');
const path = require('path');
const fs = require('fs');

async function replaceInstallSW() {
    const filepath = path.join(__dirname, '../dist/scripts/install-sw.js');
    let content = String(await fs.promises.readFile(filepath));
    content = content.replace(/PLZ_DONT_INSTALL_SW/, 'PLZ_INSTALL_SW');
    return fs.promises.writeFile(filepath, content);
}

injectManifest(config);
replaceInstallSW();
