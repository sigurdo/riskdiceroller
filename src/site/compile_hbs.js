import { localConfig } from './settings/local_config.js';

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

function compile_hbs(content) {
    const languages = localConfig.get('languages');
    const chosenLanguage = localConfig.get('chosenLanguage');
    const options = {
        language: languages[chosenLanguage],
        languages,
        chosenLanguage
    };
    return Handlebars.compile(content)(options);
}

export default compile_hbs;
