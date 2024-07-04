var IsQuotaCasino = false;

function getResults() {
    var bonusPendente = parseFloat(document.getElementById("bonus-pendente").value);
    var wagering = parseFloat(document.getElementById("wagering").value);
    var contribuzione = parseFloat(document.getElementById("contribuzione-slot").value);
    var deposito = parseFloat(document.getElementById("deposito").value);
    var importoSpin = parseFloat(document.getElementById("importo-spin").value);
    var rtpElement = document.getElementById("rtp-slot");

    var rtpRoulette = 97.3;
    var rtpFRoulette = 98.65;
    var rtpBaccarat = 98.94;
    var rtpBlackjack = 99.23;

    //calcola rtp tavolo
    var tav = document.getElementById('tavolo'); // Get the select element by its ID
    var tavolo = tav.options[tav.selectedIndex];
    console.log(tavolo.innerHTML);

    if (tavolo.innerHTML === "Roulette") {
        rtpElement.value = rtpRoulette;
    } else if (tavolo.innerHTML === "French Roulette") {
        rtpElement.value = rtpFRoulette;
    } else if (tavolo.innerHTML === "Baccarat") {
        rtpElement.value = rtpBaccarat;
    } else if (tavolo.innerHTML === "Blackjack") {
        rtpElement.value = rtpBlackjack;
    }


    //
    var rtp = parseFloat(document.getElementById("rtp-slot").value);

    if (this.isQuotaCasino === false) {
        var wageringRichiesto = bonusPendente * (wagering / contribuzione) * 100;
    } else {
        var wageringRichiesto = deposito * (wagering / contribuzione) * 100;
    }
    var costoStatistico = wageringRichiesto * (100 - rtp) / 100;

    var pDraw;

    pDraw = wageringRichiesto * (rtp / 100 - 1 - (20 / (0.6 + wageringRichiesto / importoSpin / 200)) / 100) + bonusPendente;

    var rischio;
    if (pDraw < -50) {
        rischio = "Alto";
    } else if (pDraw > -10) {
        rischio = "Basso";
    } else {
        rischio = "Medio";
    }

    var ev = bonusPendente - costoStatistico;
    var roi = (wageringRichiesto + ev) / wageringRichiesto * 100;

    var wageringElement = document.getElementById("volume-richiesto");
    wageringElement.innerHTML = wageringRichiesto.toFixed(2);

    var costoStatisticoElement = document.getElementById("costo-statistico");
    costoStatisticoElement.innerHTML = costoStatistico.toFixed(2);

    var rischioElement = document.getElementById("rischio");
    rischioElement.innerHTML = rischio;

    var evElement = document.getElementById("ev");
    evElement.innerHTML = ev.toFixed(2);

    var roiELement = document.getElementById("roi");
    roiELement.innerHTML = roi.toFixed(2);
}

function quotaMinima() {
    var quotaMinimaElement = document.getElementById("quotaMinima");

    if (this.isQuotaCasino === false) {
        this.isQuotaCasino = true;
        quotaMinimaElement.innerHTML = "Wag. sul deposito:";
        getResults();
    } else {
        this.isQuotaCasino = false;
        quotaMinimaElement.innerHTML = "Wag. sul bonus:";
        getResults();
    }
}