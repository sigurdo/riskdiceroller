function nullstill() {
	antall = [0, 0];
}

function oppdaterTerningvelger(type) {//Oppdatere, dvs. sjekke om det er mange nok folk på hvert lag til å velge de forskjellige antall terninger
//For grammatikkens skyld legger jeg til en endelse som avhenger av terninger i optionen
	var endelse = ['Ikke i bruk', '', 'er', 'er']; //Kan legge til endelse for større tall hvis dette skulle være relevant
//Angriperside
	if (type == 0) {
		document.getElementById('antallTerninger0').innerHTML = "";

		/*for (var i = 1; i <= 3; i++) {
			document.getElementById('antallTerninger0'+i).innerHTML = "";
		}*/
		
		for (var i = 3; i >= 1; i--) {
			//console.log(i);
			//document.getElementById('antallTerninger01').style.display = 'none';
			if (antall[0] - 1 >= i) {
				document.getElementById('antallTerninger0').innerHTML += "<option value='"+i+"' id='antallTerninger0"+i+"'> "+i+" Terning"+endelse[i]+" </option>";
			}	
		}
	}

//Forsvarerside
	else if (type == 1) {
		document.getElementById('antallTerninger1').innerHTML = "";
		for (var i = 2; i >= 1; i--) {
			//console.log(i);
			//document.getElementById('antallTerninger01').style.display = 'none';
			if (antall[1] >= i) {
				document.getElementById('antallTerninger1').innerHTML += "<option value='"+i+"' id='antallTerninger1"+i+"'> "+i+" Terning"+endelse[i]+" </option>";
			}
		}
	}
}

function tomVarslinger() {
	document.getElementById('varslinger').innerHTML = '';
}

function juster(type, ant) {//funksjonen juster justerer opp og ned antallet angripere og forsvarere type=0 er angripere og type=1 er forsvarere
	var antallFor = [];
	antallFor[type] = antall[type];
	var minimum = 0;
	if (type == 0) {minimum = 1;}
	if(antall[type] + ant >= minimum) {//Denne ifen passer på at man ikke får negativt antall soldater, ettersom dette kan være litt irriterende
		antall[type] += ant;
	}
	else {antall[type] = 0;}//Denne elsen gjør at -10-knappen kan sette tall under 10 til å bli null
	visAntall();

	var antallTerninger = Number(document.querySelector('#antallTerninger'+type).value);
	//console.log(antallTerninger);

	if (antall[type] > antallFor[type] || antallTerninger > antall[type]) {//Tanken her er at i slag skal man ikke trenge velge terninger på nytt, men den skal likevel prøve å velge maks antall når man plotter inn nye soldater. Derfor sjekker ifen om man soldatmengden har økt eller sunket
		oppdaterTerningvelger(type);
	}
	//console.log('justerer');

	//sporBlitz();
}

function angripereInput() {
	//Det er vanskelig å forklare hvorfor, men det er viktig at alle endringer av soldattall går gjennom juster(), det har blant annet med terningvelgeren å gjøre
	var antFor = antall[0];
	var antEtter = Number(visEl[0].value);
	juster(0, antEtter - antFor);
}

function forsvarereInput() {
	//Det er vanskelig å forklare hvorfor, men det er viktig at alle endringer av soldattall går gjennom juster(), det har blant annet med terningvelgeren å gjøre
	var antFor = antall[1];
	var antEtter = Number(visEl[1].value);
	juster(1, antEtter - antFor);
}

function visAntall() {
	visEl[0].value = antall[0];
	if (visEl[0].value > 99) {visEl[0].style.width = '210px';}
	visEl[1].value = antall[1];
	if (visEl[1].value > 99) {visEl[1].style.width = '210px';}
}

function terning() {
	var n = ssf.randInt(1, 6);
	return n
}

function fargeGammel(dode) {//Dode er hvor mange som døde for den siden i stste slag (husk at det er -diff)
	var r = 255 - (10 * dode).toFixed(0);
	var g = 220 - (110 * dode).toFixed(0);
	var b = 0 .toFixed(0);
	return "rgb("+r+", "+g+", "+b+")";
}

