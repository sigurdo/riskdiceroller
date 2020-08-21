class InjectCss {
    constructor(styleTagSelector) {
        this.style = document.querySelector(styleTagSelector);
    }

    add(newCss) {
        this.style.innerHTML += newCss;
    }

    flush() {
        this.style.innerHTML = '';
    }

    replace(newCss) {
        this.style.innerHTML = newCss;
    }

    replaceArr(newCssArr) {
        this.flush();
        for (let i = 0; i < newCssArr.length; i++) {
            this.add(newCssArr[i]);
        }
    }
}

const injectCss = new InjectCss('style#injectCss');

export { InjectCss, injectCss };
