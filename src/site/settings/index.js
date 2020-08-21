import { localConfig } from './local_config.js';
import { router } from '/router.js';
async function main () {
    const languages = await localConfig.get('languages');
    for (let key in languages) {
        document.querySelector(`[name=languages_${key}]`)
            .addEventListener('submit', e => {
                e.preventDefault();
                for (let keyy in languages[key]) {
                    languages[key][keyy] = document.forms[`languages_${key}`][keyy].value;
                }
                localConfig.set('languages', languages);
                router.reload();
            });
    }
    document.querySelector('form[name="chosenLanguage"]')
        .addEventListener('submit', e => {
            e.preventDefault();
            const el = document.forms['chosenLanguage']['chosenLanguage'];
            localConfig.set('chosenLanguage', el.options[el.selectedIndex].value);
            router.reload();
        });
}

export { main };