function fargeGammel2(n) {
	var r = (-0.000453*n**3 + 0.106*n**2 - 8.65*n + 255).toFixed(0);
	var g = (-128*n +255).toFixed(0);
	var b = (-0.0000065*n**4 + 0.00162*n**3 - 0.142*n**2 + 4.45*n - 0.106).toFixed(0);
	var farge = 'rgb('+r+', '+g+', '+b+')';
	//console.log(farge);
	//var tekstboks1 = document.querySelector('#tekstboks1');
	//console.log(tekstboks1);
	//document.getElementById("tekstboks1").style.color = farge;
	//tekstboks1.style.backgroundColor = farge;

	return farge;
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
		sisteEl[i].style.fontSize = '1500%';
		if (sisteEl[i].innerHTML.length > 3) {sisteEl[i].style.fontSize = '1250%';}
		if (sisteEl[i].innerHTML.length > 4) {sisteEl[i].style.fontSize = '1000%';}
	}
}

function sporBlitz() {
	var sporBlitzEl = document.createElement('div');
	bodyEl.appendChild(sporBlitzEl);
	sporBlitzEl.id = 'sporBlitz';
	sporBlitzEl.style.position = 'fixed';
	sporBlitzEl.style.top = '0px';
	sporBlitzEl.style.width = '100%';
	sporBlitzEl.style.height = '100%';
	sporBlitzEl.style.padding = '50px';
	sporBlitzEl.style.backgroundColor = 'white';
	sporBlitzEl.style.fontSize = '75px';
	sporBlitzEl.innerHTML = 'Minimum angripere igjen: <br>';

	var minAngripereEl = document.createElement('select');
	minAngripereEl.id = 'minAngripere';
	minAngripereEl.style.width = '400px';
	minAngripereEl.style.height = '250px';
	minAngripereEl.style.fontSize = '200px';

	for (var i = 0; i <= antall[0]; i++) {
		var alternativEl = document.createElement('option');
		alternativEl.value = i;
		alternativEl.innerHTML = i + 1;
		minAngripereEl.appendChild(alternativEl);
	}
	sporBlitzEl.appendChild(minAngripereEl);

	sporBlitzEl.innerHTML += '<br><br> Ventetid per angrep: <br>';
	var ventetidEl = document.createElement('select');
	ventetidEl.id = 'ventetid';
	ventetidEl.style.width = '750px';
	ventetidEl.style.height = '250px';
	ventetidEl.style.fontSize = '200px';

	var ventetidAlternativer = [
		{navn: 'Ingen', ms: 0},
		{navn: 'Kort', ms: 250},
		{navn: 'Middels', ms: 500},
		{navn: 'Lang', ms: 1000},
		{navn: 'Episk', ms: 2000}
	];

	for (var i = 0; i < ventetidAlternativer.length; i++) {
		var alternativEl = document.createElement('option');
		alternativEl.innerHTML = ventetidAlternativer[i].navn;
		alternativEl.value = ventetidAlternativer[i].ms;
		//console.log(Number(alternativEl.value));
		ventetidEl.appendChild(alternativEl);
	}

	//console.log(ventetidEl.value);
	//ventetidEl.value = 500;

	sporBlitzEl.appendChild(ventetidEl);

	document.querySelector('#minAngripere').value = 2;
	if (antall[0] < 2) {document.querySelector('#minAngripere').value = 0;}
	document.querySelector('#ventetid').value = '1000';

	sporBlitzEl.appendChild(document.createElement('br'));
	sporBlitzEl.appendChild(document.createElement('br'));

	var avbrytKnapp = document.createElement('button');
	avbrytKnapp.style.fontSize = '150px';
	avbrytKnapp.style.margin = '15px';
	avbrytKnapp.style.padding = '25px';
	/*avbrytKnapp.style.color = 'white';
	avbrytKnapp.style.backgroundColor = '#ff5722';*/
	avbrytKnapp.style.borderRadius = '35px';
	avbrytKnapp.style.border = 'none';
	avbrytKnapp.style.cursor = 'pointer';
	avbrytKnapp.innerHTML = 'Avbryt';
	avbrytKnapp.addEventListener('click', function () {
		bodyEl.removeChild(sporBlitzEl);
	});
	sporBlitzEl.appendChild(avbrytKnapp);

	var blitzKnapp = document.createElement('button');
	blitzKnapp.style.fontSize = '150px';
	blitzKnapp.style.margin = '15px';
	blitzKnapp.style.padding = '25px';
	blitzKnapp.style.color = 'white';
	blitzKnapp.style.backgroundColor = '#ff5722';
	blitzKnapp.style.borderRadius = '35px';
	blitzKnapp.style.border = 'none';
	blitzKnapp.style.cursor = 'pointer';
	blitzKnapp.innerHTML = 'Blitz';
	blitzKnapp.addEventListener('click', function () {
		var minAngripere = Number(document.querySelector('#minAngripere').value);
		var ventetid = Number(document.querySelector('#ventetid').value);
		//var ventetid = document.querySelector('#ventetidId').value;
		bodyEl.removeChild(sporBlitzEl);
		angripBlitz(minAngripere, ventetid);
	});
	sporBlitzEl.appendChild(blitzKnapp);

}

