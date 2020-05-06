import compile_hbs from './compile_hbs.js';

async function httpGet(theUrl) {
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

class Router {
    constructor() {
        window.addEventListener('popstate', e => {
            this.popstate(e);
        });
        this.navigate(location.href);
    }

    overrideLinks() {
        const a = document.querySelectorAll('a');
        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', e => {
                e.preventDefault();
                this.navigate(e.target.href);
            });
        }
    }

    async load(url) {
        try {
            const hbs = await httpGet(`${url}index.hbs`);
            compile_hbs(hbs, 'TittEEEEl');
            this.overrideLinks();
        } catch (err) {
            console.error('Could not get', `${url}index.hbs:`, err);
        }
    }

    async navigate(url) {
        history.pushState({ url }, 'Title', url);
        await this.load(url);
    }

    async popstate(e) {
        await this.load(e.state.url);
    }
}

const router = new Router();

export { Router, router };
