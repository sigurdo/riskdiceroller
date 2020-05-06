import * as defaults from './defaults/index.js';

function fillObject(obj, defaults, values) {
    if (!values) values = {};
    for (let key in defaults) {
        if (typeof defaults[key] === 'object') {
            obj[key] = {};
            fillObject(obj[key], defaults[key], values[key]);
        }
        else {
            obj[key] = values[key] || defaults[key];
        }
    }
    return obj;
}

class LocalConfig {
    constructor() {
        this.set('languages', fillObject({}, defaults.languages, this._get('languages')));
    }

    set(opt, newVal) {
        localStorage.setItem(`config_${opt}`, JSON.stringify(newVal));
    }

    _get(opt) {
        return JSON.parse(localStorage.getItem(`config_${opt}`));
    }

    get(opt) {
        const val = this._get(opt);
        if (val !== null) return val;
        this.set(opt, this.defaults(opt));
        return this._get(opt);
    }

    defaults(opt) {
        return defaults[opt];
    }
}

const localConfig = new LocalConfig();

export { LocalConfig, localConfig };
