class InjectCss {
    constructor() {
        this.style = document.querySelector('style#injectCss');
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

const injectCss = new InjectCss();

export default injectCss;
