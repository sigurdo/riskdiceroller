class Router {
    constructor() {
        window.addEventListener('popstate', e => {
            this.goBack(e);
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
            const hbs = await new Promise((res, rej) => $.get(`${url}index.hbs`, data => res(data)).fail(err => rej(err)));
            contentEl.innerHTML = Handlebars.compile(hbs)(language);
            this.overrideLinks();
        } catch (err) {
            if (err.status === 404) {
                console.log(404);
            }
        }
        console.log('url:', url);
    }

    async navigate(url) {
        history.pushState({ url }, 'Title', url);
        await this.load(url);
    }

    async goBack(e) {
        console.log('baak:', e.state);
        await this.load(e.state.url);
    }
}

const router = new Router();

export { Router, router };
