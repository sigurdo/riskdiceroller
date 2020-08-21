import ssf from './sigurdsStandardFunksjoner.js';

function nullstill() {
    antall = [0, 0];
}

function oppdaterTerningvelger(type) {//Oppdatere, dvs. sjekke om det er mange nok folk på hvert lag til å velge de forskjellige antall terninger
//For grammatikkens skyld legger jeg til en endelse som avhenger av terninger i optionen
    var endelse = ['Ikke i bruk', '']; //Kan legge til endelse for større tall hvis dette skulle være relevant
    for (var i = 2; i <= 10; i++) {
        endelse[i] = 'er';
    }
//Angriperside
    if (type == 0) {
        document.getElementById('antallTerninger0').innerHTML = "";

        /*for (var i = 1; i <= 3; i++) {
            document.getElementById('antallTerninger0'+i).innerHTML = "";
        }*/
        
        for (var i = 10; i >= 1; i--) {
            //console.log(i);
            //document.getElementById('antallTerninger01').style.display = 'none';
            if (antall[0] - 1 >= i) {
                document.getElementById('antallTerninger0').innerHTML += "<option value='"+i+"' id='antallTerninger0"+i+"'> "+i+" Terning"+endelse[i]+" </option>";
            }   
        }

        //Pusher opp antall terninger mot 3
        for (var i = 1; i <= antall[0] - 1 && i <= 3; i++) {
            document.getElementById('antallTerninger0').value = i;
        }
    }

//Forsvarerside
    else if (type == 1) {
        document.getElementById('antallTerninger1').innerHTML = "";
        for (var i = 10; i >= 1; i--) {
            //console.log(i);
            //document.getElementById('antallTerninger01').style.display = 'none';
            if (antall[1] >= i) {
                document.getElementById('antallTerninger1').innerHTML += "<option value='"+i+"' id='antallTerninger1"+i+"'> "+i+" Terning"+endelse[i]+" </option>";
            }
        }

        //Pusher opp antall terninger mot 2
        for (var i = 1; i <= antall[1] && i <= 2; i++) {
            document.getElementById('antallTerninger1').value = i;
        }
    }
}

function tomVarslinger() {
    document.getElementById('varslinger').innerHTML = '';
}

function juster(type, ant, angrep) {//funksjonen juster justerer opp og ned antallet angripere og forsvarere type=0 er angripere og type=1 er forsvarere. var angrep er boolsk og informerer om angrep pågår eller ikke
    //console.log('justerer');
    if (!angrep && angrepPagar) {
        angrepPagarEl[0].style.display = 'none';
        angrepPagarEl[1].style.display = 'none';

        angrepPagar = false;
    }

    var antallFor = [];
    antallFor[type] = antall[type];
    var minimum = 0;
    if (type == 0) {minimum = 1;}
    if(antall[type] + ant >= minimum) {//Denne ifen passer på at man ikke får negativt antall soldater, ettersom dette kan være litt irriterende
        antall[type] += ant;
    }
    else {antall[type] = 0;}//Denne elsen gjør at -5-knappen kan sette tall under 0 til å bli null
    visAntall();

    var antallTerninger = Number(document.querySelector('#antallTerninger'+type).value);
    //console.log(antallTerninger);

    if (!angrep) {//Tanken her er at i slag skal man ikke trenge velge terninger på nytt, men den skal likevel prøve å velge maks antall når man plotter inn nye soldater. Derfor sjekker ifen om man soldatmengden har økt eller sunket
        oppdaterTerningvelger(type);
    }

    if (type == 0 && antallTerninger > antall[type] - 1) {
        oppdaterTerningvelger(type);
    }
    if (type == 1 && antallTerninger > antall[type]) {
        oppdaterTerningvelger(type);
    }
}

function angripereInput() {
    //Det er vanskelig å forklare hvorfor, men det er viktig at alle endringer av soldattall går gjennom juster(), det har blant annet med terningvelgeren å gjøre
    var antFor = antall[0];
    var antEtter = Number(visEl[0].value);
    juster(0, antEtter - antFor, false);
}

function forsvarereInput() {
    //Det er vanskelig å forklare hvorfor, men det er viktig at alle endringer av soldattall går gjennom juster(), det har blant annet med terningvelgeren å gjøre
    var antFor = antall[1];
    var antEtter = Number(visEl[1].value);
    juster(1, antEtter - antFor, false);
}

