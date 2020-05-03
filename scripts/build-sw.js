const { injectManifest } = require('workbox-build');
const config = require('../config/workbox-config.js');
const path = require('path');
const fs = require('fs');
const https = require('https');

async function replaceInstallSW() {
    const filepath = path.join(__dirname, '../dist/scripts/install-sw.js');
    let content = String(await fs.promises.readFile(filepath));
    content = content.replace(/PLZ_DONT_INSTALL_SW/, 'PLZ_INSTALL_SW');
    return fs.promises.writeFile(filepath, content);
}

async function createAssetsDir() {
    const dir = path.join(__dirname, '../dist/assets');
    if (!fs.existsSync(dir)) return fs.promises.mkdir(dir);
}

async function downloadAsset(url, filename) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, res => {
            console.log('Downloaded', url.href, 'with status code', res.statusCode);
            let allData = '';
            res.on('data', d => {
                allData += d;
            });
            res.on('error', err => {
                console.log('Error downloading', url.href, ':', err);
            });
            res.on('end', ting => {
                fs.promises.writeFile(path.join(__dirname, `../dist/assets/${filename}`), allData).then(() => resolve());
            });
        });
        req.end();
    });
}

async function buildSW() {
    await createAssetsDir();
    await downloadAsset(new URL('https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js'), 'handlebars.js');
    injectManifest(config);
    replaceInstallSW();
}

buildSW();
