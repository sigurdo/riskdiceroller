import * as generalFunctions from './js/generalFunctions.js';

class Battle {
    constructor() {
        generalFunctions.oppstart();
        this.addEventListeners();
    }

    addEventListeners() {
        const buttonsAttacker = document.querySelectorAll('#angrepDiv>div>.justerAntall>div');
        for (let i = 0; i < buttonsAttacker.length; i++) {
            buttonsAttacker[i].addEventListener('click', () => generalFunctions.juster(0, Number(buttonsAttacker[i].innerHTML), false));
        }
        const buttonsDefender = document.querySelectorAll('#forsvarDiv>div>.justerAntall>div');
        for (let i = 0; i < buttonsDefender.length; i++) {
            buttonsDefender[i].addEventListener('click', () => generalFunctions.juster(1, Number(buttonsDefender[i].innerHTML), false));
        }
        document.querySelector('#angrip').addEventListener('click', () => generalFunctions.angrip());
        document.querySelector('#blitz').addEventListener('click', () => generalFunctions.sporBlitz());
        document.querySelector('#stopp').addEventListener('click', () => generalFunctions.stopp());
    }
}

async function main() {
    const battle = new Battle();
}

export default main;
