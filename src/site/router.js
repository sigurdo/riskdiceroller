import compile_hbs from './compile_hbs.js';

async function httpGet(theUrl) {
    if (theUrl[0] === '.') theUrl = `${location.href}${theUrl}`;
    else if (theUrl[0] === '/') theUrl = `${new URL(location.href).origin}${theUrl}`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
    return await new Promise((res, rej) => {
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200)
                    res(xmlHttp.responseText);
                else
                    rej({ status: xmlHttp.status });
            }
        }
    });
}

const pathModules = {
    '/': '',
    '/battle/': 'battle',
    '/settings/': 'settings',
    '/territories/': 'territories',
    '/tutorial/': 'tutorial'
} 

const moduleUrls = {
    '': {
        path: '/',
        hbs: '/index.hbs',
        js: '/index.js'
    },
    battle: {
        path: '/battle/',
        hbs: '/battle/index.hbs',
        js: '/battle/index.js'
    },
    settings: {
        path: '/settings/',
        hbs: '/settings/index.hbs',
        js: '/settings/index.js'
    },
    territories: {
        path: '/territories/',
        hbs: '/territories/index.hbs',
        js: '/territories/index.js',
    },
    tutorial: {
        path: '/tutorial/',
        hbs: '/tutorial/index.hbs',
        js: '/tutorial/index.js',
    }
}

const modules = {};

class Router {
    constructor() {
        window.addEventListener('popstate', e => {
            this.popstate(e);
        });
        const promises = [];
        for (let key in moduleUrls) {
            for (let keyy in moduleUrls[key]) {
                promises.push(this.loadJsHbs(moduleUrls[key][keyy]));
            }
        }

        Promise.all(promises).then((values) => {
            for (let key in moduleUrls) {
                modules[key] = {};
                for (let keyy in moduleUrls[key]) {
                    modules[key][keyy] = values.shift();
                }
            }
            const url = new URL(location.href);
            const moduleName = pathModules[url.pathname];
            this.navigateModule(moduleName || '');
        });
    }

    overrideLinks() {
        const a = document.querySelectorAll('a');
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', e => {
                const href = e.target.href;
                const moduleName = e.target.getAttribute('data-modulename');
                if (moduleName) {
                    e.preventDefault();
                    this.navigateModule(moduleName, href);
                }
            });
        }
    }

    loadModule(moduleName) {
        this.moduleName = moduleName;
        const hbs = modules[moduleName].hbs;
        compile_hbs(hbs, 'yo');
        this.overrideLinks();
        const js = modules[moduleName].js;
        js();
    }

    async loadJs(url) {
        try {
            return (await import(url)).default;
        }
        catch (err) {
            console.log('error:', err);
        }
    }

    async loadHbs(url) {
        try {
            const hbs = await httpGet(url);
            return hbs;
        }
        catch (err) { console.log('error:', err); }
    }

    async loadJsHbs(url) {
        const ext = url.split('.')[url.split('.').length-1];
        if (ext === 'js') return this.loadJs(url);
        else return this.loadHbs(url);
    }

    async load(url) {
        const t = new Date();
        this.url = url;
        try {
            const hbs = await httpGet(`${url}index.hbs`);
            compile_hbs(hbs, 'TittEEEEl');
            this.overrideLinks();
        } catch (err) {
            console.error('Could not get', `${url}index.hbs:`, err);
        }
        try { (await import(`${url}index.js`)).default(); }
        catch (err) { console.error('Could not import', `${url}index.js:`, err); }
        const s = new Date();
        console.log('Tid brukt på lasting:', s.getTime() - t.getTime(), 'ms');
    }

    async navigate(url) {
        history.pushState({ url }, 'Title', url);
        await this.load(`${url[0] === '.' ? location.href : ''}${url}`);
    }

    async navigateModule(moduleName, url) {
        history.pushState({ moduleName }, moduleName, url || moduleUrls[moduleName].path);
        this.loadModule(moduleName);
    }

    async reload() {
        await this.loadModule(this.moduleName);
    }

    async popstate(e) {
        if (e.state) await this.loadModule(e.state.moduleName);
    }
}

const router = new Router();

export { Router, router };