function visAntall() {
    var divId = ['angrepDiv', 'forsvarDiv'];
    for (var i = 0; i < visEl.length; i++) {
        visEl[i].value = antall[i];

        var divEl = document.querySelectorAll('#'+divId[i]+' .justerAntall div');
        for (var j = 0; j < divEl.length; j++) {
            if (visEl[i].value > 99) {
                if (visEl[i].value > 999) {
                    visEl[i].style.width = '100%';
                    divEl[j].style.display = 'none';
                } else {
                    visEl[i].style.width = '80px';
                    divEl[j].style.display = 'block';
                    divEl[j].style.padding = '4px 8px 4px 8px';
                    divEl[j].style.fontSize = '110%';
                }
            } else {
                visEl[i].style.width = '60px';
                divEl[j].style.display = 'block';
                divEl[j].style.padding = '4px 10px 4px 10px';
                divEl[j].style.fontSize = '147%';
            }
        }
    }
}

function terning() {
    var n = ssf.randInt(1, 6);
    return n
}

function farge(dode) {//Dode er hvor mange som døde for den siden i siste slag (husk at det er -diff)
    //console.log('mekker farge');
    var r = 255 - (0 * dode).toFixed(0);
    var g = 220 - (220 * dode).toFixed(0);
    var b = 0 .toFixed(0);
    return "rgb("+r+", "+g+", "+b+")";
}

function skrivTilSiste(diff) {//diff må være array
    for (var i = 0; i < diff.length; i++) {
        sisteEl[i].innerHTML = diff[i];
        sisteEl[i].style.backgroundColor = farge(diff[i] / (diff[0]+diff[1]));
        sisteEl[i].style.fontSize = '459%';
        if (sisteEl[i].innerHTML.length > 4) {sisteEl[i].style.fontSize = '367%';}
    }
}

function sporBlitz() {
    var sporBlitzEl = document.createElement('div');
    bodyEl.appendChild(sporBlitzEl);
    sporBlitzOppe = true;
    sporBlitzEl.id = 'sporBlitz';
    sporBlitzEl.style.position = 'fixed';
    sporBlitzEl.style.top = '0px';
    sporBlitzEl.style.width = '100%';
    sporBlitzEl.style.height = '100%';
    sporBlitzEl.style.padding = '20px';
    sporBlitzEl.style.backgroundColor = 'white';
    sporBlitzEl.style.fontSize = '30px';
    sporBlitzEl.innerHTML = 'Minimum angripere igjen: <br>';

    var minAngripereEl = document.createElement('select');
    minAngripereEl.id = 'minAngripere';
    minAngripereEl.style.width = '144px';
    minAngripereEl.style.height = '92px';
    minAngripereEl.style.fontSize = '72px';

    for (var i = 1; i <= Math.min(antall[0], 251); i++) {
        var alternativEl = document.createElement('option');
        alternativEl.value = i;
        alternativEl.innerHTML = i;
        minAngripereEl.appendChild(alternativEl);
    }
    sporBlitzEl.appendChild(minAngripereEl);

    sporBlitzEl.innerHTML += '<br><br> Ventetid per angrep: <br>';
    var ventetidEl = document.createElement('select');
    ventetidEl.id = 'ventetid';
    ventetidEl.style.width = '276px';
    ventetidEl.style.height = '92px';
    ventetidEl.style.fontSize = '72px';

    var temp = localStorage.getItem('5QSGeP_valgVentetid');
    if (temp == null) {
        localStorage.setItem('5QSGeP_valgVentetid', JSON.stringify([
            {navn: 'Ingen', ms: 0, def: false},
            {navn: 'Kort', ms: 250, def: false},
            {navn: 'Middels', ms: 750, def: true},
            {navn: 'Lang', ms: 3144, def: false},
            {navn: 'Episk', ms: 6288, def: false}
        ]));
        ventetidAlternativer = JSON.parse(localStorage.getItem('5QSGeP_valgVentetid'));
    }
    else {
        ventetidAlternativer = JSON.parse(temp);
    }
    //console.log(JSON.parse(localStorage.getItem('5QSGeP_valgVentetid')));

    /*var ventetidAlternativer = [
        {navn: 'Ingen', ms: 0},
        {navn: 'Kort', ms: 250},
        {navn: 'Middels', ms: 500},
        {navn: 'Lang', ms: 1000},
        {navn: 'Episk', ms: 2000}
    ];*/

    for (var i = 0; i < ventetidAlternativer.length; i++) {
        var alternativEl = document.createElement('option');
        alternativEl.innerHTML = ventetidAlternativer[i].navn;
        alternativEl.value = i;
        if (ventetidAlternativer[i].def) {
            var defNr = i;
        }
        //console.log(Number(alternativEl.value));
        ventetidEl.appendChild(alternativEl);
    }

    sporBlitzEl.appendChild(ventetidEl);

    var defMinAng = localStorage.getItem('5QSGeP_defMinAng');
    if (defMinAng == null) {
        localStorage.setItem('5QSGeP_defMinAng', 3);
        defMinAng = localStorage.getItem('5QSGeP_defMinAng');
    }

    document.querySelector('#minAngripere').value = defMinAng;
    if (antall[0] < defMinAng) {document.querySelector('#minAngripere').value = antall[0];}
    document.querySelector('#ventetid').value = defNr;

    sporBlitzEl.appendChild(document.createElement('br'));
    sporBlitzEl.appendChild(document.createElement('br'));

    var avbrytKnapp = document.createElement('button');
    avbrytKnapp.style.fontSize = '50px';
    avbrytKnapp.style.margin = '5px';
    avbrytKnapp.style.padding = '10px';
    /*avbrytKnapp.style.color = 'white';
    avbrytKnapp.style.backgroundColor = '#ff5722';*/
    avbrytKnapp.style.borderRadius = '12px';
    avbrytKnapp.style.border = 'none';
    avbrytKnapp.style.cursor = 'pointer';
    avbrytKnapp.innerHTML = 'Avbryt';
    avbrytKnapp.addEventListener('click', function () {
        bodyEl.removeChild(sporBlitzEl);
        sporBlitzOppe = false;
    });
    sporBlitzEl.appendChild(avbrytKnapp);

    var blitzKnapp = document.createElement('button');
    blitzKnapp.style.fontSize = '50px';
    blitzKnapp.style.margin = '5px';
    blitzKnapp.style.padding = '10px';
    blitzKnapp.style.color = 'white';
    blitzKnapp.style.backgroundColor = '#ff5722';
    blitzKnapp.style.borderRadius = '12px';
    blitzKnapp.style.border = 'none';
    blitzKnapp.style.cursor = 'pointer';
    blitzKnapp.innerHTML = 'Blitz';
    blitzKnapp.addEventListener('click', function () {
        var minAngripere = Number(document.querySelector('#minAngripere').value);
        var ventetid = ventetidAlternativer[Number(document.querySelector('#ventetid').value)].ms;
        //var ventetid = document.querySelector('#ventetidId').value;
        bodyEl.removeChild(sporBlitzEl);
        sporBlitzOppe = false;
        angripBlitz(minAngripere, ventetid);
    });
    sporBlitzEl.appendChild(blitzKnapp);
}

