const { injectManifest } = require('workbox-build');
const config = require('../config/workbox-config.js');

injectManifest(config);
