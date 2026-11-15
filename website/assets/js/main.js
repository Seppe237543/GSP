// /* FitApp - heel basis JavaScript. Geen effecten, geen libraries. */

// /* ---------- 1. Hamburgermenu (mobiel) ---------- */
// var burger = document.querySelector('.burger');
// var nav = document.querySelector('.nav');

// burger.addEventListener('click', function () {
//   var open = nav.classList.toggle('is-open');
//   burger.setAttribute('aria-expanded', open);
//   burger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
// });


// /* ---------- 2. Filters op de pagina Functies ---------- */
// var filters = document.querySelector('.filters');

// if (filters) {
//   var kaarten = document.querySelectorAll('.functie');
//   var teller = document.getElementById('teller');
//   var leeg = document.getElementById('leeg');

//   function gekozen(naam) {
//     return filters.querySelector('input[name="' + naam + '"]:checked').value;
//   }

//   function filter() {
//     var categorie = gekozen('categorie');
//     var prioriteit = gekozen('prioriteit');
//     var zoek = filters.elements.zoek.value.trim().toLowerCase();
//     var aantal = 0;

//     kaarten.forEach(function (kaart) {
//       var past =
//         (categorie === 'alle' || kaart.dataset.categorie === categorie) &&
//         (prioriteit === 'alle' || kaart.dataset.prioriteit === prioriteit) &&
//         (zoek === '' || kaart.textContent.toLowerCase().indexOf(zoek) !== -1);

//       kaart.hidden = !past;
//       if (past) aantal++;
//     });

//     teller.textContent = aantal;
//     leeg.hidden = aantal > 0;
//   }

//   /* Filter uit de link overnemen, bv. functies.html?categorie=voeding */
//   var params = new URLSearchParams(location.search);
//   ['categorie', 'prioriteit'].forEach(function (naam) {
//     var waarde = params.get(naam);
//     filters.querySelectorAll('input[name="' + naam + '"]').forEach(function (knop) {
//       if (knop.value === waarde) knop.checked = true;
//     });
//   });
//   if (params.get('zoek')) filters.elements.zoek.value = params.get('zoek');

//   filters.addEventListener('change', filter);
//   filters.addEventListener('input', filter);
//   filters.addEventListener('submit', function (e) {
//     e.preventDefault();
//   });

//   filter();
// }


// /* ---------- 3. Contactformulier controleren ---------- */
// var formulier = document.getElementById('contactform');

// if (formulier) {
//   formulier.addEventListener('submit', function (e) {
//     e.preventDefault();
//     var fouten = 0;

//     function controleer(id, geldig) {
//       var blok = document.getElementById(id).parentNode;
//       blok.classList.toggle('veld--fout', !geldig);
//       blok.querySelector('.veld__fout').hidden = geldig;
//       if (!geldig) fouten++;
//     }

//     var naam = document.getElementById('naam').value.trim();
//     var email = document.getElementById('email').value.trim();
//     var onderwerp = document.getElementById('onderwerp').value;
//     var bericht = document.getElementById('bericht').value.trim();

//     controleer('naam', naam !== '');
//     controleer('email', /^\S+@\S+\.\S+$/.test(email));
//     controleer('onderwerp', onderwerp !== '');
//     controleer('bericht', bericht.length >= 10);

//     document.getElementById('foutmelding').hidden = (fouten === 0);

//     if (fouten === 0) {
//       /* Er wordt (nog) niets verstuurd: er is geen database. */
//       document.getElementById('bedankt-naam').textContent = naam;
//       document.getElementById('bedankt-onderwerp').textContent = onderwerp;
//       document.getElementById('bedankt-email').textContent = email;
//       formulier.hidden = true;
//       document.getElementById('bedankt').hidden = false;
//     }
//   });
// }
