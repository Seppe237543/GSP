// ===== dark mode (alle pagina's) =====

// kijken of dark mode aan stond (localStorage onthoudt het in de browser)
if (localStorage.getItem("donkereModus") == "aan") {
    document.body.classList.add("donker");
}

// vinkje op de profielpagina
function wisselDonkereModus() {
    let vinkje = document.getElementById("darkmode");

    if (vinkje.checked == true) {
        document.body.classList.add("donker");
        localStorage.setItem("donkereModus", "aan");
    } else {
        document.body.classList.remove("donker");
        localStorage.setItem("donkereModus", "uit");
    }
}

// op de profielpagina het vinkje juist zetten
if (document.getElementById("darkmode") != null) {
    if (localStorage.getItem("donkereModus") == "aan") {
        document.getElementById("darkmode").checked = true;
    }
}


// ===== workout: rust timer =====

let rustSeconden = 58;

function toonRustTijd() {
    let minuten = Math.floor(rustSeconden / 60);
    let seconden = rustSeconden % 60;

    if (seconden < 10) {
        seconden = "0" + seconden;
    }

    document.getElementById("rusttijd").innerHTML = minuten + ":" + seconden;
}

function aftellen() {
    if (rustSeconden > 0) {
        rustSeconden = rustSeconden - 1;
        toonRustTijd();
    }
}

function rustErbij() {
    rustSeconden = rustSeconden + 15;
    toonRustTijd();
}

function rustOverslaan() {
    rustSeconden = 0;
    toonRustTijd();
}

// timer alleen starten op de workout pagina
if (document.getElementById("rusttijd") != null) {
    setInterval(aftellen, 1000);
}


// ===== workout: gewicht en herhalingen =====

function veranderGetal(id, stap) {
    let vak = document.getElementById(id);
    let getal = Number(vak.value) + stap;

    if (getal < 0) {
        getal = 0;
    }

    vak.value = getal;
}


// ===== workout: set voltooien =====

let huidigeSet = 2;
let aantalSets = 4;

function setVoltooien() {
    if (huidigeSet > aantalSets) {
        alert("Alle sets zijn klaar! Ga naar de volgende oefening.");
        return;
    }

    // set groen maken met een vinkje
    let set = document.getElementById("set" + huidigeSet);
    set.className = "set setklaar";
    set.innerHTML = '<i class="fa-solid fa-check"></i><small>' + document.getElementById("gewicht").value + " x " + document.getElementById("herhalingen").value + "</small>";

    huidigeSet = huidigeSet + 1;

    if (huidigeSet <= aantalSets) {
        document.getElementById("set" + huidigeSet).className = "set setnu";
        document.getElementById("settitel").innerHTML = "Set " + huidigeSet + " van " + aantalSets;
    } else {
        document.getElementById("settitel").innerHTML = "Alle sets klaar!";
    }

    // rust opnieuw beginnen
    rustSeconden = 90;
    toonRustTijd();
}


// ===== workout: vorige / volgende oefening =====

// alle lijsten in dezelfde volgorde (plaats 0 = bankdrukken)
let oefeningen = ["Bankdrukken", "Dumbbell press", "Schouderpress", "Lat pulldown", "Roeien aan kabel", "Triceps pushdown"];
let spiergroepen = ["Borst · triceps", "Borst", "Schouders", "Rug · biceps", "Rug", "Triceps"];
let gewichten = [60, 22, 16, 50, 45, 25];
let herhalingenLijst = [8, 10, 10, 10, 10, 12];
let huidigeOefening = 0;

function toonOefening() {
    document.getElementById("oefeningnaam").innerHTML = oefeningen[huidigeOefening];
    document.getElementById("oefeninginfo").innerHTML = spiergroepen[huidigeOefening];
    document.getElementById("oefeningnummer").innerHTML = "Oefening " + (huidigeOefening + 1) + " van " + oefeningen.length;

    resetSets();
}

// alle sets terug leeg maken en bij set 1 beginnen
function resetSets() {
    let gewicht = gewichten[huidigeOefening];
    let herhalingen = herhalingenLijst[huidigeOefening];

    document.getElementById("gewicht").value = gewicht;
    document.getElementById("herhalingen").value = herhalingen;

    for (let i = 1; i <= aantalSets; i++) {
        let set = document.getElementById("set" + i);
        set.className = "set";
        set.innerHTML = i + "<small>" + gewicht + " x " + herhalingen + "</small>";
    }

    huidigeSet = 1;
    document.getElementById("set1").className = "set setnu";
    document.getElementById("settitel").innerHTML = "Set 1 van " + aantalSets;

    rustSeconden = 0;
    toonRustTijd();
}

function volgendeOefening() {
    if (huidigeOefening < oefeningen.length - 1) {
        huidigeOefening = huidigeOefening + 1;
        toonOefening();
    }
}

function vorigeOefening() {
    if (huidigeOefening > 0) {
        huidigeOefening = huidigeOefening - 1;
        toonOefening();
    }
}


// ===== voeding: water =====

let water = 1.25;
let waterDoel = 2.5;

function toonWater() {
    // 1.25 wordt 1,25
    document.getElementById("waterliters").innerHTML = water.toFixed(2).replace(".", ",");

    let procent = water / waterDoel * 100;
    if (procent > 100) {
        procent = 100;
    }
    document.getElementById("waterbalk").style.width = procent + "%";
}

function waterErbij() {
    water = water + 0.25;
    toonWater();
}

function waterEraf() {
    if (water > 0) {
        water = water - 0.25;
    }
    toonWater();
}


// ===== oefeningen: zoeken en filteren =====

// kijkt welk rondje aangeklikt is in een groep
function gekozenFilter(groep) {
    let rondjes = document.getElementsByName(groep);

    for (let i = 0; i < rondjes.length; i++) {
        if (rondjes[i].checked == true) {
            return rondjes[i].value;
        }
    }
    return "alles";
}

function filterOefeningen() {
    let zoekwoord = document.getElementById("zoeken").value.toLowerCase();
    let spiergroep = gekozenFilter("spiergroep");
    let apparatuur = gekozenFilter("apparatuur");

    let kaarten = document.getElementsByClassName("oefening");
    let aantal = 0;

    for (let i = 0; i < kaarten.length; i++) {
        let tekst = kaarten[i].textContent.toLowerCase();
        let favoriet = kaarten[i].getElementsByClassName("hartjevinkje")[0].checked;
        let tonen = true;

        if (tekst.includes(zoekwoord) == false) {
            tonen = false;
        }

        if (spiergroep == "favorieten" && favoriet == false) {
            tonen = false;
        }

        if (spiergroep != "alles" && spiergroep != "favorieten" && tekst.includes(spiergroep) == false) {
            tonen = false;
        }

        if (apparatuur != "alles" && tekst.includes(apparatuur) == false) {
            tonen = false;
        }

        if (tonen == true) {
            kaarten[i].style.display = "flex";
            aantal = aantal + 1;
        } else {
            kaarten[i].style.display = "none";
        }
    }

    document.getElementById("aantal").innerHTML = aantal + " oefeningen";
}