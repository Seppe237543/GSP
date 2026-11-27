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

// ===== voortgang =====
(() => {
    if (!document.getElementById("progress-message")) return;

    const storageKey = "fittrackVoortgang";
    const today = new Date();
    const todayIso = formatIsoDate(today);
    const message = document.getElementById("progress-message");
    const periodLabels = {
        week: "deze week",
        month: "deze maand",
        year: "dit jaar"
    };
    let activePeriod = "week";
    let data = createDemoData();

    document.getElementById("today-label").textContent = new Intl.DateTimeFormat("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(today);

    function formatIsoDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function dateAtOffset(days) {
        const date = new Date();
        date.setHours(12, 0, 0, 0);
        date.setDate(date.getDate() + days);
        return formatIsoDate(date);
    }

    function createDemoData() {
        const workoutSamples = [
            [-1, "Bovenlichaam kracht", 52, 5200, "Borst"],
            [-3, "Onderlichaam", 48, 6100, "Benen"],
            [-5, "Full body", 44, 3900, "Full body"],
            [-8, "Bovenlichaam kracht", 55, 4800, "Borst"],
            [-12, "Rug en armen", 46, 4300, "Rug"],
            [-17, "Onderlichaam", 51, 5900, "Benen"],
            [-23, "Schouders en armen", 42, 3200, "Schouders"],
            [-31, "Bovenlichaam kracht", 50, 5000, "Borst"],
            [-43, "Full body", 47, 4100, "Full body"],
            [-58, "Onderlichaam", 53, 6200, "Benen"],
            [-76, "Rug en armen", 45, 3900, "Rug"],
            [-101, "Bovenlichaam kracht", 49, 4700, "Borst"],
            [-133, "Full body", 43, 3600, "Full body"],
            [-168, "Onderlichaam", 50, 5600, "Benen"],
            [-205, "Schouders en armen", 41, 3000, "Armen"],
            [-248, "Bovenlichaam kracht", 48, 4400, "Borst"],
            [-294, "Full body", 46, 3700, "Full body"],
            [-342, "Onderlichaam", 52, 5400, "Benen"]
        ];
        const weightSamples = [
            [ -360, 86.0 ], [ -300, 85.4 ], [ -240, 85.0 ], [ -180, 84.2 ],
            [ -120, 83.8 ], [ -90, 83.1 ], [ -60, 82.6 ], [ -30, 82.1 ],
            [ -14, 81.8 ], [ -7, 81.6 ], [ -2, 81.5 ], [ 0, 81.4 ]
        ];

        return {
            goalWeight: 78,
            workouts: workoutSamples.map(([offset, name, duration, volume, muscle]) => ({
                id: makeId(),
                date: dateAtOffset(offset),
                name,
                duration,
                volume,
                muscle
            })),
            weights: weightSamples.map(([offset, weight]) => ({
                id: makeId(),
                date: dateAtOffset(offset),
                weight
            }))
        };
    }

    function makeId() {
        return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    function setMessage(text, isError = false) {
        message.textContent = text;
        message.classList.toggle("fout", isError);
    }

    function loadData() {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved === null) {
                localStorage.setItem(storageKey, JSON.stringify(data));
                return;
            }

            const parsed = JSON.parse(saved);
            if (!parsed || !Array.isArray(parsed.workouts) || !Array.isArray(parsed.weights)
                || !Number.isFinite(Number(parsed.goalWeight))) {
                throw new Error("De opgeslagen voortgang heeft een ongeldig formaat.");
            }
            data = parsed;
            setMessage("Je voortgang wordt in deze browser bewaard.");
        } catch (error) {
            setMessage(`Voortgang kon niet uit deze browser worden geladen: ${error.message}`, true);
        }
    }

    function saveData(successMessage) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(data));
            setMessage(successMessage);
            return true;
        } catch (error) {
            setMessage(`Opslaan is mislukt: ${error.message}`, true);
            return false;
        }
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    function parseDate(value) {
        return new Date(`${value}T12:00:00`);
    }

    function startOfWeek(date) {
        const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const daysSinceMonday = (start.getDay() + 6) % 7;
        start.setDate(start.getDate() - daysSinceMonday);
        return start;
    }

    function getPeriodRange(period, offset = 0) {
        let start;
        let end;
        if (period === "week") {
            start = startOfWeek(today);
            start.setDate(start.getDate() + offset * 7);
            end = new Date(start);
            end.setDate(end.getDate() + 7);
        } else if (period === "month") {
            start = new Date(today.getFullYear(), today.getMonth() + offset, 1);
            end = new Date(today.getFullYear(), today.getMonth() + offset + 1, 1);
        } else {
            start = new Date(today.getFullYear() + offset, 0, 1);
            end = new Date(today.getFullYear() + offset + 1, 0, 1);
        }
        return { start, end };
    }

    function inRange(record, range) {
        const date = parseDate(record.date);
        return date >= range.start && date < range.end;
    }

    function recordsInPeriod(records, period, offset = 0) {
        const range = getPeriodRange(period, offset);
        return records.filter(record => inRange(record, range));
    }

    function formatNumber(value, decimals = 0) {
        return new Intl.NumberFormat("nl-NL", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    }

    function formatDate(value, options = { day: "numeric", month: "short" }) {
        return new Intl.DateTimeFormat("nl-NL", options).format(parseDate(value));
    }

    function formatVolume(value) {
        return `${formatNumber(Math.round(value))} kg`;
    }

    function newestFirst(records) {
        return records
            .map((record, index) => ({ record, index }))
            .sort((a, b) => b.record.date.localeCompare(a.record.date) || b.index - a.index)
            .map(item => item.record);
    }

    function trendText(current, previous, unit = "") {
        if (!previous) {
            return "Geen vorige periode om mee te vergelijken";
        }
        const difference = current - previous;
        const percentage = Math.round(Math.abs(difference / previous) * 100);
        const direction = difference > 0 ? "meer" : difference < 0 ? "minder" : "evenveel";
        return `${percentage}% ${direction} dan vorige periode${unit}`;
    }

    function renderKpis(workouts, weights) {
        const previousWorkouts = recordsInPeriod(data.workouts, activePeriod, -1);
        const totalVolume = workouts.reduce((sum, workout) => sum + Number(workout.volume), 0);
        const previousVolume = previousWorkouts.reduce((sum, workout) => sum + Number(workout.volume), 0);
        const averageDuration = workouts.length
            ? Math.round(workouts.reduce((sum, workout) => sum + Number(workout.duration), 0) / workouts.length)
            : 0;
        const latestWeight = newestFirst(data.weights)[0];
        const periodWeights = [...weights].sort((a, b) => a.date.localeCompare(b.date));
        let weightTrend = "Nog geen metingen in deze periode";
        if (periodWeights.length > 1) {
            const difference = periodWeights.at(-1).weight - periodWeights[0].weight;
            weightTrend = `${difference > 0 ? "+" : ""}${formatNumber(difference, 1)} kg in deze periode`;
        }

        const cards = [
            ["Workouts", formatNumber(workouts.length), trendText(workouts.length, previousWorkouts.length)],
            ["Trainingsvolume", formatVolume(totalVolume), trendText(totalVolume, previousVolume)],
            ["Laatste gewicht", latestWeight ? `${formatNumber(latestWeight.weight, 1)} kg` : "—",
                latestWeight ? `${formatDate(latestWeight.date)} · ${weightTrend}` : "Registreer je eerste meting"],
            ["Gem. workoutduur", workouts.length ? `${averageDuration} min` : "—",
                workouts.length ? `Gemiddeld over ${workouts.length} workouts` : "Geen workouts in deze periode"]
        ];

        document.getElementById("progress-kpis").innerHTML = cards.map(([label, value, detail]) => `
            <article class="voortgang-kpi">
                <span class="voortgang-kpi-label">${escapeHtml(label)}</span>
                <strong>${escapeHtml(value)}</strong>
                <small>${escapeHtml(detail)}</small>
            </article>
        `).join("");
    }

    function chartBins(period, range) {
        if (period === "week") {
            return Array.from({ length: 7 }, (_, index) => {
                const date = new Date(range.start);
                date.setDate(date.getDate() + index);
                return { start: date, end: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
                    label: new Intl.DateTimeFormat("nl-NL", { weekday: "short" }).format(date) };
            });
        }
        if (period === "month") {
            const daysInMonth = new Date(range.end.getFullYear(), range.end.getMonth(), 0).getDate();
            return Array.from({ length: Math.ceil(daysInMonth / 7) }, (_, index) => {
                const start = new Date(range.start);
                start.setDate(1 + index * 7);
                const end = new Date(range.start);
                end.setDate(Math.min(1 + (index + 1) * 7, daysInMonth + 1));
                return { start, end, label: `W${index + 1}` };
            });
        }
        return Array.from({ length: 12 }, (_, index) => ({
            start: new Date(range.start.getFullYear(), index, 1),
            end: new Date(range.start.getFullYear(), index + 1, 1),
            label: new Intl.DateTimeFormat("nl-NL", { month: "short" })
                .format(new Date(range.start.getFullYear(), index, 1))
        }));
    }

    function renderVolumeChart(workouts) {
        const range = getPeriodRange(activePeriod);
        const bins = chartBins(activePeriod, range);
        const values = bins.map(bin => workouts.reduce((sum, workout) => {
            const date = parseDate(workout.date);
            return date >= bin.start && date < bin.end ? sum + Number(workout.volume) : sum;
        }, 0));
        const max = Math.max(...values);
        if (!max) {
            document.getElementById("volume-chart").innerHTML =
                '<p class="grafiek-leeg">Nog geen workouts in deze periode. Voeg hierboven een workout toe.</p>';
            return;
        }

        const width = 680;
        const height = 240;
        const left = 46;
        const right = 12;
        const top = 14;
        const bottom = 36;
        const chartWidth = width - left - right;
        const chartHeight = height - top - bottom;
        const step = chartWidth / bins.length;
        const gridStep = Math.max(1000, Math.ceil(max / 4 / 1000) * 1000);
        const gridMax = gridStep * 4;
        let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Trainingsvolume ${escapeHtml(periodLabels[activePeriod])}">`;

        for (let index = 0; index <= 4; index += 1) {
            const value = gridStep * index;
            const y = top + chartHeight - (value / gridMax) * chartHeight;
            svg += `<line x1="${left}" x2="${width - right}" y1="${y}" y2="${y}" stroke="#E3EEEA"/>`;
            svg += `<text x="${left - 8}" y="${y + 4}" text-anchor="end">${formatNumber(value)}</text>`;
        }

        values.forEach((value, index) => {
            const barWidth = Math.min(42, step * 0.62);
            const barHeight = (value / gridMax) * chartHeight;
            const x = left + step * index + (step - barWidth) / 2;
            const y = top + chartHeight - barHeight;
            if (value > 0) {
                svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="5" fill="#519E8A"><title>${escapeHtml(bins[index].label)}: ${formatVolume(value)}</title></rect>`;
            }
            svg += `<text x="${left + step * (index + 0.5)}" y="${height - 10}" text-anchor="middle">${escapeHtml(bins[index].label)}</text>`;
        });
        svg += "</svg>";
        document.getElementById("volume-chart").innerHTML = svg;
        document.getElementById("volume-subtitle").textContent =
            `Totaal verplaatst gewicht · ${periodLabels[activePeriod]}`;
    }

    function renderWeightChart(weights) {
        const container = document.getElementById("weight-chart");
        const points = [...weights].sort((a, b) => a.date.localeCompare(b.date));
        if (!points.length) {
            container.innerHTML = '<p class="grafiek-leeg">Nog geen metingen in deze periode. Registreer hierboven je gewicht.</p>';
            return;
        }

        const width = 680;
        const height = 240;
        const left = 48;
        const right = 14;
        const top = 20;
        const bottom = 36;
        const chartWidth = width - left - right;
        const chartHeight = height - top - bottom;
        const values = points.map(point => Number(point.weight));
        const min = Math.floor(Math.min(...values, Number(data.goalWeight)) - 1);
        const max = Math.ceil(Math.max(...values, Number(data.goalWeight)) + 1);
        const range = Math.max(max - min, 1);
        const x = index => points.length === 1
            ? left + chartWidth / 2
            : left + chartWidth * index / (points.length - 1);
        const y = value => top + chartHeight - (value - min) / range * chartHeight;
        let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Lichaamsgewicht in kilogram">`;

        for (let index = 0; index <= 4; index += 1) {
            const value = min + range * index / 4;
            const lineY = y(value);
            svg += `<line x1="${left}" x2="${width - right}" y1="${lineY}" y2="${lineY}" stroke="#E3EEEA"/>`;
            svg += `<text x="${left - 8}" y="${lineY + 4}" text-anchor="end">${formatNumber(value, 1)}</text>`;
        }

        const goalY = y(Number(data.goalWeight));
        svg += `<line x1="${left}" x2="${width - right}" y1="${goalY}" y2="${goalY}" stroke="#EF233C" stroke-dasharray="5 5"/>`;
        svg += `<text x="${width - right}" y="${goalY - 6}" text-anchor="end" style="fill:#A51C30">Doel ${formatNumber(data.goalWeight, 1)} kg</text>`;
        if (points.length > 1) {
            const path = points.map((point, index) => `${index ? "L" : "M"}${x(index)} ${y(point.weight)}`).join(" ");
            svg += `<path d="${path}" fill="none" stroke="#519E8A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
        }
        points.forEach((point, index) => {
            svg += `<circle cx="${x(index)}" cy="${y(point.weight)}" r="5" fill="#fff" stroke="#519E8A" stroke-width="3"><title>${formatDate(point.date, { day: "numeric", month: "long", year: "numeric" })}: ${formatNumber(point.weight, 1)} kg</title></circle>`;
            if (points.length <= 8 || index % 2 === 0 || index === points.length - 1) {
                svg += `<text x="${x(index)}" y="${height - 10}" text-anchor="middle">${escapeHtml(formatDate(point.date))}</text>`;
            }
        });
        svg += "</svg>";
        container.innerHTML = svg;
    }

    function renderWorkoutHistory(workouts) {
        const sorted = newestFirst(workouts);
        const container = document.getElementById("workout-history");
        if (!sorted.length) {
            container.innerHTML = '<p class="geschiedenis-leeg">Geen workouts in deze periode.</p>';
            return;
        }
        container.innerHTML = sorted.slice(0, 8).map(workout => `
            <div class="geschiedenisrij">
                <div class="geschiedenisinfo">
                    <strong>${escapeHtml(workout.name)}</strong>
                    <span>${escapeHtml(formatDate(workout.date, { day: "numeric", month: "long", year: "numeric" }))} · ${escapeHtml(workout.muscle)}</span>
                </div>
                <div class="geschiedeniswaarde">
                    ${formatVolume(Number(workout.volume))}
                    <span>${formatNumber(Number(workout.duration))} min</span>
                </div>
                <button type="button" class="verwijderregistratie" data-remove-workout="${escapeHtml(workout.id)}"
                    aria-label="Verwijder workout ${escapeHtml(workout.name)}">Verwijder</button>
            </div>
        `).join("");
    }

    function renderWeightHistory() {
        const sorted = newestFirst(data.weights);
        const container = document.getElementById("weight-history");
        if (!sorted.length) {
            container.innerHTML = '<p class="geschiedenis-leeg">Nog geen gewicht geregistreerd.</p>';
            return;
        }
        container.innerHTML = `<h3 class="registratiekop">Recente metingen</h3>${sorted.slice(0, 5).map(weight => `
            <div class="geschiedenisrij">
                <div class="geschiedenisinfo">
                    <strong>${formatNumber(Number(weight.weight), 1)} kg</strong>
                    <span>${escapeHtml(formatDate(weight.date, { day: "numeric", month: "long", year: "numeric" }))}</span>
                </div>
                <button type="button" class="verwijderregistratie" data-remove-weight="${escapeHtml(weight.id)}"
                    aria-label="Verwijder meting van ${formatNumber(Number(weight.weight), 1)} kilogram">Verwijder</button>
            </div>
        `).join("")}`;
    }

    function renderMuscleGroups(workouts) {
        const container = document.getElementById("muscle-groups");
        const totals = new Map();
        workouts.forEach(workout => {
            const muscle = workout.muscle || "Overig";
            totals.set(muscle, (totals.get(muscle) || 0) + Number(workout.volume));
        });
        const total = [...totals.values()].reduce((sum, value) => sum + value, 0);
        if (!total) {
            container.innerHTML = '<p class="geschiedenis-leeg">Voeg workouts toe om je trainingsverdeling te zien.</p>';
            return;
        }
        container.innerHTML = [...totals.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([muscle, volume]) => {
                const percentage = Math.round(volume / total * 100);
                return `<div class="spiergroep">
                    <span>${escapeHtml(muscle)}</span>
                    <div class="spiergroep-balk"><span style="width:${percentage}%"></span></div>
                    <span class="spiergroep-percentage">${percentage}%</span>
                </div>`;
            }).join("");
    }

    function renderGoal() {
        const currentWeight = newestFirst(data.weights)[0];
        const goal = Number(data.goalWeight);
        document.getElementById("goal-weight").value = formatNumber(goal, 1).replace(".", "").replace(",", ".");
        if (!currentWeight) {
            document.getElementById("goal-summary").textContent = "Registreer je gewicht om je doel te volgen.";
            document.getElementById("goal-display").innerHTML = "";
            return;
        }

        const difference = Number(currentWeight.weight) - goal;
        const oldestWeight = [...data.weights].sort((a, b) => a.date.localeCompare(b.date))[0];
        const startWeight = Number(oldestWeight.weight);
        const progress = startWeight === goal
            ? 100
            : Math.max(0, Math.min(100, (Number(currentWeight.weight) - startWeight) / (goal - startWeight) * 100));
        document.getElementById("goal-summary").textContent =
            `${formatNumber(currentWeight.weight, 1)} kg gemeten op ${formatDate(currentWeight.date)}.`;
        document.getElementById("goal-display").innerHTML = `
            <div class="doelstatus">
                <strong>${Math.abs(difference) < 0.05 ? "Doelgewicht bereikt" : `${formatNumber(Math.abs(difference), 1)} kg ${difference > 0 ? "tot" : "onder"} je doel`}</strong>
                <div class="doelbalk" role="progressbar" aria-label="Voortgang naar doelgewicht"
                    aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(progress)}">
                    <span style="width:${progress}%"></span>
                </div>
            </div>
        `;
    }

    function render() {
        const workouts = recordsInPeriod(data.workouts, activePeriod);
        const weights = recordsInPeriod(data.weights, activePeriod);
        document.querySelectorAll("[data-period]").forEach(button => {
            button.setAttribute("aria-pressed", String(button.dataset.period === activePeriod));
        });
        renderKpis(workouts, weights);
        renderVolumeChart(workouts);
        renderWeightChart(weights);
        renderWorkoutHistory(workouts);
        renderWeightHistory();
        renderMuscleGroups(workouts);
        renderGoal();
    }

    function validDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value > todayIso) {
            return false;
        }
        return formatIsoDate(parseDate(value)) === value;
    }

    function csvCell(value) {
        const text = String(value ?? "");
        return /[;"\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    }

    function exportCsv() {
        const workouts = recordsInPeriod(data.workouts, activePeriod);
        const weights = recordsInPeriod(data.weights, activePeriod);
        const rows = [
            ["Type", "Datum", "Naam", "Gewicht (kg)", "Duur (min)", "Volume (kg)", "Spiergroep"]
        ];
        workouts.forEach(workout => rows.push([
            "Workout", workout.date, workout.name, "", workout.duration, workout.volume, workout.muscle
        ]));
        weights.forEach(weight => rows.push([
            "Gewicht", weight.date, "", weight.weight, "", "", ""
        ]));
        const csv = `\uFEFF${rows.map(row => row.map(csvCell).join(";")).join("\r\n")}`;
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `fittrack-voortgang-${activePeriod}-${todayIso}.csv`;
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 0);
        setMessage(`CSV-export voor ${periodLabels[activePeriod]} gedownload.`);
    }

    document.querySelectorAll("[data-period]").forEach(button => {
        button.addEventListener("click", () => {
            activePeriod = button.dataset.period;
            render();
        });
    });

    document.getElementById("export-button").addEventListener("click", exportCsv);

    document.getElementById("weight-form").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        const values = new FormData(form);
        const weight = Number(values.get("weight"));
        const date = String(values.get("date"));
        if (!validDate(date) || !Number.isFinite(weight) || weight < 20 || weight > 400) {
            setMessage("Vul een geldig gewicht en een datum tot en met vandaag in.", true);
            return;
        }
        data.weights.push({ id: makeId(), date, weight });
        saveData("Je gewicht is opgeslagen.");
        form.reset();
        document.getElementById("weight-date").value = todayIso;
        render();
    });

    document.getElementById("workout-form").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        const values = new FormData(form);
        const name = String(values.get("name")).trim();
        const date = String(values.get("date"));
        const duration = Number(values.get("duration"));
        const volume = Number(values.get("volume"));
        const muscle = String(values.get("muscle"));
        if (!name || name.length > 80 || !validDate(date)
            || !Number.isInteger(duration) || duration < 1 || duration > 600
            || !Number.isFinite(volume) || volume < 0 || volume > 1000000) {
            setMessage("Controleer de workoutgegevens. De datum mag niet in de toekomst liggen.", true);
            return;
        }
        data.workouts.push({ id: makeId(), date, name, duration, volume, muscle });
        saveData("Je workout is opgeslagen.");
        form.reset();
        document.getElementById("workout-date").value = todayIso;
        render();
    });

    document.getElementById("goal-form").addEventListener("submit", event => {
        event.preventDefault();
        const goal = Number(new FormData(event.currentTarget).get("goalWeight"));
        if (!Number.isFinite(goal) || goal < 20 || goal > 400) {
            setMessage("Kies een doelgewicht tussen 20 en 400 kg.", true);
            return;
        }
        data.goalWeight = goal;
        saveData("Je doelgewicht is bijgewerkt.");
        render();
    });

    document.addEventListener("click", event => {
        const removeWorkout = event.target.closest("[data-remove-workout]");
        const removeWeight = event.target.closest("[data-remove-weight]");
        if (removeWorkout) {
            if (!window.confirm("Deze workout verwijderen?")) return;
            data.workouts = data.workouts.filter(workout => workout.id !== removeWorkout.dataset.removeWorkout);
            saveData("De workout is verwijderd.");
            render();
        } else if (removeWeight) {
            if (!window.confirm("Deze gewichtsmeting verwijderen?")) return;
            data.weights = data.weights.filter(weight => weight.id !== removeWeight.dataset.removeWeight);
            saveData("De gewichtsmeting is verwijderd.");
            render();
        }
    });

    document.getElementById("weight-date").value = todayIso;
    document.getElementById("workout-date").value = todayIso;
    loadData();
    render();
})();