function angrip32() {
	var a = [terning(), terning(), terning()];		//angrepsterninger
	var f = [terning(), terning()];					//forsvarsterninger

//Viser terninger
	document.getElementById('visTerninger0').innerHTML = "<img src='"+d[a[0]]+"' id='a1'><img src='"+d[a[1]]+"' id='a2'><img src='"+d[a[2]]+"' id='a3'>";
	document.getElementById('visTerninger1').innerHTML = "<img src='"+d[f[0]]+"' id='f1'><img src='"+d[f[1]]+"' id='f2'>";

//	console.log(a, f);

//Ordner angriperne
	var aH = Math.max(a[0], a[1], a[2]); //angriper høyest
	//Jeg må nå finne nest høyest. Da sjekker jeg hvilken som er høyest nå og setter den lik 0
	var i = 0;
	var funnet = false;
	while (i <= 2 && !funnet) {
		if(a[i] === aH) {
			a[i] = 0;
			funnet = true;
		}
		i++;
	}
	var aL = Math.max(a[0], a[1], a[2]); //angriper lavest

//Ordner forsvarerne
	var fH = Math.max(f[0], f[1]); //forsvarer høyest
	var fL = Math.min(f[0], f[1]); //forsvarer lavest

	//console.log(aL, fL);

//Angriperne sammenliknes med forsvarerne

	if(aH > fH) {juster(1, -1);} else {juster(0, -1);}
	if(aL > fL) {juster(1, -1);} else {juster(0, -1);}
}

function angrip22() {
	var a = [terning(), terning()];		//angrepsterninger
	var f = [terning(), terning()];					//forsvarsterninger

//Viser terninger
	document.getElementById('visTerninger0').innerHTML = "<img src='"+d[a[0]]+"' id='a1'><img src='"+d[a[1]]+"' id='a2'>";
	document.getElementById('visTerninger1').innerHTML = "<img src='"+d[f[0]]+"' id='f1'><img src='"+d[f[1]]+"' id='f2'>";

	//console.log(a, f);

//Ordner angriperne
	var aH = Math.max(a[0], a[1]); //angriper høyest
	var aL = Math.min(a[0], a[1]); //angriper lavest

//Ordner forsvarerne
	var fH = Math.max(f[0], f[1]); //forsvarer høyest
	var fL = Math.min(f[0], f[1]); //forsvarer lavest

	//console.log(aL, fL);

//Angriperne sammenliknes med forsvarerne

	if(aH > fH) {juster(1, -1);} else {juster(0, -1);}
	if(aL > fL) {juster(1, -1);} else {juster(0, -1);}
}

function angrip12() {
	var a = [terning()];		//angrepsterninger
	var f = [terning(), terning()];					//forsvarsterninger

//Viser terninger
	document.getElementById('visTerninger0').innerHTML = "<img src='"+d[a[0]]+"' id='a1'>";
	document.getElementById('visTerninger1').innerHTML = "<img src='"+d[f[0]]+"' id='f1'><img src='"+d[f[1]]+"' id='f2'>";

	//console.log(a, f);

//Ordner angriperne
	var aH = a[0];

//Ordner forsvarerne
	var fH = Math.max(f[0], f[1]); //forsvarer høyest

//Angriperne sammenliknes med forsvarerne

	if(aH > fH) {juster(1, -1);} else {juster(0, -1);}
}

