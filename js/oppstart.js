//Globale variabler:
var antall = [0, 0]; //Antall angripere og forsvarere som array (angripere er nr. 0 og forsvar nr. 1)
var terninger = [3, 2];
var d = ["ikke_i_bruk", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Dice-1-b.svg/557px-Dice-1-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Dice-2-b.svg/557px-Dice-2-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dice-3-b.svg/557px-Dice-3-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Dice-4-b.svg/557px-Dice-4-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Dice-5-b.svg/557px-Dice-5-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Dice-6a-b.svg/557px-Dice-6a-b.svg.png"];
var blitzing = true;
var bodyEl = document.querySelector('body');
var stoppEl = document.querySelector('#stopp');

//Funksjonskall:
visAntall();
oppdaterTerningvelger();