function angripGenerell(antallAngripere, antallForsvarere) {
    document.getElementById('visTerninger0').innerHTML = '';
    var a =[];
    for (var i = 0; i < antallAngripere; i++) {
        a[i] = terning();
        document.getElementById('visTerninger0').innerHTML += '<img src="'+d[a[i]]+'" id="a'+i+'">';
    }

    document.getElementById('visTerninger1').innerHTML = '';
    var f = [];
    for (var i = 0; i < antallForsvarere; i++) {
        f[i] = terning();
        document.getElementById('visTerninger1').innerHTML += '<img src="'+d[f[i]]+'" id="f'+i+'">';
    }

    a.sort(function(a, b) {return b - a;});
    f.sort(function(a, b) {return b - a;});

    for (var i = 0; i < a.length && i < f.length; i++) {
        if (a[i] > f[i]) {juster(1, -1, true);}
        else {juster(0, -1, true);}
    }
}

function stopp() {
    blitzing = false;
    stoppEl.style.display = 'none';
}

function angrip() {
    //console.log('angrip');
    if(antall[0] > 1 && antall[1] > 0) {
        if (!angrepPagar) {
            rundeNr = 0;
            antallStart[0] = antall[0];
            antallStart[1] = antall[1];

            angrepPagarEl[0].style.display = 'block';
            angrepPagarEl[1].style.display = 'block';

            angrepPagar = true;
        }
        rundeNr++;

        tomVarslinger();
        var antAfor = antall[0];
        var antFfor = antall[1];

    //Kaster terninger
        var antallTerninger0 = Number(document.querySelector('#antallTerninger0').value);
        var antallTerninger1 = Number(document.querySelector('#antallTerninger1').value);

        angripGenerell(antallTerninger0, antallTerninger1);

        var diff = [antall[0] - antAfor, antall[1] - antFfor];
        skrivTilSiste(diff);

        function skrivTot(nr) {
            if (nr == rundeNr) {
                var diff2 = [antall[0] - antallStart[0], antall[1] - antallStart[1]];
                skrivTilSiste(diff2);
            }
        }

        setTimeout(skrivTot, 1500, rundeNr);
    }
}

function angripBlitz(minAngripere, ventetid) {
    bakgrunnsmusikkEl.setAttribute('loop', '');
    bakgrunnsmusikkEl.currentTime = 38.3;
    bakgrunnsmusikkEl.play();

    stoppEl.style.display = 'block';
    angripEl.style.display = 'none';
    blitzEl.style.display = 'none';

    blitzing = true;
    
    function ferdig() {
        stoppEl.style.display = 'none';
        angripEl.style.display = 'block';
        blitzEl.style.display = 'block';

        if (bakgrunnsmusikkEl.currentTime < 104.5) {
            bakgrunnsmusikkEl.currentTime = 104.5;
        }

        bakgrunnsmusikkEl.removeAttribute('loop');
    }

    function runde() {
        if (antall[0] > minAngripere + 1 && antall[1] > 0 && blitzing) {
            angrip();
            setTimeout(runde, ventetid);
        } else {
            ferdig();
        }
    }

    runde();
}

