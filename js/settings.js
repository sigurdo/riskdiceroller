//Funksjoner:
function apnelukke(e) {
	var hva = e.target.id;
	var skalEndresEl = document.querySelector('#'+hva+' div');
	skalEndresEl.style.display = (skalEndresEl.style.display == 'block') ? 'none' : 'block';
}

function slett(e) {
	var slettNr = Number(e.target.id[5]);
	var valgVentetid = JSON.parse(localStorage.getItem('5QSGeP_valgVentetid'));
	valgVentetid.splice(slettNr, 1);
	localStorage.setItem('5QSGeP_valgVentetid', JSON.stringify(valgVentetid));
	oppdaterInput();
}

function settDef(e) {
	var settNr = Number(e.target.id[7]);
	var valgVentetid = JSON.parse(localStorage.getItem('5QSGeP_valgVentetid'));
	for (var i = 0; i < valgVentetid.length; i++) {
		valgVentetid[i].def = false;
	}
	valgVentetid[settNr].def = true;
	localStorage.setItem('5QSGeP_valgVentetid', JSON.stringify(valgVentetid));
	oppdaterInput();
}

function leggTil() {
	var valgVentetid = JSON.parse(localStorage.getItem('5QSGeP_valgVentetid'));
	var ny = {
		navn: document.querySelector('#navnNy').value,
		ms: Number(document.querySelector('#msNy').value),
		def: false
	}
	//Finner riktig plass:
	var narmest = valgVentetid[valgVentetid.length - 1].ms;
	var narmestPlass = valgVentetid.length;
	for (var i = 0; i < valgVentetid.length; i++) {
		var diff = valgVentetid[i].ms - ny.ms;
		if(diff >= 0 && diff <= narmest) {
			narmest = diff;
			narmestPlass = i + 1;
		}
	}
	valgVentetid.splice(narmestPlass, 0, ny);
	localStorage.setItem('5QSGeP_valgVentetid', JSON.stringify(valgVentetid));
	oppdaterInput();
}

function oppdaterInput() {
	for (var i = 0; i < 1000; i++) {
		var option = document.createElement('option');
		option.value = i;
		option.innerHTML = i;
		defMinAngEl.appendChild(option);
	}

	defMinAngEl.value = localStorage.getItem('5QSGeP_defMinAng');

	//Oppdaterer valg for ventetid:
	valgVentetidEl.innerHTML = '';
	var valgVentetid = JSON.parse(localStorage.getItem('5QSGeP_valgVentetid'));
	for (var i = 0; i < valgVentetid.length; i++) {
		var tr = document.createElement('tr');
		var navnEl = document.createElement('td');
		navnEl.innerHTML = '<input type="text" id="navn'+i+'" value="'+valgVentetid[i].navn+'">';
		tr.appendChild(navnEl);

		var msEl = document.createElement('td');
		msEl.innerHTML = '<input type="number" id="ms'+i+'" value="'+valgVentetid[i].ms+'">ms';
		tr.appendChild(msEl);

		var settDefEl = document.createElement('td');
		settDefEl.id = 'settDef'+i;
		if (valgVentetid[i].def) {
			settDefEl.innerHTML = 'Default';
		}
		else {
			settDefEl.style.cursor = 'pointer';
			settDefEl.innerHTML = 'Sett som default';
			settDefEl.addEventListener('click', settDef);
		}
		tr.appendChild(settDefEl);

		var slettEl = document.createElement('td');
		slettEl.id = 'slett'+i;
		slettEl.style.cursor = 'pointer';
		slettEl.innerHTML = 'Slett';
		slettEl.addEventListener('click', slett);
		tr.appendChild(slettEl);

		valgVentetidEl.appendChild(tr);
	}

	var tr = document.createElement('tr');
	var navnEl = document.createElement('navn');
	navnEl.innerHTML = '<input type="text" id="navnNy" value="Ny">';
	tr.appendChild(navnEl);

	var msEl = document.createElement('td');
	msEl.innerHTML = '<input type="number" id="msNy" value="0">ms';
	tr.appendChild(msEl);

	var settDefEl = document.createElement('td');
	tr.appendChild(settDefEl);

	var leggTilEl = document.createElement('td');
	leggTilEl.style.cursor = 'pointer';
	leggTilEl.innerHTML = 'Legg til';
	leggTilEl.addEventListener('click', leggTil);
	tr.appendChild(leggTilEl);

	valgVentetidEl.appendChild(tr);
}

function bruk() {
	//5QSGeP som står først i alle item-navnene er bare en tilfeldig kombinasjon av symboler for å være sikker på å unngå krøll med andre nettsiders cookies
	localStorage.setItem('5QSGeP_defMinAng', defMinAngEl.value);

	//For valg for ventetid
	var valgVentetid = JSON.parse(localStorage.getItem('5QSGeP_valgVentetid'));
	for (var i = 0; i < valgVentetid.length; i++) {
		valgVentetid[i].navn = document.querySelector('#navn'+i).value;
		valgVentetid[i].ms = Number(document.querySelector('#ms'+i).value);
	}
	localStorage.setItem('5QSGeP_valgVentetid', JSON.stringify(valgVentetid));
}


//Globale variabler:


//Elementer:
var bodyEl = document.querySelector('body');
var blitzEl = document.querySelector('#blitz');
var musikkEl = document.querySelector('#musikk');
var defMinAngEl = document.querySelector('#defMinAng');
var valgVentetidEl = document.querySelector('#valgVentetid');
var spillMusikkEl = document.querySelector('#spillMusikk');
var lydsporEl = document.querySelector('#lydspor');
var brukEl = document.querySelector('#bruk');


//Lyttere:
brukEl.addEventListener('click', bruk)
var h2 = document.querySelectorAll('h2');
for (var i = 0; i < h2.length; i++) {
	h2[i].addEventListener('click', apnelukke);
}


//Funksjonskall:
oppdaterInput();