function angrip31() {
	var a = [terning(), terning(), terning()];		//angrepsterninger
	var f = [terning()];					//forsvarsterninger

//Viser terninger
	document.getElementById('visTerninger0').innerHTML = "<img src='"+d[a[0]]+"' id='a1'><img src='"+d[a[1]]+"' id='a2'><img src='"+d[a[2]]+"' id='a3'>";
	document.getElementById('visTerninger1').innerHTML = "<img src='"+d[f[0]]+"' id='f1'>";

	//console.log(a, f);

//Ordner angriperne
	var aH = Math.max(a[0], a[1], a[2]);

//Ordner forsvarerne
	var fH = f[0]; //forsvarer høyest

//Angriperne sammenliknes med forsvarerne

	if(aH > fH) {juster(1, -1);} else {juster(0, -1);}
}

function angrip21() {
	var a = [terning(), terning()];		//angrepsterninger
	var f = [terning()];					//forsvarsterninger

//Viser terninger
	document.getElementById('visTerninger0').innerHTML = "<img src='"+d[a[0]]+"' id='a1'><img src='"+d[a[1]]+"' id='a2'>";
	document.getElementById('visTerninger1').innerHTML = "<img src='"+d[f[0]]+"' id='f1'>";

	//console.log(a, f);

//Ordner angriperne
	var aH = Math.max(a[0], a[1]); //angriper høyest
	var aL = Math.min(a[0], a[1]); //angriper lavest

//Ordner forsvarerne
	var fH = f[0];

//Angriperne sammenliknes med forsvarerne

	if(aH > fH) {juster(1, -1);} else {juster(0, -1);}
}

function angrip11() {
	var a = [terning()];		//angrepsterninger
	var f = [terning()];					//forsvarsterninger

//Viser terninger
	document.getElementById('visTerninger0').innerHTML = "<img src='"+d[a[0]]+"' id='a1'>";
	document.getElementById('visTerninger1').innerHTML = "<img src='"+d[f[0]]+"' id='f1'>";

	if(a[0] > f[0]) {juster(1, -1);} else {juster(0, -1);}
}

function stopp() {
	blitzing = false;
	stoppEl.style.display = 'none';
}

function angrip() {
	//console.log('angrip');
	if(antall[0] > 1 && antall[1] > 0) {
		tomVarslinger();
		var antAfor = antall[0];
		var antFfor = antall[1];

	//Kaster terninger
		var antallTerninger0 = Number(document.querySelector('#antallTerninger0').value);
		var antallTerninger1 = Number(document.querySelector('#antallTerninger1').value);
		//console.log(antallTerninger0, antallTerninger1);

		if (antallTerninger0 == 3 && antallTerninger1 == 2) {angrip32();}
		else if (antallTerninger0 == 2 && antallTerninger1 == 2) {angrip22();}
		else if (antallTerninger0 == 1 && antallTerninger1 == 2) {angrip12();}
		else if (antallTerninger0 == 3 && antallTerninger1 == 1) {angrip31();}
		else if (antallTerninger0 == 2 && antallTerninger1 == 1) {angrip21();}
		else if (antallTerninger0 == 1 && antallTerninger1 == 1) {angrip11();}

		//if (antall[0]>=4 && antall[1]>=2) {angrip32();}
		/*else if (antall[0] == 3 && antall[1] >= 2) {angrip22();}
		else if (antall[0] == 3 && antall[1] >= 2)*/

		//else {document.getElementById('varslinger').innerHTML = 'Ta resten manuelt';}

		var diff = [antall[0] - antAfor, antall[1] - antFfor];
		skrivTilSiste(diff);
	}
	else {document.getElementById('varslinger').innerHTML = 'Det er ikke nok folk';}
}

function angripBlitz(minAngripere, ventetid) {
	//console.log('blitzer');
	//var minAngripereString = prompt("Minimum angripere igjen:", 1);
	//var minAngripere = Number(minAngripereString);
	//console.log(minAngripereString);

	bakgrunnsmusikkEl.setAttribute('loop', '');
	bakgrunnsmusikkEl.currentTime = 38.3;
	bakgrunnsmusikkEl.play();

	stoppEl.style.display = 'block';
	angripEl.style.display = 'none';
	blitzEl.style.display = 'none';

	var antForst = [antall[0], antall[1]];

	function ferdig() {
		var diff = [antall[0] - antForst[0], antall[1] - antForst[1]];
		skrivTilSiste(diff);
		
		blitzing = true;

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