function knappNed(e) {
    //console.log(e.keyCode);
    var k = e.keyCode;
    var b = String.fromCharCode(k);
    if (k == 32 && !sporBlitzOppe) {angrip();}
    if (k == 32 && sporBlitzOppe) {
        var sporBlitzEl = document.querySelector('#sporBlitz');
        var minAngripere = Number(document.querySelector('#minAngripere').value);
        var ventetid = ventetidAlternativer[Number(document.querySelector('#ventetid').value)].ms;
        //var ventetid = document.querySelector('#ventetidId').value;
        bodyEl.removeChild(sporBlitzEl);
        sporBlitzOppe = false;
        angripBlitz(minAngripere, ventetid);
    }
    if (k == 8 && sporBlitzOppe) {
        var sporBlitzEl = document.querySelector('#sporBlitz');
        bodyEl.removeChild(sporBlitzEl);
        sporBlitzOppe = false;
    } else if (k == 8) {
        stopp();
    }
    if (k == 13 && !sporBlitzOppe && !blitzing) {sporBlitz();}
    if (b == 'Q') {juster(0, -1, false);}
    if (b == 'A') {juster(0, -5, false);}
    if (b == 'E') {juster(0, +1, false);}
    if (b == 'D') {juster(0, +5, false);}
    if (b == 'U') {juster(1, -1, false);}
    if (b == 'J') {juster(1, -5, false);}
    if (b == 'O') {juster(1, +1, false);}
    if (b == 'L') {juster(1, +5, false);}
}

var antall; //Antall angripere og forsvarere som array (angripere er nr. 0 og forsvar nr. 1)
var terninger;

var d; //Dette er en array med filadressene til terningbildene
var blitzing;
var angrepPagar;
var antallStart; //Passer på hvor mange det var da et angrep starta
var rundeNr; //Teller antall sammenhegende angrep
var sporBlitzOppe;
var ventetidAlternativer;


//HTML-elementer:
var bodyEl;
var visEl;
var angrepPagarEl;
var sisteEl;
var visTerningerEl;
var stoppEl;
var angripEl;
var blitzEl;
var bakgrunnsmusikkEl;

function oppstart() {
    //Globale variabler:
    antall = [1, 0]; //Antall angripere og forsvarere som array (angripere er nr. 0 og forsvar nr. 1)
    terninger = [3, 2];

    d = ['ikke_i_bruk']; //Dette er en array med filadressene til terningbildene
    for (var i = 1; i <= 6; i++) {d[i] = 'media/d'+i+'.png';}
    //evt: var d = ["ikke_i_bruk", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Dice-1-b.svg/557px-Dice-1-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Dice-2-b.svg/557px-Dice-2-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dice-3-b.svg/557px-Dice-3-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Dice-4-b.svg/557px-Dice-4-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Dice-5-b.svg/557px-Dice-5-b.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Dice-6a-b.svg/557px-Dice-6a-b.svg.png"];

    blitzing = false;
    angrepPagar = false;
    antallStart = [0, 0]; //Passer på hvor mange det var da et angrep starta
    rundeNr = 0; //Teller antall sammenhegende angrep
    sporBlitzOppe = false;
    ventetidAlternativer = [];


    //HTML-elementer:
    bodyEl = document.querySelector('body');
    visEl = [document.getElementById('vis0'), document.getElementById('vis1')];
    angrepPagarEl = [document.querySelector('#angrepPagar0'), document.querySelector('#angrepPagar1')];
    sisteEl = [document.getElementById('siste0'), document.getElementById('siste1')];
    visTerningerEl = [document.getElementById('visTerninger0'), document.getElementById('visTerninger1')];
    stoppEl = document.querySelector('#stopp');
    angripEl = document.querySelector('#angrip');
    blitzEl = document.querySelector('#blitz');
    bakgrunnsmusikkEl = document.querySelector('#bakgrunnsmusikk');


    //Lyttere:
    bodyEl.addEventListener('keydown', knappNed);


    //Funksjonskall:
    visAntall();
    oppdaterTerningvelger();
}

export {
    nullstill,
    oppdaterTerningvelger,
    tomVarslinger,
    juster,
    angripereInput,
    forsvarereInput,
    visAntall,
    terning,
    farge,
    skrivTilSiste,
    sporBlitz,
    angripGenerell,
    stopp,
    angrip,
    angripBlitz,
    knappNed,
    oppstart
};
