import { localConfig } from './settings/local_config.js';

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

async function compile_hbs(content, title) {
    const contentEl = document.querySelector('#content');
    const staticTextEl = document.querySelector('#static-text');
    const languages = localConfig.get('languages');
    const chosenLanguage = localConfig.get('chosenLanguage');
    const options = {
        language: languages[chosenLanguage],
        languages,
        chosenLanguage
    };
    contentEl.innerHTML = Handlebars.compile(content)(options);
    staticTextEl.style.display = 'none';
    contentEl.style.display = 'block';
}

export default compile_hbs;
