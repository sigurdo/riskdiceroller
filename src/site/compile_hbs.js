import { localConfig } from './settings/local_config.js';

async function compile_hbs(content, title) {
    const contentEl = document.querySelector('#content');
    const staticTextEl = document.querySelector('#static-text');
    const languages = localConfig.get('languages');
    const chosenLanguage = localConfig.get('chosenLanguage');
    const options = {
        language: languages[chosenLanguage],
        languages
    };
    contentEl.innerHTML = Handlebars.compile(content)(options);
    staticTextEl.style.display = 'none';
    contentEl.style.display = 'block';
}

export default compile_hbs;
